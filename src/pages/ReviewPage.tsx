import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { lessonById, questionById } from '@/content/course'
import { useProgress } from '@/store/progress'
import { useCourseOverview } from '@/hooks/useMastery'
import { dueItems, dueLabel, REVIEW_LADDER } from '@/lib/srs'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Button } from '@/components/ui/Button'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Progress'
import { Icon } from '@/components/ui/Icon'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/* Spaced repetition, kept deliberately simple. A question you got wrong
   comes back today; each time you get it right it moves further down the
   ladder (1, 2, 4, 8, 16 days) until it graduates out of the queue. */

export function ReviewPage() {
  useDocumentTitle('Review')
  const reviews = useProgress((s) => s.reviews)
  const reviewAnswered = useProgress((s) => s.reviewAnswered)
  const overview = useCourseOverview()
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState<{ correct: number; total: number }>({
    correct: 0,
    total: 0,
  })
  const [sessionDone, setSessionDone] = useState(false)
  const reduce = useReducedMotion()

  // Snapshot the queue once so answering doesn't reshuffle mid-session.
  const [session] = useState(() =>
    dueItems(Object.values(useProgress.getState().reviews))
      .map((i) => ({ item: i, question: questionById.get(i.id) }))
      .filter((x) => x.question !== undefined)
      .slice(0, 12),
  )

  const upcoming = useMemo(
    () =>
      Object.values(reviews)
        .filter((i) => i.dueAt > Date.now())
        .sort((a, b) => a.dueAt - b.dueAt)
        .slice(0, 8),
    [reviews],
  )

  const current = session[index]

  if (session.length === 0) {
    return (
      <div className="mx-auto max-w-2xl">
        <Header />
        <Card className="text-center">
          <Icon name="sprout" size={38} className="mx-auto mb-4 text-success-700 dark:text-success-400" />
          <h2 className="text-lg font-semibold text-ink">Nothing due for review</h2>
          <p className="mx-auto mt-2 max-w-md text-md leading-relaxed text-ink-2">
            Your review queue fills up automatically. Whenever you answer a question incorrectly, it
            is scheduled to come back: first today, then after 1, 2, 4, 8 and 16 days if you keep
            getting it right.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button to={`/lesson/${overview.continueLessonId}`}>Continue learning</Button>
            <Button to="/practice" variant="secondary">
              Free practice
            </Button>
          </div>
        </Card>

        {upcoming.length > 0 && <Upcoming items={upcoming} />}
        {overview.needsReview.length > 0 && <WeakTopics ids={overview.needsReview} />}
      </div>
    )
  }

  if (sessionDone || index >= session.length) {
    const pct = answered.total === 0 ? 0 : Math.round((answered.correct / answered.total) * 100)
    return (
      <div className="mx-auto max-w-2xl">
        <Header />
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="text-center">
            <Icon
              name={pct >= 80 ? 'graduation' : pct >= 50 ? 'trending' : 'sprout'}
              size={38}
              className={pct >= 80 ? 'mx-auto mb-4 text-success-700 dark:text-success-400' : 'mx-auto mb-4 text-brand-600 dark:text-brand-400'}
            />
            <h2 className="text-xl font-semibold tracking-tight text-ink">Review session complete</h2>
            <p className="mt-1 font-mono text-3xl font-bold tabular-nums text-ink">
              {answered.correct}/{answered.total}
            </p>
            <ProgressBar
              value={pct}
              className="mx-auto mt-3 max-w-xs"
              tone={pct >= 80 ? 'success' : 'brand'}
            />
            <p className="mx-auto mt-4 max-w-md text-md leading-relaxed text-ink-2">
              {pct >= 80
                ? 'Strong recall. The questions you got right have moved further down the review ladder, so you will see them less often.'
                : pct >= 50
                  ? 'Mixed, which is exactly what review is for. The ones you missed will come back tomorrow.'
                  : 'These concepts have not stuck yet. Rather than repeating the questions, go back and re-read the lessons below, then the review will land.'}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <Button to={`/lesson/${overview.continueLessonId}`}>Continue learning</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setIndex(0)
                  setAnswered({ correct: 0, total: 0 })
                  setSessionDone(false)
                }}
              >
                Review again
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  const lesson = lessonById.get(current.question!.lessonId)

  return (
    <div className="mx-auto max-w-2xl">
      <Header />

      <div className="mb-4 flex items-center gap-3">
        <ProgressBar value={(index / session.length) * 100} className="flex-1" height={6} />
        <span className="shrink-0 font-mono text-sm tabular-nums text-ink-3">
          {index + 1} / {session.length}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <Badge tone="accent">
          Missed {current.item.lapses} time{current.item.lapses === 1 ? '' : 's'}
        </Badge>
        {lesson && (
          <Link
            to={`/lesson/${lesson.id}`}
            className="inline-flex items-center gap-1 text-ink-3 transition hover:text-ink"
          >
            from “{lesson.title}”
            <Icon name="arrowRight" size={14} className="shrink-0" />
          </Link>
        )}
      </div>

      <motion.div
        key={current.item.id}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
      >
        <QuestionCard
          question={current.question!}
          compact
          onAnswered={({ correct }) => {
            reviewAnswered(current.item.id, correct)
            setAnswered((a) => ({ correct: a.correct + (correct ? 1 : 0), total: a.total + 1 }))
          }}
        />
      </motion.div>

      <div className="mt-4 flex gap-2">
        <Button
          full
          onClick={() => {
            if (index + 1 >= session.length) setSessionDone(true)
            else setIndex((i) => i + 1)
          }}
        >
          {index + 1 >= session.length ? 'Finish session' : 'Next question'}
          <Icon name="arrowRight" size={16} />
        </Button>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-semibold tracking-display text-ink sm:text-4xl">
        Today’s review
      </h1>
      <p className="mt-2 max-w-2xl text-md leading-relaxed text-ink-2">
        Concepts you got wrong come back here, spaced out over increasing intervals. Getting one
        right pushes it further away; getting it wrong brings it back tomorrow.
      </p>
    </header>
  )
}

function Upcoming({ items }: { items: ReturnType<typeof dueItems> }) {
  return (
    <section className="mt-7">
      <SectionHeading title="Coming back later" hint="Getting one right pushes it further down the ladder." />
      <ul className="space-y-2">
        {items.map((i) => {
          const q = questionById.get(i.id)
          const l = lessonById.get(i.lessonId)
          if (!q) return null
          return (
            <li
              key={i.id}
              className="flex items-start gap-3 rounded-xl border border-line bg-card px-4 py-3"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-base text-ink line-clamp-1">{q.prompt}</span>
                <span className="block text-xs text-ink-3">{l?.title}</span>
              </span>
              <span className="shrink-0 text-xs text-ink-3">{dueLabel(i)}</span>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-xs text-ink-3">
        Intervals: {REVIEW_LADDER.slice(1).join(', ')} days. After the last one, an item graduates
        out of the queue.
      </p>
    </section>
  )
}

function WeakTopics({ ids }: { ids: string[] }) {
  return (
    <section className="mt-7">
      <SectionHeading title="Lessons worth re-reading" />
      <div className="grid gap-2 sm:grid-cols-2">
        {ids.slice(0, 6).map((id) => {
          const l = lessonById.get(id)!
          return (
            <Link
              key={id}
              to={`/lesson/${id}`}
              className="rounded-xl border border-line bg-card p-4 transition hover:border-line-strong hover:bg-sunken"
            >
              <p className="text-base font-medium text-ink">{l.title}</p>
              <p className="mt-0.5 text-xs text-ink-2">{l.summary}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
