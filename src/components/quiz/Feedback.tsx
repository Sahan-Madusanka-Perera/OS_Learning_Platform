import { motion, useReducedMotion } from 'motion/react'
import { inline } from '@/lib/inline'
import { LEVEL_LABELS, type Question } from '@/types/content'
import { Icon } from '@/components/ui/Icon'

/* Feedback is never just "Correct". Every answer explains the
   *reasoning*, and a wrong answer additionally names what the
   student chose and why it is tempting. Mistakes are framed as
   information, never as failure. */

export function AnswerFeedback({
  question,
  correct,
  chosenLabel,
  correctLabel,
}: {
  question: Question
  correct: boolean
  chosenLabel?: string
  correctLabel?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      className={`mt-4 overflow-hidden rounded-xl border ${
        correct
          ? 'border-success-300 bg-success-50/70 dark:border-success-700/60 dark:bg-success-900/25'
          : 'border-warn-300 bg-warn-50/70 dark:border-warn-700/60 dark:bg-warn-900/20'
      }`}
    >
      <div className="flex items-center gap-2.5 px-4 pt-3.5">
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scale: 0.6 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 20 }}
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-white ${
            correct ? 'bg-success-600' : 'bg-warn-600'
          }`}
        >
          <Icon name={correct ? 'check' : 'warn'} size={15} strokeWidth={2.2} />
        </motion.span>
        <p className="font-semibold text-ink">
          {correct ? 'Correct!' : 'Not quite — and that’s useful.'}
        </p>
        <span
          className={`ml-auto text-2xs font-medium uppercase tracking-wide ${
            correct
              ? 'text-success-800 dark:text-success-300'
              : 'text-warn-800 dark:text-warn-300'
          }`}
        >
          Level {question.level} · {LEVEL_LABELS[question.level]}
        </span>
      </div>

      <div className="space-y-2.5 px-4 pb-4 pt-2.5">
        {!correct && chosenLabel && (
          <p className="text-base leading-relaxed text-ink-2">
            <span className="font-semibold text-ink">You chose: </span>
            {chosenLabel}
            {correctLabel && (
              <>
                <br />
                <span className="font-semibold text-ink">Correct answer: </span>
                {correctLabel}
              </>
            )}
          </p>
        )}

        <div className="rounded-lg bg-card/70 px-3.5 py-2.5">
          <p className="mb-0.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
            Why
          </p>
          <p className="text-base leading-relaxed text-ink-2">
            {inline(question.explanation)}
          </p>
        </div>

        {!correct && question.remediation && (
          <div className="rounded-lg border border-line bg-card px-3.5 py-2.5">
            <p className="mb-0.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              Remember this
            </p>
            <p className="text-base leading-relaxed text-ink-2">
              {inline(question.remediation)}
            </p>
          </div>
        )}

        {!correct && (
          <p className="text-sm text-ink-3">
            This question has been added to your review queue — you'll see it again.
          </p>
        )}
      </div>
    </motion.div>
  )
}
