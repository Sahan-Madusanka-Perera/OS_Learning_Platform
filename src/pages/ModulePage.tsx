import { Link, useParams } from 'react-router-dom'
import { moduleById, modules, quickCheckIdsByLesson } from '@/content/course'
import { useCourseOverview } from '@/hooks/useMastery'
import { STAGE_META } from '@/lib/mastery'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MasteryRing, ProgressBar } from '@/components/ui/Progress'
import { NotFound } from './NotFound'
import { MODULE_ICON } from '@/components/ui/Icon'
import { Icon } from '@/components/ui/Icon'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function ModulePage() {
  const { moduleId = '' } = useParams()
  const mod = moduleById.get(moduleId)
  useDocumentTitle(mod ? mod.title : 'Module not found')
  const overview = useCourseOverview()

  if (!mod) return <NotFound what="module" />

  const index = modules.findIndex((m) => m.id === mod.id)
  const pct = overview.byModule[mod.id]
  const firstUnfinished =
    mod.lessons.find((l) => overview.byLesson[l.id].stage !== 'mastered') ?? mod.lessons[0]
  const nextMod = modules[index + 1]

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink-3">
          Module {index + 1} · Competency level {mod.syllabusRefs.join(', ')}
        </p>
        <div className="mt-1 flex items-start gap-4">
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-sunken text-ink-2">
            <Icon name={MODULE_ICON[mod.id] ?? 'layers'} size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-semibold tracking-display text-ink text-balance">
              {mod.title}
            </h1>
            <p className="mt-2 text-md leading-relaxed text-ink-2">{mod.description}</p>
          </div>
        </div>
      </header>

      <Card className="mb-7 !p-0">
        <div className="flex items-center gap-5 p-5">
          <MasteryRing value={pct} size={68} stroke={7}>
            <span className="text-base font-bold tabular-nums text-ink">{pct}%</span>
          </MasteryRing>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">Module mastery</p>
            <p className="text-sm text-ink-2">
              {mod.lessons.filter((l) => overview.byLesson[l.id].stage === 'mastered').length} of{' '}
              {mod.lessons.length} lessons mastered ·{' '}
              {mod.lessons.reduce((a, l) => a + l.minutes, 0)} minutes of material
            </p>
            <ProgressBar value={pct} className="mt-2" height={6} tone={pct >= 88 ? 'success' : 'brand'} />
          </div>
          <Button to={`/lesson/${firstUnfinished.id}`} className="hidden shrink-0 sm:inline-flex">
            {pct === 0 ? 'Start' : 'Continue'}
            <Icon name="arrowRight" size={16} />
          </Button>
        </div>
      </Card>

      <ol className="space-y-3">
        {mod.lessons.map((lesson, i) => {
          const m = overview.byLesson[lesson.id]
          const meta = STAGE_META[m.stage]
          const qCount = (quickCheckIdsByLesson[lesson.id] ?? []).length
          return (
            <li key={lesson.id}>
              <Link to={`/lesson/${lesson.id}`} className="block">
                <Card interactive className="!p-0">
                  <div className="flex gap-4 p-4 sm:p-5">
                    <span
                      aria-hidden="true"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-sm font-bold"
                      style={{ borderColor: meta.ring, color: meta.color }}
                    >
                      {m.stage === 'mastered' ? <Icon name="check" size={15} strokeWidth={2.2} /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="text-md font-semibold leading-snug text-ink text-balance">
                          {lesson.title}
                        </h2>
                        <span className="shrink-0 font-mono text-xs tabular-nums text-ink-3">
                          {m.percent}%
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-2">
                        {lesson.summary}
                      </p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-3">
                        <Badge tone={m.stage === 'mastered' ? 'success' : 'neutral'}>
                          {meta.label}
                        </Badge>
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="clock" size={13} />
                          {lesson.minutes} min
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Icon name="check" size={13} />
                          {qCount} questions
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          )
        })}
      </ol>

      <nav className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
        {index > 0 && (
          <Link
            to={`/module/${modules[index - 1].id}`}
            className="flex-1 rounded-xl border border-line p-4 transition hover:bg-sunken"
          >
            <span className="flex items-center gap-1 text-2xs font-medium uppercase tracking-wide text-ink-3">
              <Icon name="arrowLeft" size={13} />
              Previous module
            </span>
            <span className="mt-0.5 block text-base font-medium text-ink">
              {modules[index - 1].title}
            </span>
          </Link>
        )}
        {nextMod && (
          <Link
            to={`/module/${nextMod.id}`}
            className="flex-1 rounded-xl border border-brand-300 bg-brand-50 p-4 text-right transition hover:bg-brand-100 dark:border-brand-700 dark:bg-brand-950/60"
          >
            <span className="flex items-center justify-end gap-1 text-2xs font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
              Next module
              <Icon name="arrowRight" size={13} />
            </span>
            <span className="mt-0.5 block text-base font-medium text-ink">{nextMod.title}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
