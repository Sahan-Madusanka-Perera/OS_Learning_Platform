import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import { glossary, glossaryById } from '@/content/glossary'
import { lessonById } from '@/content/course'
import { ScrollStrip } from '@/components/ui/ScrollStrip'
import { cx } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { inline } from '@/lib/inline'

export function GlossaryPage() {
  useDocumentTitle('Glossary')
  const [params, setParams] = useSearchParams()
  const focused = params.get('term')
  const [query, setQuery] = useState('')
  const [letter, setLetter] = useState<string | null>(null)
  const focusRef = useRef<HTMLLIElement>(null)
  const reduce = useReducedMotion()

  const sorted = useMemo(() => [...glossary].sort((a, b) => a.term.localeCompare(b.term)), [])

  const letters = useMemo(
    () => [...new Set(sorted.map((g) => g.term[0].toUpperCase()))].sort(),
    [sorted],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sorted.filter((g) => {
      if (letter && g.term[0].toUpperCase() !== letter) return false
      if (!q) return true
      return (
        g.term.toLowerCase().includes(q) ||
        g.simple.toLowerCase().includes(q) ||
        g.technical.toLowerCase().includes(q)
      )
    })
  }, [sorted, query, letter])

  // Scroll a directly-linked term into view.
  useEffect(() => {
    if (focused && focusRef.current) {
      focusRef.current.scrollIntoView({ block: 'center', behavior: reduce ? 'instant' : 'smooth' })
    }
  }, [focused, reduce])

  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-display text-ink sm:text-4xl">
          Glossary
        </h1>
        <p className="mt-2 max-w-2xl text-md leading-relaxed text-ink-2">
          Every technical term in the course, with a plain-English meaning first and the precise
          definition second. {glossary.length} terms.
        </p>
      </header>

      <div className="sticky top-14 z-10 -mx-4 mb-5 bg-page/90 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
        <label className="sr-only" htmlFor="glossary-search">
          Filter glossary terms
        </label>
        <input
          id="glossary-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter terms…"
          className="w-full rounded-xl border border-line bg-card px-4 py-2.5 text-md text-ink placeholder:text-ink-3 focus:border-brand-400 focus:outline-none"
        />
        <ScrollStrip className="mt-2 flex gap-1 pb-1" aria-label="Filter by first letter">
          <button
            type="button"
            onClick={() => setLetter(null)}
            aria-pressed={letter === null}
            className={cx(
              'shrink-0 rounded-md px-2 py-1 text-xs font-semibold transition-colors',
              letter === null ? 'bg-brand-600 text-white' : 'text-ink-3 hover:bg-sunken hover:text-ink',
            )}
          >
            All
          </button>
          {letters.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLetter(letter === l ? null : l)}
              aria-pressed={letter === l}
              className={cx(
                'shrink-0 rounded-md px-2 py-1 text-xs font-semibold transition-colors',
                letter === l ? 'bg-brand-600 text-white' : 'text-ink-3 hover:bg-sunken hover:text-ink',
              )}
            >
              {l}
            </button>
          ))}
        </ScrollStrip>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-line bg-card px-5 py-10 text-center">
          <p className="text-md font-medium text-ink">No terms match “{query}”</p>
          <p className="mt-1 text-sm text-ink-3">
            Try a shorter word, or clear the letter filter.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((g) => {
            const isFocused = g.id === focused
            return (
              <li
                key={g.id}
                ref={isFocused ? focusRef : undefined}
                id={`term-${g.id}`}
                className={cx(
                  'rounded-xl border p-5 transition-colors',
                  isFocused
                    ? 'border-brand-400 bg-brand-50 dark:bg-brand-950/50'
                    : 'border-line bg-card',
                )}
              >
                <h2 className="text-lg font-semibold tracking-tight text-ink">{g.term}</h2>

                <p className="mt-2 text-base leading-relaxed text-ink">
                  <span className="text-2xs font-semibold uppercase tracking-[0.08em] text-brand-600 dark:text-brand-400">
                    In plain words:{' '}
                  </span>
                  {inline(g.simple)}
                </p>

                <p className="mt-2 border-t border-line pt-2 text-base leading-relaxed text-ink-2">
                  <span className="text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                    Precisely:{' '}
                  </span>
                  {inline(g.technical)}
                </p>

                {g.example && (
                  <p className="mt-2 rounded-lg bg-sunken px-3.5 py-2.5 text-sm text-ink-2">
                    <span className="font-semibold text-ink">Example: </span>
                    {inline(g.example)}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3">
                  {g.appearsIn.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
                        Taught in
                      </span>
                      {g.appearsIn.map((lid) => {
                        const l = lessonById.get(lid)
                        return l ? (
                          <Link
                            key={lid}
                            to={`/lesson/${lid}`}
                            className="rounded-md border border-line px-2 py-0.5 text-xs text-ink-2 transition hover:border-brand-300 hover:text-brand-700 dark:hover:text-brand-300"
                          >
                            {l.title}
                          </Link>
                        ) : null
                      })}
                    </div>
                  )}
                  {g.related && g.related.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
                        Related
                      </span>
                      {g.related.map((rid) => {
                        const r = glossaryById.get(rid)
                        return r ? (
                          <button
                            key={rid}
                            type="button"
                            onClick={() => setParams({ term: rid })}
                            className="text-xs text-brand-600 hover:underline dark:text-brand-400"
                          >
                            {r.term}
                          </button>
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}

      <p className="mt-6 text-center text-sm text-ink-3">
        Showing {filtered.length} of {glossary.length} terms
        {letter && <> · filtered to {letter}</>}
      </p>

      {focused && !glossaryById.has(focused) && (
        <Badge tone="warn" className="mt-4">
          That term is no longer in the glossary.
        </Badge>
      )}
    </div>
  )
}
