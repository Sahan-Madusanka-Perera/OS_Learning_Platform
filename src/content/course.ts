import type { Lesson, Module, Question } from '@/types/content'
import { m1 } from './modules/m1-foundations'
import { m2 } from './modules/m2-os-nature'
import { m3 } from './modules/m3-files'
import { m4 } from './modules/m4-storage'
import { m5 } from './modules/m5-processes'
import { m6 } from './modules/m6-memory'
import { m7 } from './modules/m7-devices'
import { questionsM1M2 } from './questions/q-m1-m2'
import { questionsM3M4 } from './questions/q-m3-m4'
import { questionsM5 } from './questions/q-m5'
import { questionsM6M7 } from './questions/q-m6-m7'
import { questionsExam } from './questions/q-exam'

export const course = {
  id: 'al-ict-os',
  title: 'Operating Systems',
  subtitle: 'G.C.E. Advanced Level ICT · Competency 5',
  description:
    'Uses operating systems to manage the functionality of computers. From what an OS is, through files, processes and memory, to full exam readiness.',
  competency: 'Competency 5',
  competencyStatement:
    'Uses operating systems to manage the functionality of computers.',
  competencyLevels: [
    {
      ref: '5.1',
      title: 'Defines the term computer operating system (OS) and investigates its need in computer systems',
      periods: 4,
      moduleIds: ['m1', 'm2'],
    },
    {
      ref: '5.2',
      title: 'Explores how an operating system manages directories/folders and files in computers',
      periods: 6,
      moduleIds: ['m3', 'm4'],
    },
    {
      ref: '5.3',
      title: 'Explores how an operating system manages processes in computers',
      periods: 6,
      moduleIds: ['m5'],
    },
    {
      ref: '5.4',
      title: 'Explores how an operating system manages the resources',
      periods: 6,
      moduleIds: ['m6', 'm7'],
    },
  ],
} as const

export const modules: Module[] = [m1, m2, m3, m4, m5, m6, m7]

export const allQuestions: Question[] = [
  ...questionsM1M2,
  ...questionsM3M4,
  ...questionsM5,
  ...questionsM6M7,
  ...questionsExam,
]

/* ---------- Derived indexes (built once at module load) ---------- */

export const allLessons: Lesson[] = modules.flatMap((m) => m.lessons)

export const lessonById = new Map(allLessons.map((l) => [l.id, l]))
export const moduleById = new Map(modules.map((m) => [m.id, m]))
export const questionById = new Map(allQuestions.map((q) => [q.id, q]))

/** Questions grouped by the lesson they belong to. */
export const questionsByLesson = allQuestions.reduce<Record<string, Question[]>>((acc, q) => {
  ;(acc[q.lessonId] ??= []).push(q)
  return acc
}, {})

/** Only the questions embedded in a lesson's Quick Check blocks —
 *  these are what mastery for that lesson is measured against. */
export const quickCheckIdsByLesson = allLessons.reduce<Record<string, string[]>>((acc, l) => {
  acc[l.id] = l.blocks.flatMap((b) => (b.kind === 'quickCheck' ? b.questionIds : []))
  return acc
}, {})

/** Extra practice: everything tagged to a lesson that is not a Quick Check. */
export const practiceIdsByLesson = allLessons.reduce<Record<string, string[]>>((acc, l) => {
  const quick = new Set(quickCheckIdsByLesson[l.id])
  acc[l.id] = (questionsByLesson[l.id] ?? []).filter((q) => !quick.has(q.id)).map((q) => q.id)
  return acc
}, {})

/** Activity ids inside a lesson that the student can actively complete. */
export function activityIds(lesson: Lesson): string[] {
  return lesson.blocks
    .map((b, i) => (b.kind === 'recall' || b.kind === 'teachBack' ? `${lesson.id}-act-${i}` : null))
    .filter((x): x is string => x !== null)
}

export function lessonIndex(lessonId: string): number {
  return allLessons.findIndex((l) => l.id === lessonId)
}

export function nextLesson(lessonId: string): Lesson | undefined {
  const i = lessonIndex(lessonId)
  return i >= 0 ? allLessons[i + 1] : undefined
}

export function prevLesson(lessonId: string): Lesson | undefined {
  const i = lessonIndex(lessonId)
  return i > 0 ? allLessons[i - 1] : undefined
}

export const TOTAL_LESSONS = allLessons.length
export const TOTAL_QUESTIONS = allQuestions.length
export const TOTAL_MINUTES = allLessons.reduce((a, l) => a + l.minutes, 0)
