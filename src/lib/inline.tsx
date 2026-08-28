import { Fragment, type ReactNode } from 'react'
import { GlossaryTerm } from '@/components/learning/GlossaryTerm'

/* Tiny inline markup used throughout the content files:
     **bold**             strong emphasis — key terms, exam wording
     *italic*             light emphasis — "does not *contain* files"
     `code`               identifiers, file names, numbers
     [[term-id|label]]    a clickable glossary term
   Deliberately not a full Markdown parser — content authors get exactly
   these four, which keeps lessons consistent.

   Order matters in the pattern: `**` is tried before `*`, so bold is never
   mis-read as two italics. Emphasis also nests — `**[[paging|Paging]]**` is
   both bold and a glossary link — which is why the parser recurses rather
   than treating emphasised contents as literal text. */

const TOKEN = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[\[[^\]]+\]\])/g

const MAX_DEPTH = 3

export function inline(text: string, depth = 0): ReactNode {
  const parts = text.split(TOKEN).filter((p) => p !== '')

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2)
      return (
        <strong key={i}>{depth < MAX_DEPTH ? inline(inner, depth + 1) : inner}</strong>
      )
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1)
      return <em key={i}>{depth < MAX_DEPTH ? inline(inner, depth + 1) : inner}</em>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      // Code is literal by definition — never re-parse its contents.
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    if (part.startsWith('[[') && part.endsWith(']]')) {
      const body = part.slice(2, -2)
      const [id, label] = body.includes('|') ? body.split('|') : [body, body]
      return <GlossaryTerm key={i} termId={id.trim()} label={label.trim()} />
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

/** Strip markup for search indexes and plain-text contexts. */
export function plain(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
}
