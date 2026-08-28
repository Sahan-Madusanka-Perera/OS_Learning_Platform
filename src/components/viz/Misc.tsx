import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Icon, type IconName } from '@/components/ui/Icon'

/* ---------- Where the OS sits in the stack ---------- */

const LAYERS = [
  { id: 'user', label: 'User (liveware)', text: 'You. The person giving instructions.', color: 'var(--color-accent-700)' },
  { id: 'app', label: 'Application software', text: 'Word processors, browsers, games. Written for people to use directly — and they cannot run without an OS underneath.', color: 'var(--color-brand-600)' },
  { id: 'os', label: 'Operating system', text: 'The bridge. It provides interfaces, manages processes, allocates resources, and enforces security — so applications never have to know what brand of disk you own.', color: 'var(--color-brand-700)' },
  { id: 'driver', label: 'Device drivers', text: 'Translators for each individual device, turning general OS instructions into the specific commands that piece of hardware understands.', color: 'var(--color-brand-800)' },
  { id: 'hw', label: 'Hardware', text: 'CPU, RAM, disks, keyboard, screen. Fast, dumb, and completely unaware of what a "file" is.', color: 'var(--color-brand-950)' },
]

export function SystemLayers() {
  const [active, setActive] = useState(2)
  const reduce = useReducedMotion()

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
        <div className="space-y-1.5">
          {LAYERS.map((l, i) => (
            <motion.button
              key={l.id}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : i * 0.06 }}
              className={cx(
                'w-full rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium transition-all',
                active === i
                  ? 'text-white shadow-sm'
                  : 'border-line bg-sunken text-ink-2 hover:border-line-strong',
              )}
              style={active === i ? { background: l.color, borderColor: l.color } : undefined}
            >
              {l.label}
            </motion.button>
          ))}
        </div>
        <div>
          <p className="mb-1.5 font-semibold text-ink">{LAYERS[active].label}</p>
          <p className="text-base leading-relaxed text-ink-2">{LAYERS[active].text}</p>
          <p className="mt-3 rounded-lg bg-sunken px-3.5 py-2.5 text-sm leading-relaxed text-ink-2">
            Each layer only talks to its neighbours. An application never reaches down and pokes
            the disk directly — it asks the OS, and the OS asks the driver. That indirection is
            what makes one program able to run on thousands of different machines.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- Multitasking: the illusion of simultaneity ---------- */

