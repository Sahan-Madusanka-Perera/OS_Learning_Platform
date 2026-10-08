import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { inline } from '@/lib/inline'
import { ActivityShell } from './blocks'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import type { ConfusedBlock, RecallBlock, TeachBackBlock } from '@/types/content'

/* ============================================================
   Active recall
   ------------------------------------------------------------
   The student must attempt to retrieve the answer *before* it is
   shown. Retrieval, not re-reading, is what builds memory — so
   the reveal button is deliberately the only way forward.
   ============================================================ */
export function ActiveRecall({
  block,
  onComplete,
  done,
}: {
  block: RecallBlock
  onComplete: () => void
  done: boolean
}) {
  const [revealed, setRevealed] = useState(done)
  const [hintShown, setHintShown] = useState(false)
  const reduce = useReducedMotion()

  return (
    <ActivityShell
      label="Before you continue"
      icon={<Icon name="recall" size={19} className="shrink-0 text-brand-600 dark:text-brand-400" />}
      done={done}
    >
      <p className="text-md font-medium leading-relaxed text-ink">
        {inline(block.prompt)}
      </p>
      <p className="mt-1.5 text-sm text-ink-3">
        Try to answer it in your head, or out loud, without scrolling back.
      </p>

      {block.hint && !revealed && (
        <div className="mt-3">
          {hintShown ? (
            <p className="rounded-lg bg-card px-3 py-2 text-sm text-ink-2">
              <span className="font-semibold text-ink">Hint: </span>
              {inline(block.hint)}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setHintShown(true)}
              className="-mx-1 rounded px-1 py-1.5 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              Need a hint?
            </button>
          )}
        </div>
      )}

      <AnimatePresence initial={false} mode="wait">
        {!revealed ? (
          <motion.div key="btn" exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.15 }}>
            <Button
              className="mt-4"
              variant="secondary"
              size="sm"
              onClick={() => {
                setRevealed(true)
                onComplete()
              }}
            >
              Reveal the answer
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="answer"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 rounded-lg border border-line bg-card px-4 py-3"
          >
            <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              Answer
            </p>
            <p className="text-md leading-relaxed text-ink">{inline(block.answer)}</p>
            <p className="mt-2.5 border-t border-line pt-2.5 text-sm text-ink-3">
              Did yours match? If not, that gap is exactly what to re-read.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </ActivityShell>
  )
}

/* ============================================================
   Teach-back (Feynman)
   ------------------------------------------------------------
   No AI marking here — that would be expensive and unreliable.
   Instead the student writes their explanation, then grades it
   themselves against a concrete checklist. Self-marking against
   named criteria is what makes the gaps visible.
   ============================================================ */
