import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

/* ============================================================
   Spooling
   ------------------------------------------------------------
   Two identical workloads run side by side — one with spooling,
   one without. The point is not the animation; it is that in the
   left-hand column the CPU bar goes dark while the printer works.
   ============================================================ */

export function SpoolingDemo() {
  const [running, setRunning] = useState(false)
  const [tick, setTick] = useState(0)
  const reduce = useReducedMotion()
  const timer = useRef<number | undefined>(undefined)

  const TOTAL = 18

  useEffect(() => {
    if (!running) return
    if (tick >= TOTAL) {
      setRunning(false)
      return
    }
    timer.current = window.setTimeout(() => setTick((t) => t + 1), 420)
    return () => window.clearTimeout(timer.current)
  }, [running, tick])

  // Without spooling the CPU blocks while each of 3 jobs prints.
  const noSpoolCpuBusy = tick > 0 && tick % 6 < 2
  // With spooling the CPU writes to the spool file and moves on.
  const spoolCpuBusy = tick > 0 && tick < TOTAL
  const jobsQueued = Math.min(3, Math.floor(tick / 2))
  const jobsPrinted = Math.min(3, Math.floor((tick - 2) / 5))

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Column
          title="Without spooling"
          tone="danger"
          cpuBusy={noSpoolCpuBusy}
          cpuLabel={noSpoolCpuBusy ? 'Working' : tick === 0 ? 'Idle' : 'WAITING for printer'}
          note="The CPU must wait until the peripheral finishes the current job before it can carry on. Every second of printing is a second of wasted processing power."
          queue={[]}
          printing={tick > 0 && tick < TOTAL}
          reduce={reduce}
        />
        <Column
          title="With spooling"
          tone="success"
          cpuBusy={spoolCpuBusy}
          cpuLabel={spoolCpuBusy ? 'Working on other processes' : 'Idle'}
          note="Print jobs are written to spool files on disk. The spooler feeds them to the printer one at a time while the CPU gets on with other processes — and the user keeps using the computer."
          queue={Array.from({ length: Math.max(0, jobsQueued - jobsPrinted) }, (_, i) => `Job ${jobsPrinted + i + 1}`)}
          printing={tick > 2 && jobsPrinted < 3}
          reduce={reduce}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            if (tick >= TOTAL) setTick(0)
            setRunning((r) => !r)
          }}
        >
          {running ? '⏸ Pause' : tick >= TOTAL ? '↻ Run again' : '▶ Send 3 print jobs'}
        </Button>
        {tick > 0 && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setRunning(false)
              setTick(0)
            }}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}

function Column({
  title,
  tone,
  cpuBusy,
  cpuLabel,
  note,
  queue,
  printing,
  reduce,
}: {
  title: string
  tone: 'danger' | 'success'
  cpuBusy: boolean
  cpuLabel: string
  note: string
  queue: string[]
  printing: boolean
  reduce: boolean | null
}) {
  return (
    <div
      className={cx(
        'rounded-lg border p-3.5',
        tone === 'success'
          ? 'border-success-200 bg-success-50/40 dark:border-success-800/60 dark:bg-success-900/15'
          : 'border-danger-200 bg-danger-50/40 dark:border-danger-800/60 dark:bg-danger-900/15',
      )}
    >
      <p className="mb-3 text-sm font-semibold text-ink">{title}</p>

      <div className="space-y-2.5">
        <div className="rounded-md border border-line bg-card px-3 py-2">
          <p className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">CPU</p>
          <div className="mt-1 flex items-center gap-2">
            <motion.span
              aria-hidden="true"
              className={cx('h-2.5 w-2.5 rounded-full', cpuBusy ? 'bg-success-500' : 'bg-danger-400')}
              animate={reduce ? {} : { scale: cpuBusy ? [1, 1.35, 1] : 1 }}
              transition={{ repeat: cpuBusy ? Infinity : 0, duration: 0.8 }}
            />
            <p className={cx('text-xs font-medium', cpuBusy ? 'text-ink' : 'text-danger-600 dark:text-danger-400')}>
              {cpuLabel}
            </p>
          </div>
        </div>

        {queue.length >= 0 && tone === 'success' && (
          <div className="rounded-md border border-line bg-card px-3 py-2">
            <p className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
              Spool file on disk (the queue)
            </p>
            <div className="mt-1 flex min-h-[24px] flex-wrap gap-1">
              <AnimatePresence>
                {queue.map((j) => (
                  <motion.span
                    key={j}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, x: 20 }}
                    className="rounded bg-brand-500 px-2 py-0.5 text-2xs font-medium text-white"
                  >
                    {j}
                  </motion.span>
                ))}
              </AnimatePresence>
              {queue.length === 0 && <span className="text-2xs text-ink-3">empty</span>}
            </div>
          </div>
        )}

        <div className="rounded-md border border-line bg-card px-3 py-2">
          <p className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
            Printer
          </p>
          <div className="mt-1 flex items-center gap-2">
            <Icon name="file" size={15} className="shrink-0 text-ink-3" />
            <p className="text-xs text-ink-2">{printing ? 'Printing…' : 'Idle'}</p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-2">{note}</p>
    </div>
  )
}

