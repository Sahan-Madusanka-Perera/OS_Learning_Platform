import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { allQuestions, lessonById, modules, questionById } from '@/content/course'
import { LEVEL_LABELS, type QuestionLevel } from '@/types/content'
import { useProgress } from '@/store/progress'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/Progress'
import { cx, shuffle } from '@/lib/utils'
import { Icon, MODULE_ICON } from '@/components/ui/Icon'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/* Free practice with real filters. Difficulty rises through the five
   levels — recognition, understanding, application, reasoning, exam
   style — so a student can deliberately train the level they are weak at. */

const LEVELS: QuestionLevel[] = [1, 2, 3, 4, 5]

export function PracticePage() {
  useDocumentTitle('Practice')
  const [params] = useSearchParams()
  const focusQuestionId = params.get('q')
  const recordAttempt = useProgress((s) => s.recordAttempt)
  const savedQuestions = useProgress((s) => s.savedQuestions)
  const reduce = useReducedMotion()

  const [moduleFilter, setModuleFilter] = useState<string>('all')
  const [levelFilter, setLevelFilter] = useState<QuestionLevel | 'all'>('all')
  const [savedOnly, setSavedOnly] = useState(false)
  const [session, setSession] = useState<string[] | null>(
    focusQuestionId && questionById.has(focusQuestionId) ? [focusQuestionId] : null,
  )
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  const lessonToModule = useMemo(() => {
    const map = new Map<string, string>()
    for (const m of modules) for (const l of m.lessons) map.set(l.id, m.id)
    return map
  }, [])

  const pool = useMemo(
    () =>
      allQuestions.filter((q) => {
        if (savedOnly && !savedQuestions.includes(q.id)) return false
        if (levelFilter !== 'all' && q.level !== levelFilter) return false
        if (moduleFilter !== 'all' && lessonToModule.get(q.lessonId) !== moduleFilter) return false
        return true
      }),
    [moduleFilter, levelFilter, savedOnly, savedQuestions, lessonToModule],
  )

  const start = () => {
    const picked = shuffle(pool).slice(0, 10).map((q) => q.id)
    setSession(picked)
    setIndex(0)
    setScore({ correct: 0, total: 0 })
  }

  /* ---------- Session in progress ---------- */
  if (session && session.length > 0) {
    const q = questionById.get(session[index])
    const finished = index >= session.length

    if (finished || !q) {
      const pct = score.total === 0 ? 0 : Math.round((score.correct / score.total) * 100)
      return (
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
          >
            <Card className="text-center">
              <Icon
                name={pct >= 80 ? 'target' : pct >= 50 ? 'trending' : 'reset'}
                size={38}
                className={pct >= 80 ? 'mx-auto mb-4 text-success-700 dark:text-success-400' : 'mx-auto mb-4 text-brand-600 dark:text-brand-400'}
              />
              <h1 className="text-xl font-semibold tracking-tight text-ink">Practice complete</h1>
              <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-ink">
                {score.correct}/{score.total}
              </p>
              <ProgressBar
                value={pct}
                className="mx-auto mt-3 max-w-xs"
                tone={pct >= 80 ? 'success' : 'brand'}
              />
              <p className="mx-auto mt-4 max-w-md text-md leading-relaxed text-ink-2">
                {pct >= 80
                  ? 'Excellent. Try raising the difficulty level to push further.'
                  : pct >= 50
                    ? 'Solid work. Anything you got wrong is now in your review queue.'
                    : 'Worth going back to the lessons before practising more: practice cements understanding, it does not create it.'}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button onClick={start}>Another 10 questions</Button>
                <Button variant="secondary" onClick={() => setSession(null)}>
                  Change filters
                </Button>
                <Button variant="ghost" to="/review">
                  Go to review
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )
    }

    const lesson = lessonById.get(q.lessonId)

    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <ProgressBar value={(index / session.length) * 100} className="flex-1" height={6} />
          <span className="shrink-0 font-mono text-sm tabular-nums text-ink-3">
            {index + 1} / {session.length}
          </span>
          <Button size="sm" variant="ghost" onClick={() => setSession(null)}>
            Exit
          </Button>
        </div>

        <p className="mb-3 text-xs text-ink-3">
          Level {q.level} · {LEVEL_LABELS[q.level]}
          {lesson && ` · from “${lesson.title}”`}
        </p>

        <motion.div
          key={q.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          <QuestionCard
            question={q}
            onAnswered={({ correct }) => {
              recordAttempt(q.lessonId, {
                questionId: q.id,
                correct,
                level: q.level,
                at: Date.now(),
              })
              setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }))
            }}
          />
        </motion.div>

        <Button full className="mt-4" onClick={() => setIndex((i) => i + 1)}>
          {index + 1 >= session.length ? 'See results' : 'Next question'}
          <Icon name="arrowRight" size={16} />
        </Button>
      </div>
    )
  }

  /* ---------- Setup ---------- */
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-7">
        <h1 className="text-3xl font-semibold tracking-display text-ink sm:text-4xl">
          Practice
        </h1>
        <p className="mt-2 max-w-2xl text-md leading-relaxed text-ink-2">
          Build a practice set from any part of the course. Difficulty runs from simple recognition
          up to full A/L-style questions. Pick the level you actually need to train.
        </p>
      </header>

      <Card className="mb-5">
        <FilterGroup label="Module">
          <Chip active={moduleFilter === 'all'} onClick={() => setModuleFilter('all')}>
            All modules
          </Chip>
          {modules.map((m) => (
            <Chip key={m.id} active={moduleFilter === m.id} onClick={() => setModuleFilter(m.id)}>
              <span className="inline-flex items-center gap-1.5">
                <Icon name={MODULE_ICON[m.id] ?? 'layers'} size={13} />
                {m.shortTitle}
              </span>
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Difficulty level">
          <Chip active={levelFilter === 'all'} onClick={() => setLevelFilter('all')}>
            All levels
          </Chip>
          {LEVELS.map((l) => (
            <Chip key={l} active={levelFilter === l} onClick={() => setLevelFilter(l)}>
              {l}. {LEVEL_LABELS[l]}
            </Chip>
          ))}
        </FilterGroup>

        <FilterGroup label="Source">
          <Chip active={!savedOnly} onClick={() => setSavedOnly(false)}>
            Every question
          </Chip>
          <Chip active={savedOnly} onClick={() => setSavedOnly(true)}>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="bookmark" size={13} fill="currentColor" />
              Saved only ({savedQuestions.length})
            </span>
          </Chip>
        </FilterGroup>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4">
          <Button size="lg" disabled={pool.length === 0} onClick={start}>
            Start practice ({Math.min(10, pool.length)} questions)
          </Button>
          <p className="text-sm text-ink-2">
            {pool.length === 0
              ? 'No questions match these filters: try widening them.'
              : `${pool.length} question${pool.length === 1 ? '' : 's'} match your filters.`}
          </p>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-5">
        {LEVELS.map((l) => {
          const n = allQuestions.filter((q) => q.level === l).length
          return (
            <div key={l} className="rounded-xl border border-line bg-sunken/50 px-3.5 py-3">
              <p className="text-2xs font-semibold uppercase tracking-[0.05em] text-ink-3">
                Level {l}
              </p>
              <p className="text-sm font-medium text-ink">{LEVEL_LABELS[l]}</p>
              <p className="mt-0.5 font-mono text-xs text-ink-3">{n} questions</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        'rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-brand-500 bg-brand-600 text-white'
          : 'border-line bg-card text-ink-2 hover:border-line-strong hover:text-ink',
      )}
    >
      {children}
    </button>
  )
}
