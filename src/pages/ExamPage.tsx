import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { COMMON_MISTAKES, CONFUSED_PAIRS, EXAM_TIPS, KEY_FACTS } from '@/content/examPrep'
import { allQuestions, course, lessonById } from '@/content/course'
import { useCourseOverview } from '@/hooks/useMastery'
import { useProgress } from '@/store/progress'
import { inline } from '@/lib/inline'
import { cx, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Progress'
import { Icon } from '@/components/ui/Icon'

type Tab = 'readiness' | 'facts' | 'confused' | 'mistakes' | 'tips' | 'structured'

const TABS: { id: Tab; label: string }[] = [
  { id: 'readiness', label: 'Am I ready?' },
  { id: 'facts', label: 'Key facts' },
  { id: 'confused', label: 'Commonly confused' },
  { id: 'mistakes', label: 'Common mistakes' },
  { id: 'tips', label: 'Exam technique' },
  { id: 'structured', label: 'Structured questions' },
]

export function ExamPage() {
  const [tab, setTab] = useState<Tab>('readiness')
  const overview = useCourseOverview()
  const assessments = useProgress((s) => s.assessments)
  const reduce = useReducedMotion()

  const structured = allQuestions.filter((q) => q.type === 'structured')

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
          {course.subtitle}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-display text-ink sm:text-4xl">
          Exam preparation
        </h1>
        <p className="mt-2 max-w-2xl text-md leading-relaxed text-ink-2">
          Everything condensed for revision: the facts that carry marks, the pairs students confuse,
          the mistakes that cost marks, and full A/L-style structured questions with mark schemes.
        </p>
      </header>

      <div className="scroll-x mb-6 flex gap-1.5 border-b border-line pb-px" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cx(
              '-mb-px shrink-0 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
              tab === t.id ? 'border-brand-500 text-ink' : 'border-transparent text-ink-3 hover:text-ink',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.22 }}
      >
        {tab === 'readiness' && <Readiness overview={overview} assessments={assessments} />}

        {tab === 'facts' && (
          <div className="space-y-5">
            <p className="text-base leading-relaxed text-ink-2">
              If you can recall every line below without prompting, you have the factual content of
              this competency. Cover the list and try to reproduce each topic from memory.
            </p>
            {KEY_FACTS.map((k) => (
              <Card key={k.topic}>
                <h2 className="mb-3 font-semibold text-ink">{k.topic}</h2>
                <ul className="space-y-2">
                  {k.facts.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-base leading-relaxed text-ink-2">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      <span>{inline(f)}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}

        {tab === 'confused' && (
          <div className="space-y-4">
            <p className="text-base leading-relaxed text-ink-2">
              Most marks lost in this competency come from these twelve pairs. Each one has a
              one-line test you can apply under exam pressure.
            </p>
            {CONFUSED_PAIRS.map((c) => (
              <Card key={c.pair.join('-')}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-lg bg-brand-100 px-2.5 py-1 text-sm font-semibold text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                    {c.pair[0]}
                  </span>
                  <span aria-hidden="true" className="text-ink-3">
                    vs
                  </span>
                  <span className="rounded-lg bg-accent-100 px-2.5 py-1 text-sm font-semibold text-accent-900 dark:bg-accent-900 dark:text-accent-200">
                    {c.pair[1]}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-ink-2">{inline(c.distinction)}</p>
                <p className="mt-3 rounded-lg bg-sunken px-3.5 py-2.5 text-sm leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">How to tell them apart: </span>
                  {c.trick}
                </p>
              </Card>
            ))}
          </div>
        )}

        {tab === 'mistakes' && (
          <div className="space-y-3">
            <p className="mb-4 text-base leading-relaxed text-ink-2">
              Each of these costs real marks and is entirely avoidable.
            </p>
            {COMMON_MISTAKES.map((m, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-line bg-card"
              >
                <div className="flex gap-3 border-b border-line bg-danger-50/60 px-4 py-3 dark:bg-danger-900/20">
                  <Icon name="cross" size={16} className="mt-0.5 shrink-0 text-danger-500" />
                  <p className="text-base leading-relaxed text-ink-2">{m.wrong}</p>
                </div>
                <div className="flex gap-3 px-4 py-3">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-success-700 dark:text-success-400" />
                  <p className="text-base leading-relaxed text-ink">{inline(m.right)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tips' && (
          <div className="space-y-3">
            {EXAM_TIPS.map((t) => (
              <Card key={t.title}>
                <p className="mb-1.5 flex items-center gap-2.5 font-semibold text-ink">
                  <Icon name="examTip" size={17} className="shrink-0 text-success-700 dark:text-success-400" />
                  {t.title}
                </p>
                <p className="text-base leading-relaxed text-ink-2">{t.text}</p>
              </Card>
            ))}
          </div>
        )}

        {tab === 'structured' && (
          <div>
            <Card className="mb-5 bg-sunken/60">
              <p className="text-base leading-relaxed text-ink-2">
                <span className="font-semibold text-ink">About these questions. </span>
                These are original <span className="font-medium">A/L-style practice questions</span>{' '}
                written to match the syllabus and its command words. They are{' '}
                <span className="font-medium">not past-paper questions</span>. Each has a mark
                scheme you use to mark your own answer — which is itself excellent revision, because
                it shows you exactly what an examiner is looking for.
              </p>
            </Card>

            <div className="space-y-3">
              {structured.map((q) => {
                const lesson = lessonById.get(q.lessonId)
                const totalMarks =
                  q.type === 'structured' ? q.parts.reduce((a, p) => a + p.marks, 0) : 0
                return (
                  <Card key={q.id} interactive className="!p-0">
                    <Link to={`/practice?q=${q.id}`} className="block p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-md font-medium leading-snug text-ink">
                            {q.prompt}
                          </p>
                          {lesson && (
                            <p className="mt-1 text-sm text-ink-3">
                              Draws on: {lesson.title}
                            </p>
                          )}
                        </div>
                        <Badge tone="brand" className="shrink-0">
                          {totalMarks} marks
                        </Badge>
                      </div>
                    </Link>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function Readiness({
  overview,
  assessments,
}: {
  overview: ReturnType<typeof useCourseOverview>
  assessments: ReturnType<typeof useProgress.getState>['assessments']
}) {
  const last = assessments[0]
  const ready = overview.overall >= 80
  const nearlyReady = overview.overall >= 55

  return (
    <div className="space-y-5">
      <Card
        className={cx(
          ready
            ? 'border-success-300 bg-success-50/60 dark:border-success-700 dark:bg-success-900/25'
            : nearlyReady
              ? 'border-accent-300 bg-accent-50/50 dark:border-accent-700 dark:bg-accent-950/30'
              : '',
        )}
      >
        <div className="flex items-start gap-4">
          <Icon
            name={ready ? 'graduation' : nearlyReady ? 'books' : 'sprout'}
            size={30}
            className={
              ready
                ? 'mt-0.5 shrink-0 text-success-700 dark:text-success-400'
                : nearlyReady
                  ? 'mt-0.5 shrink-0 text-accent-700 dark:text-accent-400'
                  : 'mt-0.5 shrink-0 text-ink-3'
            }
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              {ready
                ? 'You are exam-ready'
                : nearlyReady
                  ? 'Well on the way'
                  : 'Keep building the foundations'}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-ink-2">
              {ready
                ? 'Your mastery across the competency is strong. Focus now on exam technique, timed practice, and keeping the material fresh with daily review.'
                : nearlyReady
                  ? 'You understand most of the material. Close the gaps below, then take the final assessment to confirm.'
                  : 'There is real material still to cover. Work through the learning path in order — revision only helps once the understanding is there.'}
            </p>
            <ProgressBar
              value={overview.overall}
              className="mt-3"
              tone={ready ? 'success' : 'brand'}
              label="Overall course mastery"
              showLabel
            />
          </div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Lessons mastered" value={`${overview.mastered.length}/35`} />
        <Stat label="In progress" value={String(overview.inProgress.length)} />
        <Stat label="Not started" value={String(overview.notStarted.length)} />
      </div>

      {overview.needsReview.length > 0 && (
        <Card>
          <h2 className="mb-1 font-semibold text-ink">Close these gaps first</h2>
          <p className="mb-3 text-base text-ink-2">
            Your accuracy on these lessons is below 70%. They are the highest-value revision you can do.
          </p>
          <ul className="space-y-2">
            {overview.needsReview.map((id) => {
              const l = lessonById.get(id)!
              const m = overview.byLesson[id]
              return (
                <li key={id}>
                  <Link
                    to={`/lesson/${id}`}
                    className="flex items-center gap-3 rounded-lg border border-line px-3.5 py-2.5 transition hover:border-line-strong hover:bg-sunken"
                  >
                    <span className="min-w-0 flex-1 text-base font-medium text-ink">
                      {l.title}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-ink-3">
                      {Math.round(m.accuracy * 100)}%
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Card>
      )}

      {overview.notStarted.length > 0 && (
        <Card>
          <h2 className="mb-1 font-semibold text-ink">
            {overview.notStarted.length} lesson{overview.notStarted.length === 1 ? '' : 's'} not yet
            opened
          </h2>
          <p className="mb-3 text-base text-ink-2">
            You cannot be exam-ready on material you have not met. Start with the first one.
          </p>
          <Button to={`/lesson/${overview.notStarted[0]}`} size="sm">
            Open {lessonById.get(overview.notStarted[0])?.title} →
          </Button>
        </Card>
      )}

      <Card className="border-brand-200 bg-brand-50/60 dark:border-brand-800 dark:bg-brand-950/40">
        <h2 className="mb-1 font-semibold text-ink">Final mastery test</h2>
        <p className="mb-4 text-base leading-relaxed text-ink-2">
          A full assessment across every competency level, reported by the kind of thinking each
          question demanded — recall, understanding, application, reasoning and exam style — so you
          know precisely where you stand.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button to="/assessment" size="lg">
            Take the final assessment →
          </Button>
          <Button to="/assessment?timed=1" variant="secondary" size="lg">
            Timed practice (25 min)
          </Button>
        </div>
        {last && (
          <p className="mt-3 text-sm text-ink-3">
            Last attempt: {last.score}/{last.total} ({Math.round((last.score / last.total) * 100)}%)
            on {formatDate(last.takenAt)}
          </p>
        )}
      </Card>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-card px-4 py-3">
      <p className="text-2xs font-medium uppercase tracking-[0.05em] text-ink-3">{label}</p>
      <p className="font-mono text-xl font-semibold tabular-nums text-ink">{value}</p>
    </div>
  )
}
