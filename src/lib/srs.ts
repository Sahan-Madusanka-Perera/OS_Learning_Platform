/* ============================================================
   Lightweight spaced repetition
   ------------------------------------------------------------
   A cut-down SM-2. Deliberately simple: five intervals, one
   ease-free ladder. The goal is "bring this back before you
   forget it", not a research-grade scheduler.
   ============================================================ */

/** Days until the next review, indexed by box number. */
export const REVIEW_LADDER = [0, 1, 2, 4, 8, 16] as const

export interface ReviewItem {
  /** questionId — reviews are per-question, not per-lesson. */
  id: string
  lessonId: string
  /** 0 = due now (just failed) … 5 = well established. */
  box: number
  /** epoch ms when this becomes due */
  dueAt: number
  lapses: number
  addedAt: number
}

const DAY = 86_400_000

export function scheduleNext(item: ReviewItem | undefined, correct: boolean, now = Date.now()): ReviewItem | null {
  if (!item) return null
  if (correct) {
    const box = Math.min(item.box + 1, REVIEW_LADDER.length - 1)
    // Graduated out of the queue.
    if (box >= REVIEW_LADDER.length - 1 && item.lapses === 0) return null
    return { ...item, box, dueAt: now + REVIEW_LADDER[box] * DAY }
  }
  return { ...item, box: 0, lapses: item.lapses + 1, dueAt: now }
}

export function createReviewItem(
  questionId: string,
  lessonId: string,
  now = Date.now(),
): ReviewItem {
  return { id: questionId, lessonId, box: 0, dueAt: now, lapses: 1, addedAt: now }
}

export function isDue(item: ReviewItem, now = Date.now()): boolean {
  return item.dueAt <= now
}

export function dueItems(items: ReviewItem[], now = Date.now()): ReviewItem[] {
  return items.filter((i) => isDue(i, now)).sort((a, b) => a.dueAt - b.dueAt || b.lapses - a.lapses)
}

/** Human phrasing for when an item comes back. */
export function dueLabel(item: ReviewItem, now = Date.now()): string {
  const diff = item.dueAt - now
  if (diff <= 0) return 'Due now'
  const days = Math.ceil(diff / DAY)
  if (days === 1) return 'Due tomorrow'
  return `Due in ${days} days`
}
