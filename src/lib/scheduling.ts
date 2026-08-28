/* ============================================================
   CPU scheduling simulator
   ------------------------------------------------------------
   Pure functions producing a Gantt timeline plus the per-process
   metrics the A/L syllabus asks students to calculate:
     turnaround = completion − arrival
     waiting    = turnaround − burst
   Every algorithm is simulated tick-by-tick so that preemption,
   idle gaps and arrival order are all handled the same way.
   ============================================================ */

export interface ProcessSpec {
  id: string
  arrival: number
  burst: number
  priority: number
}

export interface GanttSlice {
  /** null = the CPU was idle over this interval. */
  pid: string | null
  start: number
  end: number
}

export interface ProcessMetrics {
  id: string
  arrival: number
  burst: number
  priority: number
  completion: number
  turnaround: number
  waiting: number
  /** First time this process touched the CPU. */
  firstRun: number
  response: number
}

export interface ScheduleResult {
  slices: GanttSlice[]
  metrics: ProcessMetrics[]
  avgTurnaround: number
  avgWaiting: number
  avgResponse: number
  makespan: number
  contextSwitches: number
}

export type AlgorithmId =
  | 'fcfs'
  | 'sjf'
  | 'srtf'
  | 'priority'
  | 'priority-p'
  | 'rr'

export const ALGORITHMS: {
  id: AlgorithmId
  name: string
  short: string
  preemptive: boolean
  blurb: string
}[] = [
  {
    id: 'fcfs',
    name: 'First Come First Served',
    short: 'FCFS',
    preemptive: false,
    blurb: 'Runs processes in arrival order. Simple and fair, but one long job delays everyone behind it (the convoy effect).',
  },
  {
    id: 'sjf',
    name: 'Shortest Job First (non-preemptive)',
    short: 'SJF',
    preemptive: false,
    blurb: 'Among the processes that have arrived, picks the shortest burst. Once started, a process runs to completion.',
  },
  {
    id: 'srtf',
    name: 'Shortest Remaining Time First',
    short: 'SRTF',
    preemptive: true,
    blurb: 'Preemptive SJF. A newly arrived process with a shorter remaining time takes the CPU away from the running one.',
  },
  {
    id: 'priority',
    name: 'Priority (non-preemptive)',
    short: 'Priority',
    preemptive: false,
    blurb: 'Highest priority (lowest number) runs first, then runs to completion without interruption.',
  },
  {
    id: 'priority-p',
    name: 'Priority (preemptive)',
    short: 'Priority-P',
    preemptive: true,
    blurb: 'A higher-priority arrival immediately preempts the running process.',
  },
  {
    id: 'rr',
    name: 'Round Robin',
    short: 'RR',
    preemptive: true,
    blurb: 'Every process gets an equal time quantum in circular order. Designed for time-sharing; nobody starves.',
  },
]

interface Runtime extends ProcessSpec {
  remaining: number
  firstRun: number
  completion: number
}

