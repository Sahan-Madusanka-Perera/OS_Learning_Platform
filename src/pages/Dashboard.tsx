import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import {
  TOTAL_LESSONS,
  TOTAL_MINUTES,
  TOTAL_QUESTIONS,
  course,
  lessonById,
  moduleById,
  modules,
} from '@/content/course'
import { useCourseOverview } from '@/hooks/useMastery'
import { useProgress } from '@/store/progress'
import { dueItems } from '@/lib/srs'
import { currentStreak, lastNDays, todayKey } from '@/lib/streak'
import { STAGE_META, type MasteryStage } from '@/lib/mastery'
import { Button } from '@/components/ui/Button'
import { MasteryRing } from '@/components/ui/Progress'
import { Icon, MODULE_ICON } from '@/components/ui/Icon'
import { cx, formatDate } from '@/lib/utils'

export function Dashboard() {
  const overview = useCourseOverview()
  const reviews = useProgress((s) => s.reviews)
  const studyDays = useProgress((s) => s.studyDays)
  const assessments = useProgress((s) => s.assessments)
  const lessons = useProgress((s) => s.lessons)

  const due = dueItems(Object.values(reviews))
  const streak = currentStreak(studyDays)
  const continueLesson = lessonById.get(overview.continueLessonId)!
  const continueModule = moduleById.get(continueLesson.moduleId)!
  const isNewStudent = Object.keys(lessons).length === 0
  const lastAssessment = assessments[0]

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-7">
        <h1 className="text-4xl font-semibold tracking-display text-ink text-balance">
          {isNewStudent ? 'Learn how computers run themselves' : 'Welcome back'}
        </h1>
        <p className="mt-2.5 max-w-2xl text-lg leading-relaxed text-ink-2">
          {isNewStudent ? (
            <>
              You don’t need to know anything about operating systems to start. This course begins
              with what software is and ends with you drawing Gantt charts under exam conditions.
            </>
          ) : (
            <StateSentence overview={overview} streak={streak} due={due.length} />
          )}
        </p>
      </header>

      <ContinuePanel
        lesson={continueLesson}
        moduleTitle={continueModule.title}
        moduleId={continueModule.id}
        percent={overview.byLesson[continueLesson.id].percent}
        stage={overview.byLesson[continueLesson.id].stage}
        isNew={isNewStudent}
      />

      {!isNewStudent && (
        <StudyStrip
          studyDays={studyDays}
          streak={streak}
          due={due.length}
          overall={overview.overall}
          lastScore={
            lastAssessment
              ? {
                  pct: Math.round((lastAssessment.score / lastAssessment.total) * 100),
                  when: lastAssessment.takenAt,
                }
              : null
          }
        />
      )}

      {overview.needsReview.length > 0 && (
        <section className="mt-8" aria-labelledby="weak-heading">
          <h2 id="weak-heading" className="text-2xl font-semibold tracking-tight text-ink">
            Worth another look
          </h2>
          <p className="mb-4 mt-1 text-base text-ink-2">
            Your accuracy on these is under 70%. This is the highest-value revision available to you.
          </p>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
            {overview.needsReview.slice(0, 4).map((id) => {
              const l = lessonById.get(id)!
              const m = overview.byLesson[id]
              return (
                <li key={id}>
                  <Link
                    to={`/lesson/${id}`}
                    className="group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-sunken"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-warn-100 text-warn-700 dark:bg-warn-900/40 dark:text-warn-400">
                      <Icon name="warn" size={16} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-medium text-ink">
                        {l.title}
                      </span>
                      <span className="block text-xs text-ink-3">
                        {Math.round(m.accuracy * 100)}% across {m.questionsAnswered} questions
                      </span>
                    </span>
                    <Icon
                      name="chevronRight"
                      size={16}
                      className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <ModuleRail overview={overview} />

      <CourseFacts />
    </div>
  )
}

/* ------------------------------------------------------------------
   The one action that matters. Given the whole width, the mastery ring
   as meaning rather than ornament, and the only entrance animation on
   the page.
   ------------------------------------------------------------------ */
function ContinuePanel({
  lesson,
  moduleTitle,
  moduleId,
  percent,
  stage,
  isNew,
}: {
  lesson: { id: string; title: string; summary: string; minutes: number; syllabusRefs: string[] }
  moduleTitle: string
  moduleId: string
  percent: number
  stage: MasteryStage
  isNew: boolean
}) {
  const reduce = useReducedMotion()
  const meta = STAGE_META[stage]

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="continue-heading"
      className="relative overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/50 dark:border-brand-800/70 dark:bg-brand-950/30"
    >
      <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-7">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-brand-700 dark:text-brand-400">
            {isNew ? 'Start here' : 'Pick up where you left off'}
          </p>
          <h2
            id="continue-heading"
            className="mt-1.5 text-3xl font-semibold tracking-display text-ink text-balance"
          >
            {lesson.title}
          </h2>
          <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-2">{lesson.summary}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ink-3">
            <Link
              to={`/module/${moduleId}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              <Icon name={MODULE_ICON[moduleId] ?? 'layers'} size={14} />
              {moduleTitle}
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" size={14} />
              {lesson.minutes} min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="file" size={14} />
              Syllabus {lesson.syllabusRefs.join(', ')}
            </span>
          </div>

          <Button to={`/lesson/${lesson.id}`} size="lg" className="mt-5">
            {isNew ? 'Start the first lesson' : 'Continue'}
            <Icon name="arrowRight" size={17} />
          </Button>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <MasteryRing value={percent} size={104} stroke={9} color={meta.ring}>
            <div className="text-center">
              <p className="font-mono text-2xl font-semibold tabular-nums leading-none text-ink">
                {percent}
                <span className="text-md text-ink-3">%</span>
              </p>
              <p className="mt-1 text-2xs font-medium text-ink-3">{meta.label}</p>
            </div>
          </MasteryRing>
        </div>
      </div>
    </motion.section>
  )
}

/* ------------------------------------------------------------------
   Study state as one horizontal read, not four boxed hero-metrics.
   ------------------------------------------------------------------ */
function StudyStrip({
  studyDays,
  streak,
  due,
  overall,
  lastScore,
}: {
  studyDays: string[]
  streak: number
  due: number
  overall: number
  lastScore: { pct: number; when: number } | null
}) {
  const week = lastNDays(7)
  const today = todayKey()

  return (
    <section
      aria-label="Your study state"
      className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-5 rounded-2xl border border-line bg-card px-5 py-4"
    >
      <div className="flex items-center gap-3">
        <Icon
          name="flame"
          size={19}
          className={cx(streak > 0 ? 'text-accent-700 dark:text-accent-400' : 'text-ink-3')}
        />
        <div>
          <p className="text-md font-semibold leading-none text-ink">
            {streak === 0 ? 'No streak yet' : `${streak} day${streak === 1 ? '' : 's'}`}
          </p>
          <div className="mt-1.5 flex gap-1" aria-hidden="true">
            {week.map((d) => (
              <span
                key={d}
                className={cx(
                  'h-1.5 w-4 rounded-full',
                  studyDays.includes(d)
                    ? 'bg-accent-500'
                    : d === today
                      ? 'bg-line-strong'
                      : 'bg-sunken',
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/review"
        className={cx(
          'flex items-center gap-3 rounded-lg transition-opacity',
          due === 0 && 'opacity-60',
        )}
      >
        <Icon
          name="review"
          size={19}
          className={due > 0 ? 'text-brand-600 dark:text-brand-400' : 'text-ink-3'}
        />
        <div>
          <p className="text-md font-semibold leading-none text-ink">
            {due === 0 ? 'Nothing due' : `${due} to review`}
          </p>
          <p className="mt-1 text-xs text-ink-3">
            {due === 0 ? 'Your queue is clear' : 'Concepts you got wrong'}
          </p>
        </div>
      </Link>

      <Link to="/exam" className="flex items-center gap-3">
        <Icon name="exam" size={19} className="text-ink-3" />
        <div>
          <p className="text-md font-semibold leading-none text-ink">
            {lastScore ? `${lastScore.pct}%` : 'Not assessed'}
          </p>
          <p className="mt-1 text-xs text-ink-3">
            {lastScore ? `Last test · ${formatDate(lastScore.when)}` : 'Take the final assessment'}
          </p>
        </div>
      </Link>

      <div className="ml-auto flex items-center gap-3">
        <Icon name="graduation" size={19} className="text-ink-3" />
        <div>
          <p className="text-md font-semibold leading-none text-ink">{overall}% mastered</p>
          <p className="mt-1 text-xs text-ink-3">Across the whole competency</p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   The module rail. Each lesson is a dot coloured by its mastery stage,
   so the whole course reads as one picture of where the student is —
   which a grid of same-size cards cannot show, and which stays legible
   when the page is projected in a classroom.
   ------------------------------------------------------------------ */
function ModuleRail({ overview }: { overview: ReturnType<typeof useCourseOverview> }) {
  return (
    <section className="mt-9" aria-labelledby="modules-heading">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="modules-heading" className="text-2xl font-semibold tracking-tight text-ink">
            The whole course at a glance
          </h2>
          <p className="mt-1 text-base text-ink-2">
            Every dot is one lesson, coloured by how well you have mastered it.
          </p>
        </div>
        <Link
          to="/path"
          className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400 sm:inline-flex"
        >
          Learning path
          <Icon name="arrowRight" size={15} />
        </Link>
      </div>

      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
        {modules.map((m) => {
          const pct = overview.byModule[m.id]
          const done = m.lessons.filter((l) => overview.byLesson[l.id].stage === 'mastered').length
          return (
            <li key={m.id}>
              <Link
                to={`/module/${m.id}`}
                className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-sunken"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-sunken text-ink-2 transition-colors group-hover:border-brand-300 group-hover:text-brand-600 dark:group-hover:text-brand-400">
                  <Icon name={MODULE_ICON[m.id] ?? 'layers'} size={18} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="truncate text-md font-medium text-ink">{m.title}</span>
                    <span className="shrink-0 text-2xs text-ink-3">{m.syllabusRefs.join(', ')}</span>
                  </span>
                  <span className="mt-2 flex flex-wrap gap-1" aria-hidden="true">
                    {m.lessons.map((l) => {
                      const st = overview.byLesson[l.id]
                      return (
                        <span
                          key={l.id}
                          title={`${l.title} — ${STAGE_META[st.stage].label}`}
                          className="h-1.5 w-7 rounded-full transition-colors"
                          style={{
                            background:
                              st.stage === 'not-started'
                                ? 'var(--surface-sunken)'
                                : STAGE_META[st.stage].color,
                            outline:
                              st.stage === 'not-started'
                                ? '1px solid var(--border-subtle)'
                                : undefined,
                            outlineOffset: '-1px',
                          }}
                        />
                      )
                    })}
                  </span>
                </span>

                <span className="shrink-0 text-right">
                  <span className="block font-mono text-md font-semibold tabular-nums text-ink">
                    {pct}%
                  </span>
                  <span className="block text-2xs text-ink-3">
                    {done}/{m.lessons.length} mastered
                  </span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function CourseFacts() {
  return (
    <section className="mt-9 rounded-2xl border border-line bg-sunken/50 p-6" aria-labelledby="about-heading">
      <h2 id="about-heading" className="text-xl font-semibold tracking-tight text-ink">
        What this course covers
      </h2>
      <p className="mt-1.5 max-w-2xl text-base leading-relaxed text-ink-2">
        {course.competencyStatement} Every lesson follows the Sri Lankan G.C.E. A/L ICT syllabus
        for {course.competency}.
      </p>

      <dl className="mt-5 flex flex-wrap gap-x-9 gap-y-4">
        {[
          ['Lessons', String(TOTAL_LESSONS)],
          ['Questions', String(TOTAL_QUESTIONS)],
          ['Simulations', '20'],
          ['Study time', `~${Math.round(TOTAL_MINUTES / 60)} hrs`],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-ink-3">{k}</dt>
            <dd className="font-mono text-xl font-semibold tabular-nums text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
        {course.competencyLevels.map((cl) => (
          <li key={cl.ref} className="flex gap-3.5 text-sm">
            <span className="shrink-0 font-mono font-semibold text-brand-600 dark:text-brand-400">
              {cl.ref}
            </span>
            <span className="min-w-0 flex-1 text-ink-2">{cl.title}</span>
            <span className="shrink-0 text-ink-3">{cl.periods} periods</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function StateSentence({
  overview,
  streak,
  due,
}: {
  overview: ReturnType<typeof useCourseOverview>
  streak: number
  due: number
}) {
  if (overview.overall >= 85)
    return <>You’re exam-ready across the competency. Keep it sharp with daily review.</>
  if (due > 0)
    return (
      <>
        You have {due} concept{due === 1 ? '' : 's'} due for review — clearing those first is the
        fastest thing you can do today.
      </>
    )
  if (streak >= 3)
    return <>{streak} days in a row. That consistency is what turns understanding into recall.</>
  if (overview.overall >= 40) return <>You’re past a third of the way. Keep the momentum going.</>
  return <>Pick up where you left off, or clear anything waiting in your review queue.</>
}
