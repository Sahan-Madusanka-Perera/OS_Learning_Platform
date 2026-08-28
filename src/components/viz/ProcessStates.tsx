import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

/* The seven-state transition diagram, but *drivable*. The student
   moves a real process around it and the panel explains what just
   happened and why — turning a diagram to memorise into a machine
   whose rules they can discover. */

type StateId =
  | 'new'
  | 'ready'
  | 'running'
  | 'blocked'
  | 'terminated'
  | 'susp-ready'
  | 'susp-blocked'

interface StateNode {
  id: StateId
  label: string
  x: number
  y: number
  w: number
  h: number
  where: 'none' | 'main' | 'secondary'
  meaning: string
}

const NODES: StateNode[] = [
  { id: 'new', label: 'New', x: 14, y: 100, w: 92, h: 46, where: 'none', meaning: 'The process is being created. The OS is allocating memory and setting up its Process Control Block.' },
  { id: 'ready', label: 'Ready', x: 158, y: 100, w: 92, h: 46, where: 'main', meaning: 'Fully prepared to execute. It is waiting for one thing only — the CPU to become free.' },
  { id: 'running', label: 'Running', x: 302, y: 100, w: 96, h: 46, where: 'main', meaning: 'This process is actually executing on the CPU right now. Only one process per CPU core can be here.' },
  { id: 'terminated', label: 'Terminated', x: 446, y: 100, w: 104, h: 46, where: 'none', meaning: 'Execution has finished — normally, or because the OS or user stopped it. All its resources are released.' },
  { id: 'blocked', label: 'Blocked', x: 302, y: 200, w: 96, h: 46, where: 'main', meaning: 'Paused, waiting for a resource such as I/O completion. It cannot run even if the CPU is free.' },
  { id: 'susp-ready', label: 'Suspended Ready', x: 140, y: 316, w: 132, h: 46, where: 'secondary', meaning: 'Ready to run, but swapped out to secondary storage to free main memory. It must be brought back before it can run.' },
  { id: 'susp-blocked', label: 'Suspended Blocked', x: 300, y: 316, w: 140, h: 46, where: 'secondary', meaning: 'Still waiting for a resource AND swapped out of main memory. The worst of both worlds.' },
]

interface Transition {
  from: StateId
  to: StateId
  label: string
  action: string
  why: string
}

const TRANSITIONS: Transition[] = [
  { from: 'new', to: 'ready', label: 'Admit', action: 'Admit to memory', why: 'The long-term scheduler loads the process into main memory and it joins the ready queue.' },
  { from: 'ready', to: 'running', label: 'Dispatch', action: 'Dispatch to CPU', why: 'The short-term scheduler picks this process and hands it the CPU.' },
  { from: 'running', to: 'ready', label: 'Timeout', action: 'Time quantum expires', why: 'Its time slice ran out, or a higher-priority process arrived. It is preempted back to Ready — it did nothing wrong.' },
  { from: 'running', to: 'blocked', label: 'I/O wait', action: 'Request I/O', why: 'It asked for input/output or must wait for an event. Holding the CPU while waiting would waste it.' },
  { from: 'running', to: 'terminated', label: 'Release', action: 'Finish or be killed', why: 'The process completed its task, or the OS ended it because of an error.' },
  { from: 'blocked', to: 'ready', label: 'I/O done', action: 'I/O completes', why: 'The resource it waited for is now available, so it can queue for the CPU again.' },
  { from: 'ready', to: 'susp-ready', label: 'Swap out', action: 'Swap out (MTS)', why: 'Main memory is under pressure. The medium-term scheduler moves this ready process out to disk.' },
  { from: 'susp-ready', to: 'ready', label: 'Activate', action: 'Swap back in', why: 'Enough main memory is free again, so the process is loaded back and can be scheduled.' },
  { from: 'blocked', to: 'susp-blocked', label: 'Swap out', action: 'Swap out while blocked', why: 'It is waiting anyway, so it is the cheapest thing to move out of memory.' },
  { from: 'susp-blocked', to: 'blocked', label: 'Activate', action: 'Swap back in', why: 'It is brought back into main memory while still waiting for its event.' },
  { from: 'susp-blocked', to: 'susp-ready', label: 'I/O done', action: 'I/O completes on disk', why: 'The event it waited for finished while it was still swapped out — so it becomes ready, but still on disk.' },
]

