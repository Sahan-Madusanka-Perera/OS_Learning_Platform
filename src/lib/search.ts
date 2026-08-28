import { allQuestions, modules } from '@/content/course'
import { glossary } from '@/content/glossary'
import { plain } from '@/lib/inline'

/* Course-wide search. The index is built once, lazily, from content that
   already lives in memory — no library, no network, no build step. */

export type ResultKind = 'lesson' | 'concept' | 'glossary' | 'question' | 'example'

export interface SearchResult {
  kind: ResultKind
  title: string
  /** Where this appears, e.g. "Module 5 · Process management". */
  context: string
  /** Matching text with the query region intact. */
  snippet: string
  href: string
  score: number
}

interface IndexEntry {
  kind: ResultKind
  title: string
  context: string
  body: string
  href: string
  /** Base importance — lesson titles outrank buried prose. */
  weight: number
}

let INDEX: IndexEntry[] | null = null

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = []

  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      const context = `${mod.title}`
      entries.push({
        kind: 'lesson',
        title: lesson.title,
        context,
        body: [lesson.summary, lesson.whyItMatters, ...lesson.objectives, ...lesson.takeaways].join(' '),
        href: `/lesson/${lesson.id}`,
        weight: 3,
      })

      // Individual teachable moments inside the lesson.
      lesson.blocks.forEach((b) => {
        if (b.kind === 'definition') {
          entries.push({
            kind: 'concept',
            title: b.term,
            context: `${lesson.title}`,
            body: `${b.simple} ${b.technical} ${b.example ?? ''}`,
            href: `/lesson/${lesson.id}`,
            weight: 2.5,
          })
        }
        if (b.kind === 'worked') {
          entries.push({
            kind: 'example',
            title: b.title,
            context: `${lesson.title}`,
            body: `${b.problem} ${b.steps.map((s) => `${s.title} ${s.detail}`).join(' ')} ${b.answer}`,
            href: `/lesson/${lesson.id}`,
            weight: 2,
          })
        }
        if (b.kind === 'misconception') {
          entries.push({
            kind: 'concept',
            title: `Common mistake: ${plain(b.wrong).slice(0, 60)}`,
            context: `${lesson.title}`,
            body: `${b.wrong} ${b.right} ${b.why ?? ''}`,
            href: `/lesson/${lesson.id}`,
            weight: 1.8,
          })
        }
        if (b.kind === 'analogy') {
          entries.push({
            kind: 'example',
            title: `Analogy: ${b.title}`,
            context: `${lesson.title}`,
            body: `${b.everyday} ${b.mapsTo}`,
            href: `/lesson/${lesson.id}`,
            weight: 1.6,
          })
        }
        if (b.kind === 'keyIdea' || b.kind === 'prose' || b.kind === 'list' || b.kind === 'callout') {
          const body =
            b.kind === 'prose'
              ? b.paragraphs.join(' ')
              : b.kind === 'list'
                ? `${b.title ?? ''} ${b.items.join(' ')}`
                : b.kind === 'callout'
                  ? `${b.title ?? ''} ${b.text}`
                  : b.text
          entries.push({
            kind: 'lesson',
            title: lesson.title,
            context: `${mod.title}`,
            body,
            href: `/lesson/${lesson.id}`,
            weight: 1,
          })
        }
      })
    }
  }

  for (const g of glossary) {
    entries.push({
      kind: 'glossary',
      title: g.term,
      context: 'Glossary',
      body: `${g.simple} ${g.technical} ${g.example ?? ''}`,
      href: `/glossary?term=${g.id}`,
      weight: 2.8,
    })
  }

  for (const q of allQuestions) {
    entries.push({
      kind: 'question',
      title: plain(q.prompt).slice(0, 90),
      context: `Practice · level ${q.level}`,
      body: `${q.prompt} ${q.explanation} ${(q.tags ?? []).join(' ')}`,
      href: `/practice?q=${q.id}`,
      weight: 1.4,
    })
  }

  return entries.map((e) => ({ ...e, body: plain(e.body) }))
}

export function search(query: string, limit = 30): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  INDEX ??= buildIndex()

  const terms = q.split(/\s+/).filter(Boolean)
  const results: SearchResult[] = []

  for (const e of INDEX) {
    const title = e.title.toLowerCase()
    const body = e.body.toLowerCase()

    let score = 0
    let allPresent = true
    for (const t of terms) {
      const inTitle = title.includes(t)
      const inBody = body.includes(t)
      if (!inTitle && !inBody) {
        allPresent = false
        break
      }
      // Title hits matter far more than body hits.
      if (inTitle) score += title.startsWith(t) ? 6 : 4
      if (inBody) score += 1
    }
    if (!allPresent) continue

    score *= e.weight

    results.push({
      kind: e.kind,
      title: e.title,
      context: e.context,
      snippet: makeSnippet(e.body, terms[0]),
      href: e.href,
      score,
    })
  }

  // Collapse duplicates pointing at the same place, keeping the best.
  const best = new Map<string, SearchResult>()
  for (const r of results.sort((a, b) => b.score - a.score)) {
    const key = `${r.kind}:${r.href}:${r.title}`
    if (!best.has(key)) best.set(key, r)
  }

  return [...best.values()].slice(0, limit)
}

function makeSnippet(body: string, term: string): string {
  const i = body.toLowerCase().indexOf(term)
  if (i < 0) return body.slice(0, 140) + (body.length > 140 ? '…' : '')
  const start = Math.max(0, i - 60)
  const end = Math.min(body.length, i + 100)
  return (start > 0 ? '…' : '') + body.slice(start, end).trim() + (end < body.length ? '…' : '')
}

export const RESULT_LABELS: Record<ResultKind, string> = {
  lesson: 'Lesson',
  concept: 'Concept',
  glossary: 'Glossary',
  question: 'Question',
  example: 'Example',
}