export function MultitaskingIllusion() {
  const [speed, setSpeed] = useState(3)
  const reduce = useReducedMotion()

  const APPS = [
    { name: 'Browser', color: 'var(--color-brand-600)' },
    { name: 'Music player', color: 'var(--color-accent-700)' },
    { name: 'Word processor', color: 'var(--color-success-700)' },
  ]
  // At high switching speed the strip blurs into "all three at once".
  const sliceCount = 24
  const slices = Array.from({ length: sliceCount }, (_, i) => i % APPS.length)

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <label htmlFor="mt-speed" className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-ink">How fast does the OS switch?</span>
        <span className="font-mono text-brand-600 dark:text-brand-400">
          {['very slow', 'slow', 'fast', 'very fast', 'real speed'][speed - 1]}
        </span>
      </label>
      <input
        id="mt-speed"
        type="range"
        min={1}
        max={5}
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
        className="w-full accent-[var(--color-brand-500)]"
      />

      <div className="mt-4">
        <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
          What the CPU actually does
        </p>
        <div className="flex gap-px overflow-hidden rounded-lg">
          {slices.map((a, i) => (
            <motion.div
              key={i}
              className="h-10 flex-1"
              style={{ background: APPS[a].color }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : i * 0.01 }}
            />
          ))}
        </div>
        <p className="mt-1.5 text-xs text-ink-3">
          One process at a time. Always. Each coloured slice is one time quantum.
        </p>
      </div>

      <div className="mt-4">
        <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
          What you perceive
        </p>
        <div className="space-y-1.5">
          {APPS.map((a) => (
            <div key={a.name} className="flex items-center gap-2.5">
              <span className="w-28 shrink-0 text-xs text-ink-2">{a.name}</span>
              <div className="h-4 flex-1 overflow-hidden rounded bg-sunken">
                <motion.div
                  className="h-full"
                  style={{
                    background: a.color,
                    // The faster the switching, the smoother each app appears.
                    opacity: 0.25 + speed * 0.15,
                  }}
                  animate={{ width: speed >= 4 ? '100%' : `${20 + speed * 15}%` }}
                  transition={{ duration: reduce ? 0 : 0.4 }}
                />
              </div>
              <span className="w-24 shrink-0 text-right text-2xs text-ink-3">
                {speed >= 4 ? 'smooth' : speed === 3 ? 'slight lag' : 'stutters badly'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-4 rounded-lg bg-sunken px-4 py-3 text-sm leading-relaxed text-ink-2">
        {speed >= 4 ? (
          <>
            At real switching speeds — thousands of times a second — you cannot perceive the gaps,
            so all three appear to run at once.{' '}
            <span className="font-medium text-ink">
              This is an illusion created by rapid switching, not true simultaneous execution
            </span>{' '}
            (on a single-core CPU).
          </>
        ) : (
          <>
            Slow the switching down and the illusion collapses: you can see each program freeze
            while another runs. Multitasking is the same mechanism, just fast enough that your eyes
            cannot follow it.
          </>
        )}
      </p>
    </div>
  )
}

/* ---------- Interrupt causes ---------- */

const INTERRUPT_CAUSES = [
  { id: 'timer', kind: 'Hardware', label: 'Time expiry', text: 'The time slice allocated to the running process ran out. The timer chip raises an interrupt so the scheduler can pick someone else.' },
  { id: 'io', kind: 'Hardware', label: 'I/O completion', text: 'A disk read finished, or the printer is ready. The device signals the CPU that the waiting process can now continue.' },
  { id: 'input', kind: 'Hardware', label: 'Peripheral input', text: 'A key was pressed, the mouse moved, the printer sent a signal. The CPU must be told immediately.' },
  { id: 'hwfail', kind: 'Hardware', label: 'Hardware failure', text: 'A power failure, device malfunction or parity error. These are usually non-maskable — they cannot be ignored.' },
  { id: 'syscall', kind: 'Software', label: 'System call', text: 'A program asks the OS for a service using a software interrupt — open a file, create a process, allocate memory.' },
  { id: 'osreq', kind: 'Software', label: 'OS service request', text: 'The operating system itself needs to perform a specific operation and interrupts the current flow to do it.' },
  { id: 'error', kind: 'Software', label: 'Program error', text: 'Division by zero, or an invalid instruction. The process cannot continue meaningfully.' },
  { id: 'memviol', kind: 'Software', label: 'Memory access violation', text: 'The process tried to touch memory outside its allocated space. Memory protection catches it and the OS usually terminates the process.' },
  { id: 'resource', kind: 'Software', label: 'Resource unavailable', text: 'A requested resource is not currently available, so the process must wait until it is.' },
  { id: 'user', kind: 'Software', label: 'User-initiated termination', text: 'The user asked to stop a running program, so an interrupt halts its execution.' },
]

export function InterruptExplorer() {
  const [active, setActive] = useState(INTERRUPT_CAUSES[0].id)
  const cause = INTERRUPT_CAUSES.find((c) => c.id === active)!

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="flex flex-wrap gap-1.5">
        {INTERRUPT_CAUSES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c.id)}
            aria-pressed={active === c.id}
            className={cx(
              'rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors',
              active === c.id
                ? 'border-brand-500 bg-brand-600 text-white'
                : c.kind === 'Hardware'
                  ? 'border-accent-200 bg-accent-50 text-accent-800 hover:border-accent-400 dark:border-accent-800 dark:bg-accent-950/40 dark:text-accent-300'
                  : 'border-line bg-sunken text-ink-2 hover:border-line-strong',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-sunken px-4 py-3.5">
        <p className="mb-1 flex items-center gap-2">
          <span className="font-semibold text-ink">{cause.label}</span>
          <span
            className={cx(
              'rounded-full border px-2 py-0.5 text-2xs font-medium',
              cause.kind === 'Hardware'
                ? 'border-accent-300 bg-accent-50 text-accent-800 dark:border-accent-700 dark:bg-accent-950/50 dark:text-accent-300'
                : 'border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-700 dark:bg-brand-950/50 dark:text-brand-300',
            )}
          >
            {cause.kind} interrupt
          </span>
        </p>
        <p className="text-base leading-relaxed text-ink-2">{cause.text}</p>
      </div>

      <ol className="mt-4 space-y-2">
        {[
          'An interrupt signal is sent to the CPU.',
          'The CPU pauses the current process and saves its state into the PCB.',
          'The OS runs an interrupt handler to manage the event.',
          'Once done, the original process resumes where it left off — or a different process is dispatched.',
        ].map((s, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-ink-2">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-2xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
              {i + 1}
            </span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- File type explorer ---------- */

const FILE_TYPES = [
  { cat: 'Text', exts: ['.txt', '.doc / .docx', '.odt', '.rtf', '.pdf'], opens: 'Notepad, Word, LibreOffice Writer', icon: 'file' as IconName },
  { cat: 'Spreadsheet', exts: ['.xls / .xlsx', '.ods', '.csv'], opens: 'Excel, Google Sheets, Calc', icon: 'chart' as IconName },
  { cat: 'Presentation', exts: ['.ppt / .pptx', '.odp'], opens: 'PowerPoint, Impress', icon: 'presentation' as IconName },
  { cat: 'Image', exts: ['.jpg / .jpeg', '.png', '.gif', '.bmp'], opens: 'Photos, Photoshop, GIMP', icon: 'image' as IconName },
  { cat: 'Audio', exts: ['.mp3', '.wav'], opens: 'VLC, Windows Media Player', icon: 'audio' as IconName },
  { cat: 'Video', exts: ['.mp4', '.avi', '.mkv', '.wmv'], opens: 'VLC, Media Player', icon: 'video' as IconName },
  { cat: 'Compressed', exts: ['.zip', '.rar', '.tar', '.gz'], opens: 'WinRAR, 7-Zip', icon: 'archive' as IconName },
  { cat: 'Executable', exts: ['.exe', '.app', '.bat', '.sh'], opens: 'Run directly by the OS', icon: 'gear' as IconName },
  { cat: 'Web', exts: ['.html / .htm', '.css', '.js', '.php'], opens: 'Browsers, code editors', icon: 'globe' as IconName },
  { cat: 'Programming', exts: ['.py', '.java', '.cpp'], opens: 'IDEs, compilers', icon: 'code' as IconName },
]

export function FileTypeExplorer() {
  const [active, setActive] = useState(0)
  const t = FILE_TYPES[active]

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="flex flex-wrap gap-1.5">
        {FILE_TYPES.map((f, i) => (
          <button
            key={f.cat}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={cx(
              'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors',
              active === i
                ? 'border-brand-500 bg-brand-600 text-white'
                : 'border-line bg-sunken text-ink-2 hover:border-line-strong',
            )}
          >
            <Icon name={f.icon} size={15} className="shrink-0" />
            {f.cat}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg bg-sunken px-4 py-3.5">
        <p className="mb-2.5 flex items-center gap-2.5 font-semibold text-ink">
          <Icon name={t.icon} size={18} className="shrink-0 text-brand-600 dark:text-brand-400" />
          {t.cat} files
        </p>
        <div className="mb-2 flex flex-wrap gap-1.5">
          {t.exts.map((e) => (
            <span
              key={e}
              className="rounded-md border border-line bg-card px-2 py-0.5 font-mono text-xs text-ink"
            >
              {e}
            </span>
          ))}
        </div>
        <p className="text-sm text-ink-2">
          <span className="font-medium text-ink">Opened by: </span>
          {t.opens}
        </p>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        The extension is how the operating system decides{' '}
        <span className="font-medium text-ink">which application should open the file</span>. It
        does not change what is inside the file — renaming <span className="font-mono">song.mp3</span>{' '}
        to <span className="font-mono">song.txt</span> does not turn music into text; it just makes
        the OS hand it to the wrong program.
      </p>
    </div>
  )
}

/* ---------- CLI vs GUI side by side ---------- */

export function InterfaceComparison() {
  const [mode, setMode] = useState<'cli' | 'gui'>('gui')

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="flex gap-1.5 border-b border-line bg-sunken/60 p-3">
        {(['gui', 'cli'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={cx(
              'rounded-lg px-3 py-1.5 text-sm font-medium uppercase transition-colors',
              mode === m ? 'bg-brand-600 text-white shadow-sm' : 'bg-card text-ink-2 hover:bg-brand-50 dark:hover:bg-brand-950',
            )}
          >
            {m}
          </button>
        ))}
        <p className="ml-auto self-center text-xs text-ink-3">Same task: copy a file</p>
      </div>

      <div className="p-4 sm:p-5">
        {mode === 'gui' ? (
          <div className="rounded-lg border border-line bg-sunken/50 p-4">
            <div className="mb-3 flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-danger-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-warn-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-success-400" />
              <span className="ml-2 text-xs text-ink-3">File Explorer</span>
            </div>
            <div className="space-y-1.5">
              {[
                { name: 'report.txt', icon: 'file' as IconName },
                { name: 'notes.docx', icon: 'file' as IconName },
                { name: 'trip.jpg', icon: 'image' as IconName },
              ].map((f, i) => (
                <div
                  key={f.name}
                  className={cx(
                    'flex items-center gap-2 rounded px-2.5 py-1.5 text-sm',
                    i === 0 ? 'bg-brand-600 text-white' : 'text-ink-2',
                  )}
                >
                  <Icon name={f.icon} size={14} className="shrink-0" />
                  {f.name}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-ink-3">
              Right-click → Copy → navigate → Paste. Four steps, but you can see everything and
              guess your way through it.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-slate-950 p-4 font-mono text-sm leading-relaxed">
            <p className="text-emerald-400">
              nimal@pc:~/Documents$ <span className="text-slate-200">cp report.txt ../Backup/</span>
            </p>
            <p className="text-slate-400">nimal@pc:~/Documents$ ▍</p>
            <p className="mt-3 text-xs text-slate-300">
              One line. Faster if you already know it — and it can be scripted to run on a thousand
              files. But nothing on screen tells you the command exists.
            </p>
          </div>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-sunken/50 p-3.5">
            <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              GUI strengths
            </p>
            <ProsCons
              pros={[
                'Easy for beginners — visual cues everywhere',
                'Gentle learning curve',
                'Errors shown as readable messages',
              ]}
              cons={['Uses more memory and processing power', 'Slower for experts navigating menus']}
            />
          </div>
          <div className="rounded-lg border border-line bg-sunken/50 p-3.5">
            <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              CLI strengths
            </p>
            <ProsCons
              pros={[
                'Lightweight — uses fewer resources',
                'Very fast for experienced users',
                'Tasks can be automated and scripted',
              ]}
              cons={['Requires knowing the commands', 'Errors are harder for beginners to interpret']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <ul className="space-y-1.5 text-sm text-ink-2">
      {pros.map((p) => (
        <li key={p} className="flex gap-2">
          <Icon name="check" size={14} className="mt-1 shrink-0 text-success-700 dark:text-success-400" />
          {p}
        </li>
      ))}
      {cons.map((c) => (
        <li key={c} className="flex gap-2 text-ink-3">
          <Icon name="cross" size={14} className="mt-1 shrink-0 text-danger-500" />
          {c}
        </li>
      ))}
    </ul>
  )
}
