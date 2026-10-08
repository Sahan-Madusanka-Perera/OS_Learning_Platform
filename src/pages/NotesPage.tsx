import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { lessonById, questionById } from '@/content/course'
import { useProgress } from '@/store/progress'
import { Button } from '@/components/ui/Button'
import { Card, SectionHeading } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { formatDate, cx } from '@/lib/utils'
import { Icon, type IconName } from '@/components/ui/Icon'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

type Tab = 'notes' | 'bookmarks' | 'saved'

export function NotesPage() {
  useDocumentTitle('Notes')
  const notes = useProgress((s) => s.notes)
  const bookmarks = useProgress((s) => s.bookmarks)
  const savedQuestions = useProgress((s) => s.savedQuestions)
  const removeNote = useProgress((s) => s.removeNote)
  const toggleBookmark = useProgress((s) => s.toggleBookmark)
  const toggleSaved = useProgress((s) => s.toggleSavedQuestion)
  const resetAll = useProgress((s) => s.resetAll)
  const [tab, setTab] = useState<Tab>('notes')
  const [confirmReset, setConfirmReset] = useState(false)

  const notesByLesson = useMemo(() => {
    const map = new Map<string, typeof notes>()
    for (const n of notes) {
      const list = map.get(n.lessonId) ?? []
      list.push(n)
      map.set(n.lessonId, list)
    }
    return map
  }, [notes])

  const TABS: { id: Tab; label: string; count: number }[] = [
    { id: 'notes', label: 'My notes', count: notes.length },
    { id: 'bookmarks', label: 'Bookmarked lessons', count: bookmarks.length },
    { id: 'saved', label: 'Saved questions', count: savedQuestions.length },
  ]

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-display text-ink sm:text-4xl">
          Your workspace
        </h1>
        <p className="mt-2 max-w-2xl text-md leading-relaxed text-ink-2">
          Everything you have saved while working through the course. All of it is stored on this
          device only. Nothing is sent anywhere.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap gap-1.5 border-b border-line" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cx(
              '-mb-px border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
              tab === t.id
                ? 'border-brand-500 text-ink'
                : 'border-transparent text-ink-3 hover:text-ink',
            )}
          >
            {t.label}
            <span className="ml-1.5 rounded-full bg-sunken px-1.5 py-0.5 text-2xs tabular-nums">
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {tab === 'notes' &&
        (notes.length === 0 ? (
          <Empty
            icon="notes"
            title="No notes yet"
            body="At the bottom of every lesson there is a box where you can jot down anything you want to remember, or a question to ask your teacher. They all collect here."
          />
        ) : (
          <div className="space-y-6">
            {[...notesByLesson.entries()].map(([lessonId, list]) => {
              const lesson = lessonById.get(lessonId)
              return (
                <section key={lessonId}>
                  <SectionHeading
                    title={lesson?.title ?? 'Unknown lesson'}
                    action={
                      lesson && (
                        <Link
                          to={`/lesson/${lessonId}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:underline dark:text-brand-400"
                        >
                          Open lesson
                          <Icon name="arrowRight" size={14} />
                        </Link>
                      )
                    }
                  />
                  <ul className="space-y-2">
                    {list.map((n) => (
                      <li key={n.id}>
                        <Card className="!p-4">
                          <div className="flex items-start gap-3">
                            <p className="min-w-0 flex-1 whitespace-pre-wrap text-base leading-relaxed text-ink-2">
                              {n.text}
                            </p>
                            <button
                              type="button"
                              onClick={() => removeNote(n.id)}
                              aria-label="Delete note"
                              className="shrink-0 rounded p-1 text-ink-3 transition hover:bg-sunken hover:text-danger-600"
                            >
                              <Icon name="trash" size={16} />
                            </button>
                          </div>
                          <p className="mt-2 text-xs text-ink-3">{formatDate(n.createdAt)}</p>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        ))}

      {tab === 'bookmarks' &&
        (bookmarks.length === 0 ? (
          <Empty
            icon="bookmark"
            title="No bookmarks yet"
            body="Tap the bookmark icon at the top of any lesson to keep it here for quick access."
          />
        ) : (
          <ul className="space-y-2">
            {bookmarks.map((id) => {
              const l = lessonById.get(id)
              if (!l) return null
              return (
                <li key={id}>
                  <Card className="!p-4">
                    <div className="flex items-start gap-3">
                      <Link to={`/lesson/${id}`} className="min-w-0 flex-1">
                        <p className="text-md font-medium text-ink">{l.title}</p>
                        <p className="mt-0.5 text-sm text-ink-2">{l.summary}</p>
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleBookmark(id)}
                        aria-label="Remove bookmark"
                        className="shrink-0 rounded p-1 text-accent-700 dark:text-accent-400 transition hover:bg-sunken dark:text-accent-400"
                      >
                        <Icon name="bookmark" size={16} fill="currentColor" />
                      </button>
                    </div>
                  </Card>
                </li>
              )
            })}
          </ul>
        ))}

      {tab === 'saved' &&
        (savedQuestions.length === 0 ? (
          <Empty
            icon="exam"
            title="No saved questions"
            body="Save any question with the flag icon while answering it, then practise only those from the Practice page."
          />
        ) : (
          <>
            <Button to="/practice" className="mb-4">
              Practise these {savedQuestions.length} questions
              <Icon name="arrowRight" size={16} />
            </Button>
            <ul className="space-y-2">
              {savedQuestions.map((id) => {
                const q = questionById.get(id)
                const l = q ? lessonById.get(q.lessonId) : undefined
                if (!q) return null
                return (
                  <li key={id}>
                    <Card className="!p-4">
                      <div className="flex items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-base leading-relaxed text-ink">{q.prompt}</p>
                          <p className="mt-1 text-xs text-ink-3">
                            Level {q.level}
                            {l && ` · ${l.title}`}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleSaved(id)}
                          aria-label="Unsave question"
                          className="shrink-0 rounded p-1 text-accent-700 dark:text-accent-400 transition hover:bg-sunken dark:text-accent-400"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                            <path
                              d="M4 2h8a1 1 0 011 1v11l-5-3-5 3V3a1 1 0 011-1z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </Card>
                  </li>
                )
              })}
            </ul>
          </>
        ))}

      {/* Data controls */}
      <section className="mt-10 rounded-xl border border-line bg-sunken/50 p-5">
        <h2 className="font-semibold text-ink">Your data</h2>
        <p className="mt-1 text-base leading-relaxed text-ink-2">
          Progress, notes, bookmarks and quiz results are saved in this browser only. Clearing your
          browser data, or opening the course in a different browser, will start you from scratch.
        </p>
        <Button variant="ghost" size="sm" className="mt-3" onClick={() => setConfirmReset(true)}>
          Reset all progress
        </Button>
      </section>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset all progress?">
        <p className="text-md leading-relaxed text-ink-2">
          This permanently deletes your mastery, quiz results, review queue, notes and bookmarks on
          this device. It cannot be undone.
        </p>
        <div className="mt-5 flex gap-2">
          <Button variant="secondary" onClick={() => setConfirmReset(false)}>
            Keep my progress
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              resetAll()
              setConfirmReset(false)
            }}
          >
            Yes, reset everything
          </Button>
        </div>
      </Modal>
    </div>
  )
}

function Empty({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-card px-6 py-14 text-center">
      <Icon name={icon} size={34} className="mx-auto mb-4 text-ink-3" />
      <p className="text-lg font-semibold text-ink">{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-base leading-relaxed text-ink-2">{body}</p>
    </div>
  )
}
