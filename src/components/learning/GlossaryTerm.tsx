import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { glossaryById } from '@/content/glossary'

/* A technical term rendered inline in a lesson. Clicking it opens a compact
   card with the plain-English meaning first, then the precise definition —
   never forcing the student to leave the lesson.

   The card is portalled to <body> and positioned with `fixed`, because these
   terms appear inside scrolling tables and `overflow-hidden` panels. An
   absolutely-positioned popover would be clipped by those ancestors — which is
   exactly what happened before this was portalled. */

const CARD_WIDTH = 320
const GAP = 8
const EDGE = 12

interface Pos {
  left: number
  top: number
  placement: 'below' | 'above'
}

export function GlossaryTerm({ termId, label }: { termId: string; label: string }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<Pos | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardId = useId()
  const entry = glossaryById.get(termId)

  const place = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    const r = trigger.getBoundingClientRect()
    const vw = document.documentElement.clientWidth
    const vh = document.documentElement.clientHeight
    const width = Math.min(CARD_WIDTH, vw - EDGE * 2)
    const height = cardRef.current?.offsetHeight ?? 220

    // Prefer below; flip above when the card would run off the bottom.
    const roomBelow = vh - r.bottom
    const placement: Pos['placement'] =
      roomBelow < height + GAP && r.top > height + GAP ? 'above' : 'below'

    const left = Math.min(
      Math.max(EDGE, r.left + r.width / 2 - width / 2),
      vw - width - EDGE,
    )
    const top = placement === 'below' ? r.bottom + GAP : r.top - height - GAP

    setPos({ left, top, placement })
  }, [])

  // Measure before paint so the card never appears in the wrong place first.
  useLayoutEffect(() => {
    if (open) place()
  }, [open, place])

  useEffect(() => {
    if (!open) return
    let frame = 0
    const reposition = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(place)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    // `true` captures scrolls on every ancestor, not just the window.
    window.addEventListener('scroll', reposition, true)
    window.addEventListener('resize', reposition)
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', reposition, true)
      window.removeEventListener('resize', reposition)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, place])

  // Unknown id: degrade to plain text rather than showing a broken control.
  if (!entry) return <>{label}</>

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={open ? cardId : undefined}
        className="cursor-help rounded-[3px] font-medium text-brand-700 underline decoration-brand-300 decoration-dotted decoration-2 underline-offset-[3px] transition-colors hover:decoration-brand-500 dark:text-brand-300 dark:decoration-brand-600"
      >
        {label}
      </button>

      {createPortal(
        <>
          {open && pos && (
            <>
              <div
                className="fixed inset-0 z-[60] cursor-default"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div
                ref={cardRef}
                id={cardId}
                role="dialog"
                aria-label={`Definition of ${entry.term}`}
                style={
                  {
                    left: pos.left,
                    top: pos.top,
                    width: Math.min(CARD_WIDTH, window.innerWidth - EDGE * 2),
                    '--popover-from': pos.placement === 'below' ? '-4px' : '4px',
                  } as React.CSSProperties
                }
                className="popover-in fixed z-[61] rounded-xl border border-line bg-card p-3.5 text-left shadow-[var(--shadow-lift)]"
              >
                <p className="mb-1.5 text-sm font-semibold text-ink">{entry.term}</p>
                <p className="mb-2 text-sm leading-relaxed text-ink-2">{entry.simple}</p>
                <p className="mb-2 border-t border-line pt-2 text-xs leading-relaxed text-ink-3">
                  <span className="font-semibold uppercase tracking-wide">Precisely: </span>
                  {entry.technical}
                </p>
                <Link
                  to={`/glossary?term=${entry.id}`}
                  className="text-xs font-medium text-brand-600 hover:underline dark:text-brand-400"
                  onClick={() => setOpen(false)}
                >
                  Open in glossary →
                </Link>
              </div>
            </>
          )}
        </>,
        document.body,
      )}
    </>
  )
}