/* ============================================================
   Context switch — what actually moves, and what it costs
   ============================================================ */

const PCB_FIELDS = [
  ['Process state', 'Running → Ready'],
  ['Program counter', '0x004A1C'],
  ['CPU registers', 'AX, BX, SP, …'],
  ['Memory info', 'page table ptr'],
  ['I/O status', 'file handles'],
]

export function ContextSwitchDemo() {
  const [phase, setPhase] = useState(0)
  const reduce = useReducedMotion()

  const PHASES = [
    { title: 'P0 is running', detail: 'Process P0 holds the CPU. Its registers and program counter live in the CPU itself.', active: 'P0' },
    { title: 'An interrupt arrives', detail: 'An interrupt (a timeout, an I/O completion, a system call) tells the CPU that something needs attention. P0 is stopped where it stands.', active: 'none' },
    { title: 'P0’s state is saved', detail: 'Everything the CPU held for P0 — program counter, registers, memory management information — is written into P0’s Process Control Block. This is the overhead of switching.', active: 'none' },
    { title: 'P1’s state is restored', detail: 'The OS reads P1’s PCB and loads its saved program counter and registers back into the CPU, exactly as they were when P1 last stopped.', active: 'none' },
    { title: 'P1 is running', detail: 'P1 resumes from precisely the instruction it was on. It has no idea it was ever paused. Later the reverse happens and P0 continues where it left off.', active: 'P1' },
  ]

  const p = PHASES[phase]

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <PcbCard name="P0" active={p.active === 'P0'} saving={phase === 2} reduce={reduce} />
        <div className="grid place-items-center">
          <div className="rounded-xl border-2 border-line-strong bg-sunken px-4 py-6 text-center">
            <p className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">CPU</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={p.active}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: reduce ? 0 : 0.2 }}
                className={cx(
                  'mt-1 font-mono text-lg font-bold',
                  p.active === 'none' ? 'text-ink-3' : 'text-brand-600 dark:text-brand-400',
                )}
              >
                {p.active === 'none' ? '⋯' : p.active}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1 text-2xs text-ink-3">
              {p.active === 'none' ? 'switching' : 'executing'}
            </p>
          </div>
        </div>
        <PcbCard name="P1" active={p.active === 'P1'} saving={phase === 3} reduce={reduce} />
      </div>

      <div className="mt-4 rounded-lg bg-sunken px-4 py-3">
        <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
          Step {phase + 1} of {PHASES.length}
        </p>
        <p className="font-medium text-ink">{p.title}</p>
        <p className="mt-1 text-base leading-relaxed text-ink-2">{p.detail}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" disabled={phase === 0} onClick={() => setPhase((v) => v - 1)}>
          ← Back
        </Button>
        <Button
          size="sm"
          onClick={() => setPhase((v) => (v + 1) % PHASES.length)}
        >
          {phase === PHASES.length - 1 ? '↻ Start again' : 'Next →'}
        </Button>
      </div>

      {phase >= 2 && (
        <p className="mt-3 rounded-lg border border-warn-300 bg-warn-50 px-4 py-3 text-sm leading-relaxed text-ink-2 dark:border-warn-700/60 dark:bg-warn-900/25">
          <span className="font-semibold text-ink">This is not free. </span>
          Saving and restoring state takes real time during which no useful work happens. That is
          why too small a Round Robin time quantum hurts: the machine spends more time switching
          than computing.
        </p>
      )}
    </div>
  )
}

function PcbCard({
  name,
  active,
  saving,
  reduce,
}: {
  name: string
  active: boolean
  saving: boolean
  reduce: boolean | null
}) {
  return (
    <motion.div
      animate={reduce ? {} : { scale: saving ? 1.02 : 1 }}
      className={cx(
        'rounded-xl border p-3 transition-colors',
        saving
          ? 'border-accent-400 bg-accent-50 dark:border-accent-600 dark:bg-accent-950/40'
          : active
            ? 'border-brand-300 bg-brand-50/60 dark:border-brand-700 dark:bg-brand-950/40'
            : 'border-line bg-sunken/50',
      )}
    >
      <p className="mb-2 flex items-center justify-between text-xs font-semibold text-ink">
        <span>PCB of {name}</span>
        {saving && (
          <span className="rounded bg-accent-500 px-1.5 py-0.5 text-2xs font-bold text-accent-950">
            {name === 'P0' ? 'SAVING' : 'RESTORING'}
          </span>
        )}
      </p>
      <dl className="space-y-1">
        {PCB_FIELDS.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-2 text-2xs">
            <dt className="text-ink-3">{k}</dt>
            <dd className="truncate font-mono text-ink-2">{v}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}
