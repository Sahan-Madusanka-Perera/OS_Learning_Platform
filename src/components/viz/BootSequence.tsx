import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/components/ui/Icon'

/* The boot sequence as a machine the student advances themselves.
   Each stage names what is actually happening in hardware, so
   "press power → desktop appears" stops being a black box. */

const STAGES = [
  {
    id: 'power',
    label: 'Power On',
    icon: 'plug' as IconName,
    what: 'Electricity flows to the CPU, RAM, hard drive/SSD and motherboard. The CPU becomes active and immediately looks for instructions to start the system.',
    detail: 'Nothing has been loaded yet: RAM is empty.',
  },
  {
    id: 'bios',
    label: 'BIOS / UEFI starts',
    icon: 'gear' as IconName,
    what: 'The CPU loads a small program stored in firmware on the motherboard: BIOS (or the modern UEFI). Its job is to initialise hardware and prepare the system to load the operating system.',
    detail: 'BIOS lives in non-volatile ROM, so it survives power-off. Its settings live in battery-backed CMOS memory.',
  },
  {
    id: 'post',
    label: 'POST',
    icon: 'success' as IconName,
    what: 'The Power-On Self-Test checks that essential hardware is present and working: RAM, keyboard, processor and storage devices.',
    detail: 'If something fails, the computer signals the fault with beep codes: one beep usually means POST passed.',
  },
  {
    id: 'device',
    label: 'Boot device selection',
    icon: 'disk' as IconName,
    what: 'BIOS looks for a bootable device according to the boot order in its settings (hard disk/SSD, USB drive, CD/DVD or network) and selects the one containing the operating system.',
    detail: 'It then reads the partition table: MBR on BIOS systems, GPT on UEFI systems.',
  },
  {
    id: 'loader',
    label: 'Boot loader loads',
    icon: 'layers' as IconName,
    what: 'The system finds and loads a small program called the boot loader: Windows Boot Manager, or GRUB on Linux. Its only job is to load the operating system into RAM.',
    detail: 'On UEFI systems the loader lives in the EFI System Partition (ESP) named in the GPT.',
  },
  {
    id: 'os',
    label: 'Operating system loads',
    icon: 'cpu' as IconName,
    what: 'The boot loader copies the OS kernel and system files into RAM. The OS then initialises device drivers, starts system services and prepares system resources.',
    detail: 'From this moment the OS, not the firmware, is in control of the machine.',
  },
  {
    id: 'login',
    label: 'Login screen appears',
    icon: 'monitor' as IconName,
    what: 'The OS displays the login screen, then the desktop. The computer is now ready for the user to work.',
    detail: 'Booting is complete. Everything from here on is the OS managing your processes.',
  },
]

export function BootSequence() {
  const [stage, setStage] = useState(0)
  const [playing, setPlaying] = useState(false)
  const reduce = useReducedMotion()
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!playing) return
    if (stage >= STAGES.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = window.setTimeout(() => setStage((s) => s + 1), 2600)
    return () => window.clearTimeout(timer.current)
  }, [playing, stage])

  const s = STAGES[stage]

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      {/* Stage rail */}
      <div className="scroll-x border-b border-line bg-sunken/60 p-3">
        <ol className="flex min-w-max items-center gap-1">
          {STAGES.map((st, i) => (
            <li key={st.id} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  setPlaying(false)
                  setStage(i)
                }}
                aria-current={i === stage ? 'step' : undefined}
                className={cx(
                  'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                  i === stage
                    ? 'bg-brand-600 text-white'
                    : i < stage
                      ? 'text-success-700 dark:text-success-400 hover:bg-sunken dark:text-success-400'
                      : 'text-ink-3 hover:bg-sunken',
                )}
              >
                <Icon name={i < stage ? 'check' : st.icon} size={15} className="shrink-0" />
                <span className="hidden sm:inline">{st.label}</span>
                <span className="sm:hidden">{i + 1}</span>
              </button>
              {i < STAGES.length - 1 && (
                <span aria-hidden="true" className="px-0.5 text-ink-3">
                  ›
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Screen mock */}
      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:p-5">
        <div className="grid aspect-[4/3] place-items-center overflow-hidden rounded-xl border-4 border-slate-700 bg-slate-950 p-3 dark:border-slate-600">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="w-full text-center"
            >
              {stage === 0 && <p className="font-mono text-2xs text-slate-400">NO SIGNAL</p>}
              {stage === 1 && (
                <p className="font-mono text-2xs leading-relaxed text-emerald-400">
                  American Megatrends
                  <br />
                  BIOS v2.17.1246
                </p>
              )}
              {stage === 2 && (
                <p className="text-left font-mono text-2xs leading-relaxed text-emerald-400">
                  Memory Test : 16384MB OK
                  <br />
                  Keyboard . . : Detected
                  <br />
                  Processor . : OK
                  <br />
                  Storage . . : SSD 512GB
                  <br />
                  <span className="text-emerald-200">POST passed ▍</span>
                </p>
              )}
              {stage === 3 && (
                <p className="text-left font-mono text-2xs leading-relaxed text-emerald-400">
                  Boot order:
                  <br />
                  1. <span className="bg-emerald-400 text-slate-950">SSD 512GB</span>
                  <br />
                  2. USB
                  <br />
                  3. Network
                </p>
              )}
              {stage === 4 && (
                <p className="font-mono text-2xs leading-relaxed text-slate-300">
                  GNU GRUB
                  <br />
                  <span className="text-emerald-400">loading kernel…</span>
                </p>
              )}
              {stage === 5 && (
                <div>
                  <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-slate-700 border-t-slate-200 motion-reduce:animate-none" />
                  <p className="font-mono text-2xs text-slate-400">starting services…</p>
                </div>
              )}
              {stage === 6 && (
                <div>
                  <div className="mx-auto mb-2 h-9 w-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500" />
                  <p className="text-2xs text-slate-300">Welcome</p>
                  <div className="mx-auto mt-2 h-5 w-24 rounded-full bg-slate-800" />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: reduce ? 0 : 0.22 }}
            >
              <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Step {stage + 1} of {STAGES.length}
              </p>
              <p className="mb-2 flex items-center gap-2.5 text-lg font-semibold tracking-tight text-ink">
                <Icon name={s.icon} size={19} className="shrink-0 text-brand-600 dark:text-brand-400" />
                {s.label}
              </p>
              <p className="text-base leading-relaxed text-ink-2">{s.what}</p>
              <p className="mt-2.5 rounded-lg bg-sunken px-3.5 py-2.5 text-sm leading-relaxed text-ink-2">
                {s.detail}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              disabled={stage === 0}
              onClick={() => {
                setPlaying(false)
                setStage((v) => v - 1)
              }}
            >
              <Icon name="arrowLeft" size={16} />
              Back
            </Button>
            <Button
              size="sm"
              disabled={stage === STAGES.length - 1}
              onClick={() => {
                setPlaying(false)
                setStage((v) => v + 1)
              }}
            >
              Next step
              <Icon name="arrowRight" size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                if (stage === STAGES.length - 1) setStage(0)
                setPlaying((p) => !p)
              }}
            >
              <Icon name={playing ? 'pause' : 'play'} size={15} />
              {playing ? 'Pause' : 'Play through'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