export function schedule(
  specs: ProcessSpec[],
  algorithm: AlgorithmId,
  quantum = 4,
): ScheduleResult {
  const procs: Runtime[] = specs.map((p) => ({
    ...p,
    remaining: p.burst,
    firstRun: -1,
    completion: -1,
  }))

  const slices: GanttSlice[] = []
  let time = 0
  let done = 0
  let current: Runtime | null = null
  let quantumLeft = quantum
  /** FIFO queue of process ids, used only by Round Robin. */
  const rrQueue: string[] = []
  const enqueued = new Set<string>()

  const push = (t: number, pid: string | null) => {
    const last = slices[slices.length - 1]
    if (last && last.pid === pid && last.end === t) {
      last.end = t + 1
    } else {
      slices.push({ pid, start: t, end: t + 1 })
    }
  }

  const guard = specs.reduce((a, p) => a + p.burst, 0) + Math.max(...specs.map((p) => p.arrival), 0) + 5

  while (done < procs.length && time <= guard * 2) {
    // Admit newly arrived processes into the round-robin queue.
    if (algorithm === 'rr') {
      for (const p of procs) {
        if (p.arrival <= time && p.remaining > 0 && !enqueued.has(p.id)) {
          rrQueue.push(p.id)
          enqueued.add(p.id)
        }
      }
    }

    const available = procs.filter((p) => p.arrival <= time && p.remaining > 0)

    if (available.length === 0) {
      if (current) current = null
      push(time, null)
      time += 1
      continue
    }

    // Choose (or keep) the process that should hold the CPU now.
    if (algorithm === 'fcfs') {
      if (!current || current.remaining === 0) {
        current = pickBy(available, (a, b) => a.arrival - b.arrival || cmpId(a, b))
      }
    } else if (algorithm === 'sjf') {
      if (!current || current.remaining === 0) {
        current = pickBy(available, (a, b) => a.burst - b.burst || a.arrival - b.arrival || cmpId(a, b))
      }
    } else if (algorithm === 'srtf') {
      current = pickBy(
        available,
        (a, b) => a.remaining - b.remaining || a.arrival - b.arrival || cmpId(a, b),
      )
    } else if (algorithm === 'priority') {
      if (!current || current.remaining === 0) {
        current = pickBy(
          available,
          (a, b) => a.priority - b.priority || a.arrival - b.arrival || cmpId(a, b),
        )
      }
    } else if (algorithm === 'priority-p') {
      current = pickBy(
        available,
        (a, b) => a.priority - b.priority || a.arrival - b.arrival || cmpId(a, b),
      )
    } else {
      // Round Robin
      if (!current || current.remaining === 0 || quantumLeft === 0) {
        if (current && current.remaining > 0 && quantumLeft === 0) {
          // Quantum expired: back to the tail of the queue, behind
          // anything that arrived during this slice.
          rrQueue.push(current.id)
        }
        let nextId: string | undefined
        while ((nextId = rrQueue.shift())) {
          const cand = procs.find((p) => p.id === nextId)
          if (cand && cand.remaining > 0) {
            current = cand
            break
          }
        }
        if (!current || current.remaining === 0) {
          current = available[0]
        }
        quantumLeft = quantum
      }
    }

    if (!current) {
      push(time, null)
      time += 1
      continue
    }

    if (current.firstRun < 0) current.firstRun = time

    push(time, current.id)
    current.remaining -= 1
    if (algorithm === 'rr') quantumLeft -= 1
    time += 1

    if (current.remaining === 0) {
      current.completion = time
      done += 1
      current = null
      if (algorithm === 'rr') quantumLeft = 0
    }
  }

  const metrics: ProcessMetrics[] = procs.map((p) => {
    const turnaround = p.completion - p.arrival
    return {
      id: p.id,
      arrival: p.arrival,
      burst: p.burst,
      priority: p.priority,
      completion: p.completion,
      turnaround,
      waiting: turnaround - p.burst,
      firstRun: p.firstRun,
      response: p.firstRun - p.arrival,
    }
  })

  const n = metrics.length || 1
  const contextSwitches = slices.filter(
    (s, i) => i > 0 && s.pid !== null && s.pid !== slices[i - 1].pid,
  ).length

  return {
    slices,
    metrics,
    avgTurnaround: round2(metrics.reduce((a, m) => a + m.turnaround, 0) / n),
    avgWaiting: round2(metrics.reduce((a, m) => a + m.waiting, 0) / n),
    avgResponse: round2(metrics.reduce((a, m) => a + m.response, 0) / n),
    makespan: slices.length ? slices[slices.length - 1].end : 0,
    contextSwitches,
  }
}

function pickBy(list: Runtime[], cmp: (a: Runtime, b: Runtime) => number): Runtime {
  return [...list].sort(cmp)[0]
}

function cmpId(a: Runtime, b: Runtime): number {
  return a.id.localeCompare(b.id)
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

/** The four-process worked example used throughout the syllabus notes. */
export const SYLLABUS_PROCESSES: ProcessSpec[] = [
  { id: 'P1', arrival: 0, burst: 5, priority: 3 },
  { id: 'P2', arrival: 1, burst: 3, priority: 1 },
  { id: 'P3', arrival: 2, burst: 8, priority: 4 },
  { id: 'P4', arrival: 4, burst: 4, priority: 2 },
]
