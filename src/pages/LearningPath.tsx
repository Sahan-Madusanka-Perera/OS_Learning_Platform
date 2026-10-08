import { Link } from 'react-router-dom'
import { modules } from '@/content/course'
import { useCourseOverview } from '@/hooks/useMastery'
import { STAGE_META } from '@/lib/mastery'
import { cx } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Icon, MODULE_ICON } from '@/components/ui/Icon'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/* The whole course as one vertical route. The student should always be
   able to see where they are, what they have finished, and what is next —
   without having to remember it. */

export function LearningPath() {
  useDocumentTitle('Learning path')
  const overview = useCourseOverview()

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-display text-ink sm:text-4xl">
          Your learning path
        </h1>
        <p className="mt-2 max-w-2xl text-md leading-relaxed text-ink-2">
          Work down the path in order. Each lesson builds on the ones above it, and the coloured
          ring shows how well you have mastered each one.
        </p>
      </header>

      {/* Legend */}
      <div className="mb-8 flex flex-wrap gap-x-4 gap-y-2 rounded-xl border border-line bg-sunken/60 px-4 py-3">
        {(['not-started', 'learning', 'familiar', 'proficient', 'mastered'] as const).map((s) => (
          <span key={s} className="flex items-center gap-1.5 text-xs text-ink-2">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: STAGE_META[s].color }}
            />
            {STAGE_META[s].label}
          </span>
        ))}
      </div>

      <ol className="relative space-y-10">
        {modules.map((mod, mi) => {
          const pct = overview.byModule[mod.id]
          return (
            <li key={mod.id}>
              <div className="mb-4 flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-sunken text-ink-2">
                  <Icon name={MODULE_ICON[mod.id] ?? 'layers'} size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
                    Module {mi + 1} · {mod.syllabusRefs.join(', ')} · {pct}% mastered
                  </p>
                  <h2 className="text-lg font-semibold tracking-tight text-ink text-balance">
                    <Link to={`/module/${mod.id}`} className="hover:underline">
                      {mod.title}
                    </Link>
                  </h2>
                </div>
              </div>

              <ol className="relative ml-5 space-y-2 border-l border-dashed border-line-strong pl-6">
                {mod.lessons.map((lesson) => {
                  const m = overview.byLesson[lesson.id]
                  const meta = STAGE_META[m.stage]
                  const isNext = lesson.id === overview.continueLessonId
                  return (
                    <li key={lesson.id} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[31px] top-4 grid h-4 w-4 place-items-center rounded-full border-2 bg-page"
                        style={{ borderColor: meta.ring }}
                      >
                        {m.stage === 'mastered' && (
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: meta.color }}
                          />
                        )}
                      </span>

                      <Link
                        to={`/lesson/${lesson.id}`}
                        className={cx(
                          'block rounded-xl border p-4 transition',
                          isNext
                            ? 'border-brand-400 bg-brand-50 shadow-sm dark:bg-brand-950/50'
                            : 'border-line bg-card hover:border-line-strong hover:bg-sunken/50',
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-base font-medium leading-snug text-ink text-balance">
                              {lesson.title}
                            </p>
                            <p className="mt-0.5 text-sm leading-relaxed text-ink-2 line-clamp-2">
                              {lesson.summary}
                            </p>
                          </div>
                          {isNext && (
                            <Badge tone="brand" className="shrink-0">
                              You are here
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-3">
                          <span className="flex items-center gap-1.5">
                            <span
                              aria-hidden="true"
                              className="h-2 w-2 rounded-full"
                              style={{ background: meta.color }}
                            />
                            {meta.label}
                            {m.percent > 0 && ` · ${m.percent}%`}
                          </span>
                          <span>⏱ {lesson.minutes} min</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ol>
            </li>
          )
        })}

        {/* Final step */}
        <li>
          <div className="ml-5 border-l border-dashed border-line-strong pl-6">
            <Link
              to="/exam"
              className="block rounded-xl border border-success-300 bg-success-50 p-5 transition hover:bg-success-100 dark:border-success-700 dark:bg-success-900/30"
            >
              <p className="text-2xs font-semibold uppercase tracking-[0.06em] text-success-700 dark:text-success-400">
                Final step
              </p>
              <p className="mt-0.5 text-md font-semibold text-ink">
                Exam preparation &amp; final mastery test
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">
                Key facts, commonly confused concepts, timed practice and a full assessment across
                every competency level.
              </p>
            </Link>
          </div>
        </li>
      </ol>
    </div>
  )
}
