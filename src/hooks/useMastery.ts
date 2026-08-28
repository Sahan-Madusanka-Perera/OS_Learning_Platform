import { useMemo } from 'react'
import { useProgress } from '@/store/progress'
import { computeMastery, aggregateMastery, type MasteryResult } from '@/lib/mastery'
import {
  allLessons,
  lessonById,
  modules,
  quickCheckIdsByLesson,
} from '@/content/course'

/* One place that turns raw stored progress into everything the UI wants
   to say about how the student is doing. */

export function useLessonMastery(lessonId: string): MasteryResult {
  const progress = useProgress((s) => s.lessons[lessonId])
  return useMemo(
    () => computeMastery(progress, (quickCheckIdsByLesson[lessonId] ?? []).length),
    [progress, lessonId],
  )
}

export interface CourseOverview {
  overall: number
  byLesson: Record<string, MasteryResult>
  byModule: Record<string, number>
  mastered: string[]
  needsReview: string[]
  inProgress: string[]
  notStarted: string[]
  /** Where "Continue learning" should send the student. */
  continueLessonId: string
  lessonsStarted: number
}

export function useCourseOverview(): CourseOverview {
  const lessons = useProgress((s) => s.lessons)
  const lastLessonId = useProgress((s) => s.lastLessonId)

  return useMemo(() => {
    const byLesson: Record<string, MasteryResult> = {}
    for (const l of allLessons) {
      byLesson[l.id] = computeMastery(lessons[l.id], (quickCheckIdsByLesson[l.id] ?? []).length)
    }

    const byModule: Record<string, number> = {}
    for (const m of modules) {
      byModule[m.id] = aggregateMastery(
        m.lessons.map((l) => ({
          result: byLesson[l.id],
          weight: Math.max(1, (quickCheckIdsByLesson[l.id] ?? []).length),
        })),
      )
    }

    const overall = aggregateMastery(
      allLessons.map((l) => ({
        result: byLesson[l.id],
        weight: Math.max(1, (quickCheckIdsByLesson[l.id] ?? []).length),
      })),
    )

    const mastered: string[] = []
    const needsReview: string[] = []
    const inProgress: string[] = []
    const notStarted: string[] = []

    for (const l of allLessons) {
      const r = byLesson[l.id]
      if (r.stage === 'mastered') mastered.push(l.id)
      else if (r.stage === 'not-started') notStarted.push(l.id)
      else {
        inProgress.push(l.id)
        // Attempted questions but accuracy is poor — this is what to revisit.
        if (r.questionsAnswered >= 2 && r.accuracy < 0.7) needsReview.push(l.id)
      }
    }

    // Continue = the last lesson if unfinished, else the first not-yet-mastered.
    let continueLessonId = allLessons[0].id
    if (lastLessonId && lessonById.has(lastLessonId) && byLesson[lastLessonId].stage !== 'mastered') {
      continueLessonId = lastLessonId
    } else {
      const next = allLessons.find((l) => byLesson[l.id].stage !== 'mastered')
      continueLessonId = next?.id ?? allLessons[allLessons.length - 1].id
    }

    return {
      overall,
      byLesson,
      byModule,
      mastered,
      needsReview,
      inProgress,
      notStarted,
      continueLessonId,
      lessonsStarted: allLessons.length - notStarted.length,
    }
  }, [lessons, lastLessonId])
}
