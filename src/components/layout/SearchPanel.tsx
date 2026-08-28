import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { search, RESULT_LABELS, type SearchResult } from '@/lib/search'
import { cx } from '@/lib/utils'

const KIND_TONE: Record<string, string> = {
  lesson: 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300',
  concept: 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-300',
  glossary: 'bg-success-100 text-success-700 dark:bg-success-900 dark:text-success-300',
  question: 'bg-sunken text-ink-2',
  example: 'bg-warn-100 text-warn-800 dark:bg-warn-900 dark:text-warn-300',
}

export function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const reduce = useReducedMotion()

  const results = useMemo(() => (open ? search(query, 24) : []), [query, open])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      const t = window.setTimeout(() => inputRef.current?.focus(), 40)
      return () => window.clearTimeout(t)
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive((a) => Math.min(a + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive((a) => Math.max(a - 1, 0))
      }
      if (e.key === 'Enter' && results[active]) {
        e.preventDefault()
        navigate(results[active].href)
        onClose()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, results, active, navigate, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-[8vh] sm:pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.16 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the course"
            className="relative flex max-h-[75dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-lift)]"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <svg width="17" height="17" viewBox="0 0 16 16" fill="none" className="shrink-0 text-ink-3" aria-hidden="true">
                <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <label className="sr-only" htmlFor="course-search">
                Search lessons, concepts, definitions and questions
              </label>
              <input
                id="course-search"
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons, concepts, definitions, questions…"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-md text-ink placeholder:text-ink-3 focus:outline-none"
              />
              <kbd className="hidden rounded border border-line bg-sunken px-1.5 py-0.5 font-mono text-2xs text-ink-3 sm:block">
                esc
              </kbd>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {query.trim().length < 2 ? (
                <div className="px-3 py-8 text-center">
                  <p className="text-base text-ink-3">
                    Type at least two characters to search.
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {['paging', 'deadlock', 'FAT', 'Round Robin', 'fragmentation', 'PCB'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQuery(s)}
                        className="rounded-full border border-line px-2.5 py-1 text-xs text-ink-2 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="px-3 py-10 text-center">
                  <p className="text-md font-medium text-ink">No results for “{query}”</p>
                  <p className="mt-1 text-sm text-ink-3">
                    Try a single keyword, or check the spelling of the technical term.
                  </p>
                </div>
              ) : (
                <ul role="listbox" aria-label="Search results">
                  {results.map((r, i) => (
                    <ResultRow
                      key={`${r.href}-${r.title}-${i}`}
                      result={r}
                      active={i === active}
                      onHover={() => setActive(i)}
                      onPick={() => {
                        navigate(r.href)
                        onClose()
                      }}
                    />
                  ))}
                </ul>
              )}
            </div>

            {results.length > 0 && (
              <div className="flex items-center gap-3 border-t border-line px-4 py-2 text-2xs text-ink-3">
                <span>↑↓ to navigate</span>
                <span>↵ to open</span>
                <span className="ml-auto">{results.length} results</span>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function ResultRow({
  result,
  active,
  onHover,
  onPick,
}: {
  result: SearchResult
  active: boolean
  onHover: () => void
  onPick: () => void
}) {
  return (
    <li>
      <button
        type="button"
        role="option"
        aria-selected={active}
        onMouseEnter={onHover}
        onClick={onPick}
        className={cx(
          'w-full rounded-lg px-3 py-2.5 text-left transition-colors',
          active ? 'bg-brand-50 dark:bg-brand-950/70' : 'hover:bg-sunken',
        )}
      >
        <span className="flex items-baseline gap-2">
          <span
            className={cx(
              'shrink-0 rounded px-1.5 py-0.5 text-2xs font-semibold uppercase tracking-wide',
              KIND_TONE[result.kind],
            )}
          >
            {RESULT_LABELS[result.kind]}
          </span>
          <span className="min-w-0 flex-1 truncate text-base font-medium text-ink">
            {result.title}
          </span>
        </span>
        <span className="mt-1 block text-xs leading-snug text-ink-2 line-clamp-2">
          {result.snippet}
        </span>
        <span className="mt-0.5 block text-2xs text-ink-3">{result.context}</span>
      </button>
    </li>
  )
}