const EDGES: { from: StateId; to: StateId; d: string; labelX: number; labelY: number; label: string }[] = [
  { from: 'new', to: 'ready', d: 'M108 123 L154 123', labelX: 131, labelY: 115, label: 'Admit' },
  { from: 'ready', to: 'running', d: 'M252 114 L298 114', labelX: 275, labelY: 106, label: 'Dispatch' },
  { from: 'running', to: 'ready', d: 'M300 134 L254 134', labelX: 277, labelY: 148, label: 'Timeout' },
  { from: 'running', to: 'terminated', d: 'M400 123 L444 123', labelX: 422, labelY: 115, label: 'Release' },
  { from: 'running', to: 'blocked', d: 'M350 148 L350 196', labelX: 312, labelY: 176, label: 'I/O wait' },
  { from: 'blocked', to: 'ready', d: 'M300 214 Q214 206 210 150', labelX: 244, labelY: 192, label: 'I/O done' },
  { from: 'ready', to: 'susp-ready', d: 'M196 148 L198 312', labelX: 156, labelY: 232, label: 'Swap out' },
  { from: 'susp-ready', to: 'ready', d: 'M214 312 L212 150', labelX: 252, labelY: 268, label: 'Activate' },
  { from: 'blocked', to: 'susp-blocked', d: 'M360 248 L366 312', labelX: 408, labelY: 232, label: 'Swap out' },
  { from: 'susp-blocked', to: 'blocked', d: 'M344 312 L340 248', labelX: 312, labelY: 268, label: 'Activate' },
  { from: 'susp-blocked', to: 'susp-ready', d: 'M370 364 L370 384 L206 384 L206 366', labelX: 288, labelY: 398, label: 'I/O done' },
]