export function TeachBack({
  block,
  storageKey,
  onComplete,
  done,
}: {
  block: TeachBackBlock
  storageKey: string
  onComplete: () => void
  done: boolean
}) {
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(storageKey) ?? ''
    } catch {
      return ''
    }
  })
  const [checking, setChecking] = useState(done)
  const [checked, setChecked] = useState<number[]>([])
  const reduce = useReducedMotion()

  const save = (v: string) => {
    setText(v)
    try {
      localStorage.setItem(storageKey, v)
    } catch {
      /* private mode — the draft just won't persist */
    }
  }

  const score = checked.length
  const total = block.checklist.length

  return (
    <ActivityShell
      label="Explain it yourself"
      icon={<Icon name="teachBack" size={19} className="shrink-0 text-accent-700 dark:text-accent-400" />}
      tone="accent"
      done={done}
    >
      <p className="text-md font-medium leading-relaxed text-ink">
        {inline(block.prompt)}
      </p>
      <p className="mt-1.5 text-sm text-ink-3">
        If you can explain it simply, you understand it. Write it as if teaching a friend who
        has never heard of this.
      </p>

      <label className="sr-only" htmlFor={storageKey}>
        Your explanation
      </label>
      <textarea
        id={storageKey}
        value={text}
        onChange={(e) => save(e.target.value)}
        rows={5}
        placeholder="In my own words…"
        className="mt-3 w-full resize-y rounded-xl border border-line bg-card px-4 py-3 text-md leading-relaxed text-ink placeholder:text-ink-3 focus:border-brand-400 focus:outline-none"
      />

      {!checking ? (
        <Button
          className="mt-3"
          variant="secondary"
          size="sm"
          disabled={text.trim().length < 20}
          onClick={() => setChecking(true)}
        >
          {text.trim().length < 20 ? 'Write a little more first…' : 'Check my explanation'}
        </Button>
      ) : (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
          className="mt-4 rounded-lg border border-line bg-card p-4"
        >
          <p className="mb-2.5 text-sm font-semibold text-ink">
            Does your explanation include each of these?
          </p>
          <ul className="space-y-2">
            {block.checklist.map((c, i) => {
              const on = checked.includes(i)
              return (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-2.5 rounded-lg px-1 py-1 transition-colors hover:bg-sunken">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() =>
                        setChecked((prev) =>
                          prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
                        )
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand-500)]"
                    />
                    <span className="text-base leading-relaxed text-ink-2">{inline(c)}</span>
                  </label>
                </li>
              )
            })}
          </ul>

          <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-line pt-3">
            <p className="text-sm text-ink-2">
              <span className="font-semibold text-ink">
                {score}/{total}
              </span>{' '}
              points covered
            </p>
            {score === total ? (
              <p className="text-sm font-medium text-success-700 dark:text-success-400">
                Excellent. You can teach this.
              </p>
            ) : (
              <p className="text-sm text-ink-3">
                The unticked points are what to revisit.
              </p>
            )}
            <Button className="ml-auto" size="sm" variant="secondary" onClick={onComplete}>
              {done ? 'Saved' : 'Mark activity done'}
            </Button>
          </div>
        </motion.div>
      )}
    </ActivityShell>
  )
}

/* ============================================================
   "I'm confused" — progressive rescue
   ------------------------------------------------------------
   Three escalating layers, revealed one at a time, so a student
   who is only slightly lost isn't buried in extra material.
   ============================================================ */
export function ConfusedHelp({ block }: { block: ConfusedBlock }) {
  const [layer, setLayer] = useState(0)
  const reduce = useReducedMotion()

  const maxLayer = 1 + (block.picture ? 1 : 0) + (block.prerequisite ? 1 : 0)

  return (
    <div className="rounded-xl border border-line bg-sunken/60 p-4">
      {layer === 0 ? (
        <button
          type="button"
          onClick={() => setLayer(1)}
          className="flex w-full items-center gap-3 text-left"
        >
          <Icon name="confused" size={19} className="shrink-0 text-ink-3" />
          <span className="min-w-0">
            <span className="block text-base font-medium text-ink">
              {inline(block.question)}
            </span>
            <span className="block text-sm text-brand-600 dark:text-brand-400">
              Tap for a simpler explanation
            </span>
          </span>
        </button>
      ) : (
        <div>
          <div className="mb-3.5 flex items-center gap-2.5">
            <Icon name="confused" size={19} className="shrink-0 text-brand-600 dark:text-brand-400" />
            <p className="text-base font-medium text-ink">{inline(block.question)}</p>
          </div>

          <div className="space-y-3">
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border border-line bg-card px-4 py-3"
            >
              <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Let's make it simpler
              </p>
              <p className="text-md leading-relaxed text-ink-2">{inline(block.simpler)}</p>
            </motion.div>

            {layer >= 2 && block.picture && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-line bg-card px-4 py-3"
              >
                <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                  Picture it
                </p>
                <p className="text-md leading-relaxed text-ink-2">{inline(block.picture)}</p>
              </motion.div>
            )}

            {layer >= maxLayer && block.prerequisite && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 dark:border-brand-800 dark:bg-brand-950/50"
              >
                <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-brand-700 dark:text-brand-300">
                  Still unsure? Go back one step
                </p>
                <Link
                  to={`/lesson/${block.prerequisite.lessonId}`}
                  className="inline-flex items-center gap-1.5 text-md font-medium text-brand-700 hover:underline dark:text-brand-300"
                >
                  <Icon name="arrowLeft" size={15} />
                  {block.prerequisite.label}
                </Link>
              </motion.div>
            )}
          </div>

          {layer < maxLayer && (
            <button
              type="button"
              onClick={() => setLayer((l) => l + 1)}
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              Still confused? Show me more
              <Icon name="chevronDown" size={15} />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
