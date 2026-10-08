import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  activityIds,
  lessonById,
  moduleById,
  nextLesson,
  practiceIdsByLesson,
  prevLesson,
  questionById,
  quickCheckIdsByLesson,
} from '@/content/course'
import { useProgress } from '@/store/progress'
import { useLessonMastery } from '@/hooks/useMastery'
import { STAGE_META } from '@/lib/mastery'
import { LessonRenderer } from '@/components/learning/LessonRenderer'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { Button } from '@/components/ui/Button'
import { MasteryRing, ProgressBar } from '@/components/ui/Progress'
import { Badge } from '@/components/ui/Badge'
import { Icon, MODULE_ICON } from '@/components/ui/Icon'
import { NotFound } from './NotFound'
import { cx } from '@/lib/utils'
import { glossaryById } from '@/content/glossary'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { inline } from '@/lib/inline'

export function LessonPage() {
  const { lessonId = '' } = useParams()
  const lesson = lessonById.get(lessonId)
  useDocumentTitle(lesson ? lesson.title : 'Lesson not found')
  const openLesson = useProgress((s) => s.openLesson)
  const markRead = useProgress((s) => s.markRead)
  const bookmarks = useProgress((s) => s.bookmarks)
  const toggleBookmark = useProgress((s) => s.toggleBookmark)
  const addNote = useProgress((s) => s.addNote)
  const recordAttempt = useProgress((s) => s.recordAttempt)
  const mastery = useLessonMastery(lessonId)
  const endRef = useRef<HTMLDivElement>(null)
  const [noteDraft, setNoteDraft] = useState('')
  const [noteSaved, setNoteSaved] = useState(false)
  const [showPractice, setShowPractice] = useState(false)

  const activityTotal = useMemo(() => (lesson ? activityIds(lesson).length : 0), [lesson])

  useEffect(() => {
    if (lesson) {
      openLesson(lesson.id, activityTotal)
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [lesson, openLesson, activityTotal])

  // "Read" is earned by actually reaching the end of the lesson body.
  useEffect(() => {
    if (!lesson || !endRef.current) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) markRead(lesson.id)
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    io.observe(endRef.current)
    return () => io.disconnect()
  }, [lesson, markRead])

  if (!lesson) return <NotFound what="lesson" />

  const mod = moduleById.get(lesson.moduleId)!
  const next = nextLesson(lesson.id)
  const prev = prevLesson(lesson.id)
  const bookmarked = bookmarks.includes(lesson.id)
  const stage = STAGE_META[mastery.stage]
  const practiceQuestions = (practiceIdsByLesson[lesson.id] ?? [])
    .map((id) => questionById.get(id))
    .filter((q) => q !== undefined)
  const quickCount = (quickCheckIdsByLesson[lesson.id] ?? []).length

  return (
    <article className="mx-auto max-w-3xl">
      {/* ---------- Breadcrumb ---------- */}
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs">
        <Link
          to={`/module/${mod.id}`}
          className="inline-flex items-center gap-1.5 text-ink-3 transition hover:text-ink"
        >
          <Icon name={MODULE_ICON[mod.id] ?? 'layers'} size={14} />
          {mod.shortTitle}
        </Link>
        <Icon name="chevronRight" size={13} className="text-ink-3" />
        <span className="text-ink-2">{lesson.title}</span>
        <span className="ml-auto flex gap-1.5">
          {lesson.syllabusRefs.map((r) => (
            <Badge key={r} tone="neutral">
              {r}
            </Badge>
          ))}
        </span>
      </nav>

      {/* ---------- Header ---------- */}
      <header className="mb-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-display text-ink text-balance sm:text-4xl">
              {lesson.title}
            </h1>
            <p className="mt-2 text-md leading-relaxed text-ink-2">{lesson.summary}</p>
          </div>
          <button
            type="button"
            onClick={() => toggleBookmark(lesson.id)}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
            className={cx(
              'shrink-0 rounded-lg p-2 transition-colors',
              bookmarked
                ? 'text-accent-700 dark:text-accent-400'
                : 'text-ink-3 hover:bg-sunken hover:text-ink',
            )}
          >
            <Icon name="bookmark" size={18} fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size={14} />
            about {lesson.minutes} min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="check" size={14} />
            {quickCount} quick-check questions
          </span>
          {activityTotal > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="notes" size={14} />
              {activityTotal} {activityTotal === 1 ? 'activity' : 'activities'}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ background: stage.color }}
            />
            {stage.label}
          </span>
        </div>
      </header>

      {/* ---------- Why it matters + objectives ---------- */}
      <div className="mb-8 space-y-4">
        <div className="rounded-2xl border border-accent-200/80 bg-accent-50/50 p-5 dark:border-accent-800/60 dark:bg-accent-950/25">
          <div className="flex gap-3.5">
            <Icon
              name="target"
              size={19}
              className="mt-0.5 shrink-0 text-accent-700 dark:text-accent-400"
            />
            <div className="min-w-0">
              <p className="mb-1 text-2xs font-semibold uppercase tracking-label text-accent-700 dark:text-accent-400">
                Why does this matter?
              </p>
              <p className="text-md leading-relaxed text-ink-2">{inline(lesson.whyItMatters)}</p>
            </div>
          </div>
        </div>

        <details className="group rounded-xl border border-line bg-card">
          <summary className="flex cursor-pointer list-none items-center gap-2.5 px-5 py-3.5 text-base font-medium text-ink-2 transition hover:text-ink">
            <Icon
              name="chevronRight"
              size={13}
              className="transition-transform group-open:rotate-90"
            />
            What you'll be able to do by the end
          </summary>
          <ul className="space-y-2 px-5 pb-4">
            {lesson.objectives.map((o, i) => (
              <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand-500"
                />
                {o}
              </li>
            ))}
          </ul>
          {lesson.prerequisites && lesson.prerequisites.length > 0 && (
            <div className="border-t border-line px-5 py-3">
              <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
                Understand these first
              </p>
              <div className="flex flex-wrap gap-2">
                {lesson.prerequisites.map((p) => {
                  const pl = lessonById.get(p)
                  return pl ? (
                    <Link
                      key={p}
                      to={`/lesson/${p}`}
                      className="rounded-lg border border-line px-2.5 py-1 text-xs text-ink-2 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
                    >
                      {pl.title}
                    </Link>
                  ) : null
                })}
              </div>
            </div>
          )}
        </details>
      </div>

      {/* ---------- Body ---------- */}
      <LessonRenderer lesson={lesson} />
      <div ref={endRef} aria-hidden="true" />

      {/* ---------- Summary ---------- */}
      <section className="mt-10 rounded-2xl border border-line bg-card p-5 sm:p-6" aria-label="Lesson summary">
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-ink">Lesson summary</h2>

        <ul className="mb-5 space-y-2.5">
          {lesson.takeaways.map((t, i) => (
            <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-2">
              <Icon name="check" size={16} className="mt-1 shrink-0 text-success-700 dark:text-success-400" />
              {t}
            </li>
          ))}
        </ul>

        {lesson.keyTerms.length > 0 && (
          <div className="border-t border-line pt-4">
            <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              Key terms
            </p>
            <div className="flex flex-wrap gap-1.5">
              {lesson.keyTerms.map((t) => {
                const g = glossaryById.get(t)
                return g ? (
                  <Link
                    key={t}
                    to={`/glossary?term=${t}`}
                    className="rounded-lg border border-line bg-sunken px-2.5 py-1 text-xs text-ink-2 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
                  >
                    {g.term}
                  </Link>
                ) : null
              })}
            </div>
          </div>
        )}
      </section>

      {/* ---------- Mastery panel ---------- */}
      <section
        className="mt-6 rounded-2xl border border-line bg-sunken/60 p-5 sm:p-6"
        aria-label="Your mastery of this lesson"
      >
        <div className="flex items-center gap-5">
          <MasteryRing value={mastery.percent} size={72} stroke={7} color={stage.ring}>
            <span className="text-md font-bold tabular-nums text-ink">{mastery.percent}%</span>
          </MasteryRing>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">{stage.label}</p>
            <p className="mt-0.5 text-base leading-relaxed text-ink-2">{stage.blurb}</p>
            <p className="mt-1.5 text-sm text-ink-3">
              <span className="font-medium text-ink-2">Next:</span> {mastery.nextStep}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
          <Metric
            label="Questions answered"
            value={`${mastery.questionsAnswered}/${quickCount}`}
          />
          <Metric
            label="Accuracy"
            value={mastery.questionsAnswered === 0 ? 'None yet' : `${Math.round(mastery.accuracy * 100)}%`}
          />
          <Metric
            label="Activities"
            value={`${mastery.activitiesDone}/${mastery.activitiesTotal}`}
          />
        </div>
        <ProgressBar value={mastery.percent} className="mt-4" tone={mastery.percent >= 72 ? 'success' : 'brand'} height={6} />
      </section>

      {/* ---------- Extra practice ---------- */}
      {practiceQuestions.length > 0 && (
        <section className="mt-6" aria-label="Extra practice">
          {!showPractice ? (
            <Button variant="secondary" full onClick={() => setShowPractice(true)}>
              Try {practiceQuestions.length} harder practice question
              {practiceQuestions.length === 1 ? '' : 's'} on this lesson
              <Icon name="arrowRight" size={16} />
            </Button>
          ) : (
            <div className="rounded-2xl border border-line bg-card p-4 sm:p-5">
              <h2 className="mb-4 font-semibold text-ink">Extra practice</h2>
              <div className="space-y-3">
                {practiceQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    onAnswered={({ correct }) =>
                      recordAttempt(lesson.id, {
                        questionId: q.id,
                        correct,
                        level: q.level,
                        at: Date.now(),
                      })
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ---------- Personal note ---------- */}
      <section className="mt-6 rounded-2xl border border-line bg-card p-5" aria-label="Add a note">
        <label htmlFor="lesson-note" className="mb-2 block text-sm font-semibold text-ink">
          Add a personal note on this lesson
        </label>
        <textarea
          id="lesson-note"
          rows={2}
          value={noteDraft}
          onChange={(e) => {
            setNoteDraft(e.target.value)
            setNoteSaved(false)
          }}
          placeholder="Something you want to remember, or a question to ask your teacher…"
          className="w-full resize-y rounded-xl border border-line bg-sunken px-3.5 py-2.5 text-base text-ink placeholder:text-ink-3 focus:border-brand-400 focus:outline-none"
        />
        <div className="mt-2 flex items-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            disabled={!noteDraft.trim()}
            onClick={() => {
              addNote(lesson.id, noteDraft.trim())
              setNoteDraft('')
              setNoteSaved(true)
            }}
          >
            Save note
          </Button>
          {noteSaved && (
            <span className="text-sm text-success-700 dark:text-success-400">
              Saved. Find it under Notes.
            </span>
          )}
        </div>
      </section>

      {/* ---------- Navigation ---------- */}
      <nav className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row" aria-label="Lesson navigation">
        {prev ? (
          <Link
            to={`/lesson/${prev.id}`}
            className="group flex-1 rounded-xl border border-line p-4 transition hover:border-line-strong hover:bg-sunken"
          >
            <span className="flex items-center gap-1 text-2xs font-medium uppercase tracking-wide text-ink-3">
              <Icon name="arrowLeft" size={13} className="transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="mt-0.5 block text-base font-medium text-ink">{prev.title}</span>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <Link
            to={`/lesson/${next.id}`}
            className="group flex-1 rounded-xl border border-brand-300 bg-brand-50 p-4 text-right transition hover:bg-brand-100 dark:border-brand-700 dark:bg-brand-950/60 dark:hover:bg-brand-900/60"
          >
            <span className="flex items-center justify-end gap-1 text-2xs font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
              Next
              <Icon name="arrowRight" size={13} className="transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-0.5 block text-base font-medium text-ink">{next.title}</span>
          </Link>
        ) : (
          <Link
            to="/exam"
            className="flex-1 rounded-xl border border-success-300 bg-success-50 p-4 text-right transition hover:bg-success-100 dark:border-success-700 dark:bg-success-900/40"
          >
            <span className="flex items-center justify-end gap-1 text-2xs font-medium uppercase tracking-wide text-success-700 dark:text-success-400">
              Course complete
              <Icon name="arrowRight" size={13} />
            </span>
            <span className="mt-0.5 block text-base font-medium text-ink">
              Go to exam preparation
            </span>
          </Link>
        )}
      </nav>
    </article>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs font-medium uppercase tracking-label text-ink-3">{label}</p>
      <p className="mt-0.5 font-mono text-xl font-semibold tabular-nums text-ink">{value}</p>
    </div>
  )
}
