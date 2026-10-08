import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { inline } from '@/lib/inline'
import { cx, normalizeAnswer, shuffle } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { AnswerFeedback } from './Feedback'
import { HotspotDiagram } from './hotspots'
import { useProgress } from '@/store/progress'
import { Icon } from '@/components/ui/Icon'
import type { Question } from '@/types/content'

export interface AnswerOutcome {
  correct: boolean
  questionId: string
}

interface Props {
  question: Question
  onAnswered: (o: AnswerOutcome) => void
  /** Hide the "save for later" control in contexts where it makes no sense. */
  compact?: boolean
  /** Deterministic shuffle seed so options don't reshuffle on re-render. */
  seed?: number
  /** Timed exams defer feedback until the end. */
  deferFeedback?: boolean
}

export function QuestionCard(props: Props) {
  // The key guarantees a fresh answer state whenever the question changes,
  // without an effect and without depending on every call site to key it.
  return <QuestionCardBody key={props.question.id} {...props} />
}

function QuestionCardBody({ question, onAnswered, compact, seed, deferFeedback }: Props) {
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [chosenLabel, setChosenLabel] = useState<string>()
  const [correctLabel, setCorrectLabel] = useState<string>()
  const [showHint, setShowHint] = useState(false)

  const savedQuestions = useProgress((s) => s.savedQuestions)
  const toggleSaved = useProgress((s) => s.toggleSavedQuestion)
  const isSaved = savedQuestions.includes(question.id)

  const submit = (isCorrect: boolean, chosen?: string, right?: string) => {
    if (answered) return
    setAnswered(true)
    setCorrect(isCorrect)
    setChosenLabel(chosen)
    setCorrectLabel(right)
    onAnswered({ correct: isCorrect, questionId: question.id })
  }

  return (
    <div className="rounded-xl border border-line bg-card p-5">
      <div className="mb-3 flex items-start gap-3">
        <p className="min-w-0 flex-1 text-md font-medium leading-relaxed text-ink text-pretty">
          {inline(question.prompt)}
        </p>
        {!compact && (
          <button
            type="button"
            onClick={() => toggleSaved(question.id)}
            aria-pressed={isSaved}
            aria-label={isSaved ? 'Remove from saved questions' : 'Save this question'}
            title={isSaved ? 'Saved' : 'Save this question'}
            className={cx(
              'shrink-0 rounded-lg p-1.5 transition-colors',
              isSaved
                ? 'text-accent-700 dark:text-accent-400'
                : 'text-ink-3 hover:bg-sunken hover:text-ink',
            )}
          >
            <Icon name="bookmark" size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>

      <QuestionBody
        question={question}
        answered={answered}
        onSubmit={submit}
        seed={seed ?? hashSeed(question.id)}
      />

      {!answered && question.hint && (
        <div className="mt-3">
          {showHint ? (
            <p className="rounded-lg bg-sunken px-3 py-2 text-sm text-ink-2">
              <span className="font-semibold text-ink">Hint: </span>
              {inline(question.hint)}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setShowHint(true)}
              className="-mx-1 rounded px-1 py-1.5 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
            >
              Show a hint
            </button>
          )}
        </div>
      )}

      {answered && !deferFeedback && (
        <AnswerFeedback
          question={question}
          correct={correct}
          chosenLabel={chosenLabel}
          correctLabel={correctLabel}
        />
      )}
    </div>
  )
}

function hashSeed(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

/* ------------------------------------------------------------------ */

function QuestionBody({
  question,
  answered,
  onSubmit,
  seed,
}: {
  question: Question
  answered: boolean
  onSubmit: (correct: boolean, chosen?: string, right?: string) => void
  seed: number
}) {
  switch (question.type) {
    case 'mcq':
      return <McqBody q={question} answered={answered} onSubmit={onSubmit} />
    case 'multi':
      return <MultiBody q={question} answered={answered} onSubmit={onSubmit} />
    case 'trueFalse':
      return <TrueFalseBody q={question} answered={answered} onSubmit={onSubmit} />
    case 'fillBlank':
      return <FillBlankBody q={question} answered={answered} onSubmit={onSubmit} />
    case 'ordering':
      return <OrderingBody q={question} answered={answered} onSubmit={onSubmit} seed={seed} />
    case 'matching':
      return <MatchingBody q={question} answered={answered} onSubmit={onSubmit} seed={seed} />
    case 'numeric':
      return <NumericBody q={question} answered={answered} onSubmit={onSubmit} />
    case 'hotspot':
      return <HotspotBody q={question} answered={answered} onSubmit={onSubmit} />
    case 'structured':
      return <StructuredBody q={question} answered={answered} onSubmit={onSubmit} />
  }
}

/* ---------- Multiple choice ---------- */
function McqBody({
  q,
  answered,
  onSubmit,
}: {
  q: Extract<Question, { type: 'mcq' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
}) {
  const [picked, setPicked] = useState<number | null>(null)
  const reduce = useReducedMotion()

  return (
    <div role="radiogroup" aria-label="Answer options" className="space-y-2">
      {q.options.map((opt, i) => {
        const isPicked = picked === i
        const isCorrect = i === q.correct
        const show = answered
        return (
          <motion.button
            key={i}
            type="button"
            role="radio"
            aria-checked={isPicked}
            disabled={answered}
            whileTap={reduce || answered ? undefined : { scale: 0.99 }}
            onClick={() => {
              setPicked(i)
              onSubmit(isCorrect, opt, q.options[q.correct])
            }}
            className={cx(
              'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-base leading-relaxed transition-colors',
              !show && 'border-line hover:border-brand-300 hover:bg-brand-50/50 dark:hover:bg-brand-950/30',
              show && isCorrect && 'border-success-400 bg-success-50 dark:border-success-600 dark:bg-success-900/25',
              show && isPicked && !isCorrect && 'border-danger-400 bg-danger-50 dark:border-danger-600 dark:bg-danger-900/25',
              show && !isCorrect && !isPicked && 'border-line opacity-70',
            )}
          >
            <span
              aria-hidden="true"
              className={cx(
                'mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full border text-2xs font-bold',
                show && isCorrect
                  ? 'border-success-600 bg-success-600 text-white'
                  : show && isPicked
                    ? 'border-danger-500 bg-danger-500 text-white'
                    : 'border-line-strong text-ink-3',
              )}
            >
              {show && isCorrect ? (
                <Icon name="check" size={12} strokeWidth={2.4} />
              ) : show && isPicked ? (
                <Icon name="cross" size={12} strokeWidth={2.4} />
              ) : (
                String.fromCharCode(65 + i)
              )}
            </span>
            <span className={cx('min-w-0', show && isCorrect ? 'text-ink' : 'text-ink-2')}>
              {inline(opt)}
              {show && isPicked && !isCorrect && q.optionFeedback?.[i] && (
                <span className="mt-1 block text-sm italic text-danger-700 dark:text-danger-300">
                  {inline(q.optionFeedback[i]!)}
                </span>
              )}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

/* ---------- Select all that apply ---------- */
function MultiBody({
  q,
  answered,
  onSubmit,
}: {
  q: Extract<Question, { type: 'multi' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
}) {
  const [picked, setPicked] = useState<number[]>([])

  const check = () => {
    const ok =
      picked.length === q.correct.length && picked.every((p) => q.correct.includes(p))
    onSubmit(
      ok,
      picked.map((i) => q.options[i]).join(', ') || '(nothing)',
      q.correct.map((i) => q.options[i]).join(', '),
    )
  }

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink-3">Select all that apply.</p>
      <div className="space-y-2">
        {q.options.map((opt, i) => {
          const on = picked.includes(i)
          const isCorrect = q.correct.includes(i)
          return (
            <label
              key={i}
              className={cx(
                'flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-base leading-relaxed transition-colors',
                !answered && 'border-line hover:border-brand-300',
                answered && isCorrect && 'border-success-400 bg-success-50 dark:border-success-600 dark:bg-success-900/25',
                answered && on && !isCorrect && 'border-danger-400 bg-danger-50 dark:border-danger-600 dark:bg-danger-900/25',
                answered && !isCorrect && !on && 'opacity-70',
              )}
            >
              <input
                type="checkbox"
                disabled={answered}
                checked={on}
                onChange={() =>
                  setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))
                }
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand-500)]"
              />
              <span className="min-w-0 text-ink-2">{inline(opt)}</span>
            </label>
          )
        })}
      </div>
      {!answered && (
        <Button className="mt-3" size="sm" disabled={picked.length === 0} onClick={check}>
          Check answer
        </Button>
      )}
    </div>
  )
}

/* ---------- True / False ---------- */
function TrueFalseBody({
  q,
  answered,
  onSubmit,
}: {
  q: Extract<Question, { type: 'trueFalse' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
}) {
  const [picked, setPicked] = useState<boolean | null>(null)

  return (
    <div className="flex gap-3">
      {[true, false].map((val) => {
        const isPicked = picked === val
        const isCorrect = val === q.correct
        return (
          <button
            key={String(val)}
            type="button"
            disabled={answered}
            onClick={() => {
              setPicked(val)
              onSubmit(val === q.correct, val ? 'True' : 'False', q.correct ? 'True' : 'False')
            }}
            className={cx(
              'flex-1 rounded-xl border px-4 py-3.5 text-md font-medium transition-colors',
              !answered && 'border-line text-ink-2 hover:border-brand-300 hover:bg-brand-50/50 dark:hover:bg-brand-950/30',
              answered && isCorrect && 'border-success-400 bg-success-50 text-ink dark:border-success-600 dark:bg-success-900/25',
              answered && isPicked && !isCorrect && 'border-danger-400 bg-danger-50 text-ink dark:border-danger-600 dark:bg-danger-900/25',
              answered && !isCorrect && !isPicked && 'border-line opacity-70',
            )}
          >
            {val ? 'True' : 'False'}
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Fill in the blank ---------- */
function FillBlankBody({
  q,
  answered,
  onSubmit,
}: {
  q: Extract<Question, { type: 'fillBlank' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
}) {
  const [value, setValue] = useState('')

  const check = () => {
    const ok = q.accepted.some((a) => normalizeAnswer(a) === normalizeAnswer(value))
    onSubmit(ok, value.trim() || '(blank)', q.accepted[0])
  }

  return (
    <div>
      <label className="sr-only" htmlFor={`fb-${q.id}`}>
        Your answer
      </label>
      <input
        id={`fb-${q.id}`}
        value={value}
        disabled={answered}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && value.trim() && !answered) check()
        }}
        placeholder="Type your answer…"
        autoComplete="off"
        className={cx(
          'w-full rounded-xl border bg-card px-4 py-3 text-md text-ink placeholder:text-ink-3 focus:outline-none',
          answered ? 'border-line opacity-80' : 'border-line focus:border-brand-400',
        )}
      />
      {!answered && (
        <Button className="mt-3" size="sm" disabled={!value.trim()} onClick={check}>
          Check answer
        </Button>
      )}
    </div>
  )
}

/* ---------- Numeric ---------- */
function NumericBody({
  q,
  answered,
  onSubmit,
}: {
  q: Extract<Question, { type: 'numeric' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
}) {
  const [value, setValue] = useState('')

  const check = () => {
    // Accept "24", "24 KB", "24kb" or "4 block": a number, optionally followed by
    // the question's own unit (any case, singular or plural). A different unit,
    // such as "24 MB" on a KB question, is still marked wrong.
    const m = value.replace(/,/g, '').trim().match(/^([-+]?(?:\d+\.?\d*|\.\d+))\s*([a-zA-Z]*)$/)
    const unit = (q.unit ?? '').toLowerCase()
    const typed = m?.[2].toLowerCase() ?? ''
    const unitOk = !typed || typed === unit || typed === unit.replace(/s$/, '')
    const n = m && unitOk ? Number(m[1]) : NaN
    const tol = q.tolerance ?? 0
    const ok = Number.isFinite(n) && Math.abs(n - q.answer) <= tol
    onSubmit(
      ok,
      `${value.trim() || '(blank)'}${q.unit ? ` ${q.unit}` : ''}`,
      `${q.answer}${q.unit ? ` ${q.unit}` : ''}`,
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <label className="sr-only" htmlFor={`num-${q.id}`}>
          Your numeric answer
        </label>
        <input
          id={`num-${q.id}`}
          value={value}
          disabled={answered}
          inputMode="decimal"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && value.trim() && !answered) check()
          }}
          placeholder="0"
          className="w-40 rounded-xl border border-line bg-card px-4 py-3 text-right font-mono text-md text-ink focus:border-brand-400 focus:outline-none"
        />
        {q.unit && <span className="font-mono text-md text-ink-2">{q.unit}</span>}
      </div>
      {!answered && (
        <Button className="mt-3" size="sm" disabled={!value.trim()} onClick={check}>
          Check answer
        </Button>
      )}
    </div>
  )
}

/* ---------- Ordering (drag or keyboard-friendly move buttons) ---------- */
function OrderingBody({
  q,
  answered,
  onSubmit,
  seed,
}: {
  q: Extract<Question, { type: 'ordering' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
  seed: number
}) {
  const [order, setOrder] = useState(() => {
    const s = shuffle(q.items, seed)
    // Guarantee the shuffle actually differs from the answer.
    return s.join('|') === q.items.join('|') ? [...s].reverse() : s
  })

  const move = (from: number, to: number) => {
    if (answered || to < 0 || to >= order.length) return
    const next = [...order]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    setOrder(next)
  }

  const check = () => {
    const ok = order.every((item, i) => item === q.items[i])
    onSubmit(ok, order.join(' → '), q.items.join(' → '))
  }

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink-3">
        Put these in the correct order (use the arrows).
      </p>
      <ol className="space-y-2">
        {order.map((item, i) => {
          const rightPlace = answered && item === q.items[i]
          return (
            <li
              key={`${item}-${i}`}
              className={cx(
                'flex items-center gap-3 rounded-xl border px-3 py-2.5',
                !answered && 'border-line bg-card',
                rightPlace && 'border-success-400 bg-success-50 dark:border-success-600 dark:bg-success-900/25',
                answered && !rightPlace && 'border-danger-400 bg-danger-50 dark:border-danger-600 dark:bg-danger-900/25',
              )}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sunken text-2xs font-bold text-ink-2">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 text-base leading-snug text-ink-2">
                {inline(item)}
              </span>
              {!answered && (
                <span className="flex shrink-0 flex-col">
                  <button
                    type="button"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}
                    aria-label={`Move "${item}" up`}
                    className="grid h-7 w-8 place-items-center rounded text-ink-3 transition hover:bg-sunken hover:text-ink disabled:opacity-30"
                  >
                    <Icon name="chevronDown" size={14} className="rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, i + 1)}
                    disabled={i === order.length - 1}
                    aria-label={`Move "${item}" down`}
                    className="grid h-7 w-8 place-items-center rounded text-ink-3 transition hover:bg-sunken hover:text-ink disabled:opacity-30"
                  >
                    <Icon name="chevronDown" size={14} />
                  </button>
                </span>
              )}
            </li>
          )
        })}
      </ol>
      {!answered && (
        <Button className="mt-3" size="sm" onClick={check}>
          Check order
        </Button>
      )}
      {answered && (
        <div className="mt-3 rounded-lg bg-sunken px-3.5 py-2.5">
          <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
            Correct order
          </p>
          <ol className="space-y-0.5 text-sm text-ink-2">
            {q.items.map((item, i) => (
              <li key={`${item}-${i}`}>
                {i + 1}. {inline(item)}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

/* ---------- Matching ---------- */
function MatchingBody({
  q,
  answered,
  onSubmit,
  seed,
}: {
  q: Extract<Question, { type: 'matching' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
  seed: number
}) {
  // Several matching questions legitimately share one answer across items
  // (two causes, both "Software interrupt"). Offer each distinct answer once —
  // duplicated dropdown entries are confusing and collide as React keys.
  const rights = useMemo(
    () => shuffle([...new Set(q.pairs.map((p) => p.right))], seed),
    [q.pairs, seed],
  )
  const [picks, setPicks] = useState<Record<number, string>>({})

  const check = () => {
    const ok = q.pairs.every((p, i) => picks[i] === p.right)
    onSubmit(
      ok,
      q.pairs.map((p, i) => `${p.left} → ${picks[i] ?? '(none)'}`).join('; '),
      q.pairs.map((p) => `${p.left} → ${p.right}`).join('; '),
    )
  }

  const allPicked = q.pairs.every((_, i) => picks[i])

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink-3">Match each item to its pair.</p>
      <div className="space-y-2">
        {q.pairs.map((pair, i) => {
          const right = answered && picks[i] === pair.right
          return (
            <div
              key={i}
              className={cx(
                'flex flex-col gap-2 rounded-xl border px-3.5 py-3 sm:flex-row sm:items-center',
                !answered && 'border-line bg-card',
                right && 'border-success-400 bg-success-50 dark:border-success-600 dark:bg-success-900/25',
                answered && !right && 'border-danger-400 bg-danger-50 dark:border-danger-600 dark:bg-danger-900/25',
              )}
            >
              <span className="flex-1 text-base font-medium text-ink">{inline(pair.left)}</span>
              <span aria-hidden="true" className="hidden text-ink-3 sm:block">→</span>
              <label className="sr-only" htmlFor={`m-${q.id}-${i}`}>
                Match for {pair.left}
              </label>
              <select
                id={`m-${q.id}-${i}`}
                disabled={answered}
                value={picks[i] ?? ''}
                onChange={(e) => setPicks((p) => ({ ...p, [i]: e.target.value }))}
                className="flex-1 rounded-lg border border-line bg-card px-3 py-2 text-base text-ink focus:border-brand-400 focus:outline-none"
              >
                <option value="">Choose…</option>
                {rights.map((r, ri) => (
                  <option key={`${r}-${ri}`} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {answered && !right && (
                <span className="text-sm text-ink-2 sm:ml-2">
                  → <span className="font-medium text-ink">{pair.right}</span>
                </span>
              )}
            </div>
          )
        })}
      </div>
      {!answered && (
        <Button className="mt-3" size="sm" disabled={!allPicked} onClick={check}>
          Check matches
        </Button>
      )}
    </div>
  )
}

/* ---------- Hotspot: click the right part of a diagram ---------- */
function HotspotBody({
  q,
  answered,
  onSubmit,
}: {
  q: Extract<Question, { type: 'hotspot' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
}) {
  const [picked, setPicked] = useState<string | null>(null)
  return (
    <HotspotDiagram
      diagram={q.diagram}
      picked={picked}
      correctRegion={q.correctRegion}
      answered={answered}
      onPick={(id, label, correctLabel) => {
        setPicked(id)
        onSubmit(id === q.correctRegion, label, correctLabel)
      }}
    />
  )
}

/* ---------- Structured (A/L style, self-marked against a scheme) ---------- */
function StructuredBody({
  q,
  answered,
  onSubmit,
}: {
  q: Extract<Question, { type: 'structured' }>
  answered: boolean
  onSubmit: (c: boolean, chosen?: string, right?: string) => void
}) {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [awarded, setAwarded] = useState<Record<string, boolean>>({})
  const [showScheme, setShowScheme] = useState(false)

  const totalMarks = q.parts.reduce((a, p) => a + p.marks, 0)
  const gained = Object.values(awarded).filter(Boolean).length
  const maxPoints = q.parts.reduce((a, p) => a + p.markScheme.length, 0)
  const scoreOutOf = maxPoints === 0 ? 0 : Math.round((gained / maxPoints) * totalMarks)

  return (
    <div className="space-y-4">
      {q.parts.map((part, pi) => (
        <div key={pi} className="rounded-xl border border-line bg-sunken/50 p-4">
          <div className="mb-2 flex items-start justify-between gap-3">
            <p className="text-base font-medium leading-relaxed text-ink">
              <span className="mr-1.5 text-ink-3">({String.fromCharCode(97 + pi)})</span>
              {inline(part.prompt)}
            </p>
            <span className="shrink-0 rounded-md bg-card px-2 py-0.5 text-2xs font-semibold text-ink-3">
              {part.marks} {part.marks === 1 ? 'mark' : 'marks'}
            </span>
          </div>
          <label className="sr-only" htmlFor={`sq-${q.id}-${pi}`}>
            Your answer to part {pi + 1}
          </label>
          <textarea
            id={`sq-${q.id}-${pi}`}
            rows={3}
            disabled={showScheme}
            value={answers[pi] ?? ''}
            onChange={(e) => setAnswers((a) => ({ ...a, [pi]: e.target.value }))}
            placeholder="Write your answer…"
            className="w-full resize-y rounded-lg border border-line bg-card px-3.5 py-2.5 text-base leading-relaxed text-ink placeholder:text-ink-3 focus:border-brand-400 focus:outline-none"
          />

          {showScheme && (
            <div className="mt-3 rounded-lg border border-line bg-card p-3.5">
              <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Mark scheme: tick each point your answer made
              </p>
              <ul className="space-y-1.5">
                {part.markScheme.map((point, si) => {
                  const key = `${pi}-${si}`
                  return (
                    <li key={si}>
                      <label className="flex cursor-pointer items-start gap-2.5 rounded px-1 py-0.5 hover:bg-sunken">
                        <input
                          type="checkbox"
                          checked={!!awarded[key]}
                          onChange={() => setAwarded((a) => ({ ...a, [key]: !a[key] }))}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-success-500)]"
                        />
                        <span className="text-sm leading-relaxed text-ink-2">
                          {inline(point)}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      ))}

      {!showScheme ? (
        <Button size="sm" onClick={() => setShowScheme(true)}>
          Show mark scheme &amp; self-mark
        </Button>
      ) : (
        !answered && (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-base text-ink-2">
              Your score:{' '}
              <span className="font-semibold text-ink">
                {scoreOutOf}/{totalMarks}
              </span>
            </p>
            <Button
              size="sm"
              onClick={() =>
                onSubmit(
                  gained / Math.max(maxPoints, 1) >= 0.6,
                  `${scoreOutOf}/${totalMarks}`,
                  `${totalMarks}/${totalMarks}`,
                )
              }
            >
              Record this score
            </Button>
          </div>
        )
      )}
    </div>
  )
}