export function ProcessStateMachine() {
  const [current, setCurrent] = useState<StateId>('new')
  const [history, setHistory] = useState<{ label: string; why: string }[]>([])
  const reduce = useReducedMotion()

  const node = NODES.find((n) => n.id === current)!
  const options = TRANSITIONS.filter((t) => t.from === current)

  const take = (t: Transition) => {
    setCurrent(t.to)
    setHistory((h) => [...h.slice(-5), { label: `${cap(t.from)} → ${cap(t.to)}: ${t.action}`, why: t.why }])
  }

  const activeEdges = new Set(options.map((t) => `${t.from}->${t.to}`))

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="scroll-x border-b border-line bg-sunken/50 p-3">
        <svg
          viewBox="0 0 580 412"
          className="h-auto w-full min-w-[35rem]"
          role="img"
          aria-label="Seven-state process transition diagram. Current state: {current}"
        >
          <defs>
            <marker id="ps-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0 0.5L6.5 3L0 5.5z" fill="var(--border-strong)" />
            </marker>
            <marker id="ps-arrow-on" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0 0.5L6.5 3L0 5.5z" fill="var(--color-brand-500)" />
            </marker>
          </defs>

          {/* Memory zones */}
          <rect x="118" y="80" width="450" height="186" rx="12" fill="none" stroke="var(--grid-line)" strokeDasharray="4 4" />
          <text x="126" y="74" fontSize="10.5" fill="var(--text-muted)" fontWeight="600">
            MAIN MEMORY (RAM)
          </text>
          <rect x="118" y="300" width="450" height="104" rx="12" fill="none" stroke="var(--grid-line)" strokeDasharray="4 4" />
          <text x="126" y="294" fontSize="10.5" fill="var(--text-muted)" fontWeight="600">
            SECONDARY STORAGE (swapped out)
          </text>

          {/* Edges */}
          {EDGES.map((e) => {
            const on = activeEdges.has(`${e.from}->${e.to}`)
            return (
              <g key={`${e.from}-${e.to}`}>
                <path
                  d={e.d}
                  fill="none"
                  stroke={on ? 'var(--color-brand-500)' : 'var(--border-strong)'}
                  strokeWidth={on ? 2 : 1.25}
                  markerEnd={on ? 'url(#ps-arrow-on)' : 'url(#ps-arrow)'}
                  className="transition-all duration-300"
                />
                <text
                  x={e.labelX}
                  y={e.labelY}
                  fontSize="9.5"
                  textAnchor="middle"
                  fill={on ? 'var(--color-brand-600)' : 'var(--text-muted)'}
                  fontWeight={on ? 600 : 400}
                  className="transition-colors duration-300"
                >
                  {e.label}
                </text>
              </g>
            )
          })}

          {/* Nodes */}
          {NODES.map((n) => {
            const isCurrent = n.id === current
            const reachable = options.some((t) => t.to === n.id)
            return (
              <g key={n.id}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={n.h}
                  rx="10"
                  fill={isCurrent ? 'var(--color-brand-500)' : 'var(--surface-card)'}
                  stroke={isCurrent ? 'var(--color-brand-600)' : reachable ? 'var(--color-brand-500)' : 'var(--border-strong)'}
                  strokeWidth={isCurrent || reachable ? 2 : 1.25}
                  className="transition-all duration-300"
                />
                <text
                  x={n.x + n.w / 2}
                  y={n.y + n.h / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight={isCurrent || reachable ? 700 : 500}
                  fill={
                    isCurrent
                      ? '#fff'
                      : reachable
                        ? 'var(--color-brand-600)'
                        : 'var(--text-primary)'
                  }
                  className="transition-colors duration-300"
                >
                  {n.label}
                </text>
              </g>
            )
          })}

          {/* The travelling process token */}
          <motion.circle
            r="7"
            fill="var(--color-accent-500)"
            stroke="var(--surface-card)"
            strokeWidth="2.5"
            animate={{ cx: node.x + node.w - 10, cy: node.y + 10 }}
            transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>

      <div className="p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
            {node.label}
          </span>
          <span
            className={cx(
              'rounded-full border px-2.5 py-0.5 text-2xs font-medium',
              node.where === 'main'
                ? 'border-success-300 bg-success-50 text-success-700 dark:border-success-700 dark:bg-success-900/30 dark:text-success-300'
                : node.where === 'secondary'
                  ? 'border-warn-300 bg-warn-50 text-warn-700 dark:border-warn-700 dark:bg-warn-900/30 dark:text-warn-300'
                  : 'border-line bg-sunken text-ink-3',
            )}
          >
            {node.where === 'main' ? 'In main memory' : node.where === 'secondary' ? 'On disk' : 'Not in memory'}
          </span>
        </div>

        <p className="mb-4 text-base leading-relaxed text-ink-2">{node.meaning}</p>

        {options.length > 0 ? (
          <>
            <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              What can happen next?
            </p>
            <div className="flex flex-wrap gap-2">
              {options.map((t) => (
                <button
                  key={`${t.from}-${t.to}`}
                  type="button"
                  onClick={() => take(t)}
                  className="rounded-lg border border-brand-300 bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100 dark:border-brand-700 dark:bg-brand-950/60 dark:text-brand-300 dark:hover:bg-brand-900/60"
                >
                  {t.action} <span className="text-ink-3">→ {cap(t.to)}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-line bg-sunken px-4 py-3">
            <p className="text-base text-ink-2">
              Terminated is a dead end — a process never comes back from here. Its PCB entry is
              removed once the parent collects its exit status.
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="mt-3"
              onClick={() => {
                setCurrent('new')
                setHistory([])
              }}
            >
              Start a new process
            </Button>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-4 rounded-lg border border-line bg-sunken/60 p-3.5">
            <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              What just happened
            </p>
            <ol className="space-y-2">
              {history.slice(-3).reverse().map((h, i) => (
                <li key={history.length - i} className={cx('text-sm', i > 0 && 'opacity-55')}>
                  <p className="font-medium text-ink">{h.label}</p>
                  <p className="leading-relaxed text-ink-2">{h.why}</p>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}

function cap(id: StateId): string {
  return NODES.find((n) => n.id === id)!.label
}
