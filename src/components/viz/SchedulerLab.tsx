import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ALGORITHMS,
  SYLLABUS_PROCESSES,
  schedule,
  type AlgorithmId,
  type ProcessSpec,
} from '@/lib/scheduling'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

/* The single most valuable visualisation in the course: students can
   build a process set, switch algorithm, watch the Gantt chart redraw,
   and read off exactly the turnaround/waiting figures an exam asks for.
   The arithmetic is shown, not just the answer. */

/* Each fill carries a white label, so every one is chosen at the step where
   white clears 4.5:1 — the chart has to read from the back of a classroom. */
const PID_COLORS = [
  'var(--color-brand-600)',
  'var(--color-accent-700)',
  'var(--color-success-700)',
  'var(--color-danger-600)',
  'var(--color-brand-800)',
  'var(--color-warn-700)',
]

export function SchedulerLab({
  initialAlgorithm = 'fcfs',
  lockAlgorithm = false,
  initialProcesses,
  initialQuantum = 4,
  allSameArrival = false,
}: {
  initialAlgorithm?: AlgorithmId
  lockAlgorithm?: boolean
  initialProcesses?: ProcessSpec[]
  initialQuantum?: number
  allSameArrival?: boolean
}) {
  const [algorithm, setAlgorithm] = useState<AlgorithmId>(initialAlgorithm)
  const [quantum, setQuantum] = useState(initialQuantum)
  const [procs, setProcs] = useState<ProcessSpec[]>(
    () =>
      initialProcesses ??
      (allSameArrival
        ? SYLLABUS_PROCESSES.map((p) => ({ ...p, arrival: 0 }))
        : SYLLABUS_PROCESSES),
  )
  const [showMath, setShowMath] = useState(false)
  const reduce = useReducedMotion()

  const result = useMemo(() => schedule(procs, algorithm, quantum), [procs, algorithm, quantum])
  const meta = ALGORITHMS.find((a) => a.id === algorithm)!
  const colorOf = (pid: string) =>
    PID_COLORS[procs.findIndex((p) => p.id === pid) % PID_COLORS.length]

  const update = (i: number, field: keyof ProcessSpec, raw: string) => {
    const n = Math.max(0, Math.min(30, Number(raw) || 0))
    setProcs((prev) =>
      prev.map((p, idx) =>
        idx === i ? { ...p, [field]: field === 'burst' ? Math.max(1, n) : n } : p,
      ),
    )
  }

  const addProcess = () => {
    if (procs.length >= 6) return
    const n = procs.length + 1
    setProcs([...procs, { id: `P${n}`, arrival: allSameArrival ? 0 : n, burst: 3, priority: n }])
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      {/* --- Algorithm chooser --- */}
      {!lockAlgorithm && (
        <div className="border-b border-line bg-sunken/60 p-3">
          <div className="scroll-x -mx-1 flex gap-1.5 px-1 pb-1">
            {ALGORITHMS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAlgorithm(a.id)}
                aria-pressed={algorithm === a.id}
                className={cx(
                  'shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  algorithm === a.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-card text-ink-2 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-950',
                )}
              >
                {a.short}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="font-semibold text-ink">{meta.name}</p>
          <span
            className={cx(
              'rounded-full border px-2 py-0.5 text-2xs font-medium',
              meta.preemptive
                ? 'border-accent-300 bg-accent-50 text-accent-800 dark:border-accent-700 dark:bg-accent-950/50 dark:text-accent-300'
                : 'border-line bg-sunken text-ink-2',
            )}
          >
            {meta.preemptive ? 'Preemptive' : 'Non-preemptive'}
          </span>
        </div>
        <p className="mb-4 text-base leading-relaxed text-ink-2">{meta.blurb}</p>

        {algorithm === 'rr' && (
          <div className="mb-4 rounded-lg bg-sunken p-3.5">
            <label
              htmlFor="quantum"
              className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink"
            >
              <span>Time quantum</span>
              <span className="font-mono tabular-nums text-brand-600 dark:text-brand-400">
                {quantum} ms
              </span>
            </label>
            <input
              id="quantum"
              type="range"
              min={1}
              max={10}
              value={quantum}
              onChange={(e) => setQuantum(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-500)]"
            />
            <p className="mt-1.5 text-xs text-ink-3">
              {quantum <= 2
                ? 'Very short: fast response, but look how many context switches it costs.'
                : quantum >= 8
                  ? 'Very long: most processes finish in one turn, so this behaves almost like FCFS.'
                  : 'A balanced quantum — good response time without excessive switching.'}
            </p>
          </div>
        )}

        {/* --- Gantt chart --- */}
        <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
          Gantt chart
        </p>
        <div className="scroll-x rounded-lg border border-line bg-sunken/50 p-3">
          <div style={{ minWidth: Math.max(320, result.makespan * 26) }}>
            <div className="flex h-12 items-stretch gap-px">
              {result.slices.map((s, i) => (
                <motion.div
                  key={`${s.pid}-${s.start}-${i}`}
                  initial={reduce ? false : { scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{
                    duration: reduce ? 0 : 0.22,
                    delay: reduce ? 0 : i * 0.018,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    flexGrow: s.end - s.start,
                    flexBasis: 0,
                    background: s.pid ? colorOf(s.pid) : 'transparent',
                    transformOrigin: 'left',
                  }}
                  className={cx(
                    'grid place-items-center rounded text-xs font-semibold text-white',
                    !s.pid &&
                      'border border-dashed border-line-strong !text-ink-3 [background-image:repeating-linear-gradient(45deg,var(--surface-sunken),var(--surface-sunken)_4px,transparent_4px,transparent_8px)]',
                  )}
                  title={`${s.pid ?? 'idle'}: ${s.start}–${s.end} ms`}
                >
                  {s.end - s.start >= 1 && (s.pid ?? 'idle')}
                </motion.div>
              ))}
            </div>
            {/* Time axis */}
            <div className="relative mt-1 h-5">
              {[...new Set([0, ...result.slices.map((s) => s.end)])].map((t) => (
                <span
                  key={t}
                  className="absolute -translate-x-1/2 font-mono text-2xs text-ink-3"
                  style={{ left: `${(t / Math.max(result.makespan, 1)) * 100}%` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Editable process table + results --- */}
        <div className="scroll-x mt-4 rounded-lg border border-line">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="bg-sunken">
                {['Process', 'Arrival', 'Burst', ...(algorithm.startsWith('priority') ? ['Priority'] : []), 'Completion', 'Turnaround', 'Waiting'].map(
                  (h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border-b border-line px-2.5 py-2 text-left text-2xs font-semibold uppercase tracking-[0.04em] text-ink-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {result.metrics.map((m, i) => (
                <tr key={m.id} className="even:bg-sunken/40">
                  <td className="border-b border-line px-2.5 py-1.5">
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ background: colorOf(m.id) }}
                      />
                      {m.id}
                    </span>
                  </td>
                  <td className="border-b border-line px-1.5 py-1.5">
                    <NumInput
                      value={m.arrival}
                      label={`${m.id} arrival time`}
                      onChange={(v) => update(i, 'arrival', v)}
                    />
                  </td>
                  <td className="border-b border-line px-1.5 py-1.5">
                    <NumInput
                      value={m.burst}
                      label={`${m.id} burst duration`}
                      onChange={(v) => update(i, 'burst', v)}
                    />
                  </td>
                  {algorithm.startsWith('priority') && (
                    <td className="border-b border-line px-1.5 py-1.5">
                      <NumInput
                        value={m.priority}
                        label={`${m.id} priority`}
                        onChange={(v) => update(i, 'priority', v)}
                      />
                    </td>
                  )}
                  <td className="border-b border-line px-2.5 py-1.5 font-mono tabular-nums text-ink-2">
                    {m.completion}
                  </td>
                  <td className="border-b border-line px-2.5 py-1.5 font-mono tabular-nums text-ink-2">
                    {showMath ? (
                      <span className="text-xs">
                        {m.completion} − {m.arrival} ={' '}
                        <strong className="text-ink">{m.turnaround}</strong>
                      </span>
                    ) : (
                      m.turnaround
                    )}
                  </td>
                  <td className="border-b border-line px-2.5 py-1.5 font-mono tabular-nums text-ink-2">
                    {showMath ? (
                      <span className="text-xs">
                        {m.turnaround} − {m.burst} ={' '}
                        <strong className="text-ink">{m.waiting}</strong>
                      </span>
                    ) : (
                      m.waiting
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setShowMath((s) => !s)}>
            {showMath ? 'Hide the working' : 'Show the working'}
          </Button>
          {procs.length < 6 && (
            <Button size="sm" variant="ghost" onClick={addProcess}>
              + Add process
            </Button>
          )}
          {procs.length > 2 && (
            <Button size="sm" variant="ghost" onClick={() => setProcs(procs.slice(0, -1))}>
              − Remove last
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              setProcs(
                allSameArrival
                  ? SYLLABUS_PROCESSES.map((p) => ({ ...p, arrival: 0 }))
                  : SYLLABUS_PROCESSES,
              )
            }
          >
            Reset
          </Button>
        </div>

        {/* --- Averages --- */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Stat
            label="Avg turnaround"
            value={`${result.avgTurnaround} ms`}
            detail={`(${result.metrics.map((m) => m.turnaround).join(' + ')}) / ${result.metrics.length}`}
            show={showMath}
          />
          <Stat
            label="Avg waiting"
            value={`${result.avgWaiting} ms`}
            detail={`(${result.metrics.map((m) => m.waiting).join(' + ')}) / ${result.metrics.length}`}
            show={showMath}
            highlight
          />
          <Stat label="Avg response" value={`${result.avgResponse} ms`} />
          <Stat label="Context switches" value={String(result.contextSwitches)} />
        </div>
      </div>
    </div>
  )
}

function NumInput({
  value,
  onChange,
  label,
}: {
  value: number
  onChange: (v: string) => void
  label: string
}) {
  return (
    <>
      <label className="sr-only" htmlFor={`in-${label.replace(/\s/g, '-')}`}>
        {label}
      </label>
      <input
        id={`in-${label.replace(/\s/g, '-')}`}
        type="number"
        min={0}
        max={30}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-14 rounded-md border border-line bg-card px-1.5 py-1 text-center font-mono text-sm text-ink focus:border-brand-400 focus:outline-none"
      />
    </>
  )
}

function Stat({
  label,
  value,
  detail,
  show,
  highlight,
}: {
  label: string
  value: string
  detail?: string
  show?: boolean
  highlight?: boolean
}) {
  return (
    <div
      className={cx(
        'rounded-lg border px-3 py-2.5',
        highlight
          ? 'border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-950/50'
          : 'border-line bg-sunken/60',
      )}
    >
      <p className="text-2xs font-medium uppercase tracking-[0.05em] text-ink-3">{label}</p>
      <p className="font-mono text-lg font-semibold tabular-nums text-ink">{value}</p>
      {show && detail && (
        <p className="mt-0.5 break-words font-mono text-2xs leading-tight text-ink-3">
          {detail}
        </p>
      )}
    </div>
  )
}
