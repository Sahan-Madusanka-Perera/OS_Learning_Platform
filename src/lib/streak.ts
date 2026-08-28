/** Day-granularity study streak, stored as ISO date strings (local time). */

export function todayKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function keyToDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const DAY = 86_400_000

/** Counts back from today (or yesterday, so an unfinished today doesn't
 *  break a streak the student is about to continue). */
export function currentStreak(days: string[], now = new Date()): number {
  if (days.length === 0) return 0
  const set = new Set(days)
  const today = todayKey(now)
  const yesterday = todayKey(new Date(now.getTime() - DAY))
  let cursor = set.has(today) ? today : set.has(yesterday) ? yesterday : null
  if (!cursor) return 0

  let count = 0
  while (set.has(cursor)) {
    count += 1
    cursor = todayKey(new Date(keyToDate(cursor).getTime() - DAY))
  }
  return count
}

/** Last 7 day keys, oldest first — for the dashboard's activity strip. */
export function lastNDays(n: number, now = new Date()): string[] {
  return Array.from({ length: n }, (_, i) =>
    todayKey(new Date(now.getTime() - (n - 1 - i) * DAY)),
  )
}
