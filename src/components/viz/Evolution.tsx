import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

/* ============================================================
   Evolution of operating systems
   ------------------------------------------------------------
   Each generation exists to fix one specific waste. The CPU
   utilisation strip is the argument: students see idle time
   shrink generation by generation, so "why did X appear?" has a
   visual answer rather than a memorised date.
   ============================================================ */

interface Era {
  id: string
  name: string
  period: string
  problem: string
  fix: string
  input: string
  output: string
  memory: string
  scheduling: string
  users: string
  tasking: string
  examples: string
  pros: string[]
  cons: string[]
  /** Timeline of CPU activity: 1 = working, 0 = idle. */
  cpu: number[]
  /** Shown under the activity strip when the strip alone could mislead. */
  cpuNote?: string
}

export const ERAS: Era[] = [
  {
    id: 'none',
    name: 'No operating system',
    period: 'Late 1940s – mid 1950s',
    problem:
      'General-purpose computers had arrived, but every program had to be loaded by hand. The processor sat idle while a human mounted tapes and loaded cards.',
    fix: 'Nothing yet: this is the problem the OS was invented to solve.',
    input: 'Punch cards',
    output: 'Display lights',
    memory:
      'All of main memory goes to one program. No memory protection, no partitions, no OS code in memory. Programs load at a fixed address, which makes the system very inflexible.',
    scheduling:
      'None. A human operator decides which program runs next by physically loading it into the machine.',
    users: 'One user, one program: no simultaneous use of any kind.',
    tasking: 'Single-tasking, single-user',
    examples: 'ENIAC (1946), EDSAC (1949), UNIVAC I (1951)',
    pros: ['Conceptually simple: no OS overhead', 'The whole machine belongs to one program'],
    cons: ['Human error is common', 'Very poor turnaround time', 'No protection between programs'],
    cpu: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
  },
  {
    id: 'batch',
    name: 'Simple batch system',
    period: 'Mid 1950s – late 1960s',
    problem:
      'Loading each program by hand wasted enormous amounts of processor time between jobs.',
    fix: 'A resident monitor automatically loads the next job the moment the previous one finishes, removing the human from between jobs.',
    input: 'Card readers',
    output: 'Line printers, magnetic tape',
    memory:
      'A small part of memory is reserved for the resident monitor. The rest holds one user program: only one job can be in memory at a time.',
    scheduling:
      'First-Come, First-Served. Once a job starts it runs to completion without interruption, so scheduling is non-preemptive.',
    users:
      'Many users may submit jobs, but only one user’s job executes at any given time.',
    tasking: 'Single-tasking, effectively single-user',
    examples: 'IBM 7094, FORTRAN Monitor System (FMS)',
    pros: ['Less operator intervention than no OS', 'Better throughput', 'More consistent execution'],
    cons: [
      'Long turnaround: you submit and wait',
      'CPU still idle during I/O (reading tape, printing)',
      'Debugging is painful: each change means resubmitting',
    ],
    cpu: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
  },
  {
    id: 'multi',
    name: 'Multi-programmed batch system',
    period: 'Third generation, mid–late 1960s',
    problem:
      'The CPU still sat idle every time the running job waited for slow input or output.',
    fix:
      'Keep several jobs in memory at once. When one blocks for I/O, switch the CPU to another. This is considered the central theme of every modern OS.',
    input: 'Card readers, punch cards',
    output: 'Line printers, magnetic tape',
    memory:
      'Memory is divided into multiple partitions (fixed or variable) so several jobs sit in memory together. Memory protection becomes necessary to stop jobs interfering with each other.',
    scheduling:
      'Two levels: job scheduling decides which jobs enter memory, and CPU scheduling decides which resident job runs next. A process switches when it blocks.',
    users:
      'Many users can submit jobs and several jobs can be resident at once, but users still cannot interact.',
    tasking: 'Multitasking via multiprogramming, but not interactive multiuser',
    examples: 'IBM System/360 (mid-1960s), CDC 6600, Burroughs B5500',
    pros: ['Much higher CPU utilisation', 'Higher throughput than simple batch', 'Better overall efficiency'],
    cons: [
      'Far more complex OS: memory management, protection, deadlock',
      'Debugging and tuning are harder',
      'Still poor for interactive work: users still submit and wait',
    ],
    cpu: [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  },
  {
    id: 'timeshare',
    name: 'Time-sharing system',
    period: 'From the 1960s',
    problem:
      'Even with the CPU kept busy, a user had no way to interact with a running program: response times were hopeless.',
    fix:
      'Switch between programs after a fixed time quantum, whether or not they are blocked. Rapid switching creates the illusion that everyone has their own computer.',
    input: 'Keyboards on terminals (teletypes, later screens)',
    output: 'Screens, line printers, magnetic tape',
    memory:
      'Advanced techniques: swapping, paging or segmentation, usually with virtual memory. Strong memory protection is essential with many users on one machine.',
    scheduling:
      'Preemptive, usually Round Robin. Each process gets a small time slice and the CPU switches rapidly between them (a context switch).',
    users:
      'Dozens or even hundreds of simultaneous users via terminals, each feeling as if the machine is theirs.',
    tasking: 'Fully multitasking and multiuser',
    examples: 'CTSS (1961), Multics, UNIX, VMS, Windows NT',
    pros: [
      'Fast response time for users',
      'Efficient sharing of expensive hardware',
      'Great for program development and experimentation',
    ],
    cons: [
      'OS overhead from context switching and protection',
      'Security becomes critical with many users',
      'Performance degrades under heavy load',
    ],
    cpu: [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    cpuNote:
      'About the same as multiprogramming. Time-sharing did not make the machine busier: it made it responsive, by switching every few milliseconds so each user gets a turn.',
  },
]

export function EvolutionTimeline() {
  const [active, setActive] = useState(0)
  const reduce = useReducedMotion()
  const era = ERAS[active]
  const utilisation = Math.round((era.cpu.filter(Boolean).length / era.cpu.length) * 100)

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      {/* Timeline rail */}
      <div className="scroll-x border-b border-line bg-sunken/60 p-3">
        <div className="relative flex min-w-max gap-2">
          {ERAS.map((e, i) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={cx(
                'relative w-40 rounded-lg border px-3 py-2 text-left transition-all',
                i === active
                  ? 'border-brand-400 bg-card shadow-sm'
                  : 'border-line bg-card/60 opacity-70 hover:opacity-100',
              )}
            >
              <span className="block text-2xs font-semibold uppercase tracking-wide text-ink-3">
                {e.period}
              </span>
              <span className="block text-sm font-semibold leading-tight text-ink">
                {e.name}
              </span>
              <span className="mt-1.5 flex gap-px" aria-hidden="true">
                {e.cpu.map((c, ci) => (
                  <span
                    key={ci}
                    className={cx(
                      'h-1.5 flex-1 rounded-[1px]',
                      c ? 'bg-success-500' : 'bg-danger-300 dark:bg-danger-800',
                    )}
                  />
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <motion.div
          key={era.id}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
            {era.period}
          </p>
          <h4 className="text-lg font-semibold tracking-tight text-ink">{era.name}</h4>

          {/* CPU utilisation strip — the reason this generation exists */}
          <div className="mt-3 rounded-lg bg-sunken p-3.5">
            <div className="mb-2 flex items-baseline justify-between">
              <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                CPU activity over time
              </p>
              <p className="font-mono text-sm font-semibold text-ink">
                ~{utilisation}% utilised
              </p>
            </div>
            <div className="flex gap-0.5" role="img" aria-label={`CPU roughly ${utilisation} percent utilised`}>
              {era.cpu.map((c, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { scaleY: 0.2, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : i * 0.025 }}
                  className={cx(
                    'h-8 flex-1 rounded-sm',
                    c
                      ? 'bg-success-500'
                      : 'border border-dashed border-danger-300 bg-danger-100 dark:border-danger-700 dark:bg-danger-900/40',
                  )}
                  title={c ? 'CPU working' : 'CPU idle'}
                />
              ))}
            </div>
            {era.cpuNote && (
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{era.cpuNote}</p>
            )}
            <div className="mt-1.5 flex gap-4 text-2xs text-ink-3">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-success-500" /> working
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-sm border border-dashed border-danger-300 bg-danger-100 dark:bg-danger-900/40"
                />{' '}
                idle (wasted)
              </span>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-danger-200 bg-danger-50/50 p-3.5 dark:border-danger-800/60 dark:bg-danger-900/20">
              <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-danger-700 dark:text-danger-300">
                The problem
              </p>
              <p className="text-base leading-relaxed text-ink-2">{era.problem}</p>
            </div>
            <div className="rounded-lg border border-success-200 bg-success-50/50 p-3.5 dark:border-success-800/60 dark:bg-success-900/20">
              <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-success-700 dark:text-success-300">
                The fix
              </p>
              <p className="text-base leading-relaxed text-ink-2">{era.fix}</p>
            </div>
          </div>

          <dl className="mt-4 grid gap-x-5 gap-y-3 sm:grid-cols-2">
            {[
              ['Input', era.input],
              ['Output', era.output],
              ['Memory structure', era.memory],
              ['Scheduling', era.scheduling],
              ['Users', era.users],
              ['Tasking model', era.tasking],
              ['Examples', era.examples],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
                  {k}
                </dt>
                <dd className="text-sm leading-relaxed text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Advantages
              </p>
              <ul className="space-y-1">
                {era.pros.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-ink-2">
                    <Icon name="check" size={15} className="mt-0.5 shrink-0 text-success-700 dark:text-success-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Disadvantages
              </p>
              <ul className="space-y-1">
                {era.cons.map((c) => (
                  <li key={c} className="flex gap-2 text-sm text-ink-2">
                    <Icon name="cross" size={15} className="mt-0.5 shrink-0 text-danger-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
