import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LessonProgress, AttemptRecord } from '@/lib/mastery'
import type { ReviewItem } from '@/lib/srs'
import { createReviewItem, scheduleNext } from '@/lib/srs'
import { todayKey } from '@/lib/streak'

export interface AssessmentResult {
  id: string
  /** 'final' | 'module:<id>' | 'timed' */
  scope: string
  takenAt: number
  score: number
  total: number
  /** Per-level breakdown, so the report can talk about *kinds* of thinking. */
  byLevel: Record<number, { correct: number; total: number }>
  weakLessonIds: string[]
}

export interface Note {
  id: string
  lessonId: string
  text: string
  createdAt: number
}

interface ProgressState {
  lessons: Record<string, LessonProgress>
  reviews: Record<string, ReviewItem>
  bookmarks: string[]
  notes: Note[]
  savedQuestions: string[]
  studyDays: string[]
  assessments: AssessmentResult[]
  lastLessonId: string | null
  /** Version guard for future content migrations. */
  contentVersion: number

  openLesson: (lessonId: string, activitiesTotal: number) => void
  markRead: (lessonId: string) => void
  completeActivity: (lessonId: string, activityId: string) => void
  recordAttempt: (lessonId: string, attempt: AttemptRecord) => void
  reviewAnswered: (questionId: string, correct: boolean) => void
  toggleBookmark: (lessonId: string) => void
  toggleSavedQuestion: (questionId: string) => void
  addNote: (lessonId: string, text: string) => void
  removeNote: (id: string) => void
  saveAssessment: (result: Omit<AssessmentResult, 'id' | 'takenAt'>) => void
  resetLesson: (lessonId: string) => void
  resetAll: () => void
}

const MAX_ATTEMPTS_PER_LESSON = 60

function ensureLesson(
  state: ProgressState,
  lessonId: string,
  activitiesTotal?: number,
): LessonProgress {
  const existing = state.lessons[lessonId]
  if (existing) {
    return activitiesTotal !== undefined && existing.activitiesTotal !== activitiesTotal
      ? { ...existing, activitiesTotal }
      : existing
  }
  return {
    lessonId,
    activitiesDone: [],
    activitiesTotal: activitiesTotal ?? 0,
    attempts: [],
    read: false,
    firstOpenedAt: Date.now(),
  }
}

function withStudyDay(days: string[]): string[] {
  const key = todayKey()
  return days.includes(key) ? days : [...days, key].slice(-400)
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      lessons: {},
      reviews: {},
      bookmarks: [],
      notes: [],
      savedQuestions: [],
      studyDays: [],
      assessments: [],
      lastLessonId: null,
      contentVersion: 1,

      openLesson: (lessonId, activitiesTotal) =>
        set((s) => {
          const lesson = ensureLesson(s, lessonId, activitiesTotal)
          return {
            lessons: {
              ...s.lessons,
              [lessonId]: { ...lesson, lastVisitedAt: Date.now() },
            },
            lastLessonId: lessonId,
            studyDays: withStudyDay(s.studyDays),
          }
        }),

      markRead: (lessonId) =>
        set((s) => {
          const lesson = ensureLesson(s, lessonId)
          if (lesson.read) return s
          return { lessons: { ...s.lessons, [lessonId]: { ...lesson, read: true } } }
        }),

      completeActivity: (lessonId, activityId) =>
        set((s) => {
          const lesson = ensureLesson(s, lessonId)
          if (lesson.activitiesDone.includes(activityId)) return s
          return {
            lessons: {
              ...s.lessons,
              [lessonId]: {
                ...lesson,
                activitiesDone: [...lesson.activitiesDone, activityId],
              },
            },
            studyDays: withStudyDay(s.studyDays),
          }
        }),

      recordAttempt: (lessonId, attempt) =>
        set((s) => {
          const lesson = ensureLesson(s, lessonId)
          const attempts = [...lesson.attempts, attempt].slice(-MAX_ATTEMPTS_PER_LESSON)

          // A wrong answer schedules the question for review; a right
          // answer moves an existing review item further down the ladder.
          const reviews = { ...s.reviews }
          const existing = reviews[attempt.questionId]
          if (!attempt.correct) {
            reviews[attempt.questionId] = existing
              ? { ...existing, box: 0, lapses: existing.lapses + 1, dueAt: Date.now() }
              : createReviewItem(attempt.questionId, lessonId)
          } else if (existing) {
            const next = scheduleNext(existing, true)
            if (next) reviews[attempt.questionId] = next
            else delete reviews[attempt.questionId]
          }

          return {
            lessons: { ...s.lessons, [lessonId]: { ...lesson, attempts } },
            reviews,
            studyDays: withStudyDay(s.studyDays),
          }
        }),

      reviewAnswered: (questionId, correct) =>
        set((s) => {
          const item = s.reviews[questionId]
          if (!item) return s
          const reviews = { ...s.reviews }
          const next = scheduleNext(item, correct)
          if (next) reviews[questionId] = next
          else delete reviews[questionId]
          return { reviews, studyDays: withStudyDay(s.studyDays) }
        }),

      toggleBookmark: (lessonId) =>
        set((s) => ({
          bookmarks: s.bookmarks.includes(lessonId)
            ? s.bookmarks.filter((b) => b !== lessonId)
            : [...s.bookmarks, lessonId],
        })),

      toggleSavedQuestion: (questionId) =>
        set((s) => ({
          savedQuestions: s.savedQuestions.includes(questionId)
            ? s.savedQuestions.filter((q) => q !== questionId)
            : [...s.savedQuestions, questionId],
        })),

      addNote: (lessonId, text) =>
        set((s) => ({
          notes: [
            { id: `n${Date.now()}${Math.random().toString(36).slice(2, 6)}`, lessonId, text, createdAt: Date.now() },
            ...s.notes,
          ],
        })),

      removeNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),

      saveAssessment: (result) =>
        set((s) => ({
          assessments: [
            { ...result, id: `a${Date.now()}`, takenAt: Date.now() },
            ...s.assessments,
          ].slice(0, 40),
          studyDays: withStudyDay(s.studyDays),
        })),

      resetLesson: (lessonId) =>
        set((s) => {
          const lessons = { ...s.lessons }
          delete lessons[lessonId]
          const reviews = Object.fromEntries(
            Object.entries(s.reviews).filter(([, v]) => v.lessonId !== lessonId),
          )
          return { lessons, reviews }
        }),

      resetAll: () =>
        set({
          lessons: {},
          reviews: {},
          bookmarks: [],
          notes: [],
          savedQuestions: [],
          studyDays: [],
          assessments: [],
          lastLessonId: null,
        }),
    }),
    {
      name: 'os-academy-progress',
      version: 1,
      // Guard against a corrupted or unavailable store (private mode,
      // cleared site data) — the app must still render.
      onRehydrateStorage: () => (_, error) => {
        if (error) console.warn('Progress could not be restored; starting fresh.')
      },
    },
  ),
)

/** Selector helper used across pages. */
export function useLessonProgress(lessonId: string) {
  return useProgress((s) => s.lessons[lessonId])
}

export type { ProgressState }
export { useProgress as progressStore }
export const getProgressState = () => useProgress.getState()
