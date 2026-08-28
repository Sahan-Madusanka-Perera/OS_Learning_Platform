/* ============================================================
   Mastery model
   ------------------------------------------------------------
   "Completion" is not "visited the page". A lesson's mastery is
   earned from two things the student actually did:

     1. Engagement  — worked through the lesson's activities.
     2. Evidence    — answered its questions correctly, across
                      increasing difficulty levels.

   Evidence dominates (75%), because answering is the only real
   signal of understanding. Recent answers count more than old
   ones, so a student who improves is not held back by a bad
   first attempt.
   ============================================================ */

export type MasteryStage =
  | 'not-started'
  | 'learning'
  | 'practicing'
  | 'familiar'
  | 'proficient'
  | 'mastered'

export const MASTERY_STAGES: MasteryStage[] = [
  'not-started',
  'learning',
  'practicing',
  'familiar',
  'proficient',
  'mastered',
]

export const STAGE_META: Record<
  MasteryStage,
  { label: string; blurb: string; color: string; ring: string }
> = {
  'not-started': {
    label: 'Not started',
    blurb: "You haven't opened this yet.",
    color: 'var(--text-muted)',
    ring: 'var(--border-strong)',
  },
  learning: {
    label: 'Learning',
    blurb: "You've met the ideas. Keep going.",
    color: 'var(--color-brand-500)',
    ring: 'var(--color-brand-400)',
  },
  practicing: {
    label: 'Practicing',
    blurb: 'Some answers landing. Practice builds this up.',
    color: 'var(--color-brand-600)',
    ring: 'var(--color-brand-500)',
  },
  familiar: {
    label: 'Familiar',
    blurb: 'You recognise and understand most of it.',
    color: 'var(--color-accent-600)',
    ring: 'var(--color-accent-500)',
  },
  proficient: {
    label: 'Proficient',
    blurb: 'You can apply this, not just recall it.',
    color: 'var(--color-success-600)',
    ring: 'var(--color-success-500)',
  },
  mastered: {
    label: 'Mastered',
    blurb: 'Exam-ready. Revisit occasionally to keep it.',
    color: 'var(--color-success-700)',
    ring: 'var(--color-success-600)',
  },
}

export interface AttemptRecord {
  questionId: string
  correct: boolean
  /** epoch ms */
  at: number
  level: number
}

export interface LessonProgress {
  lessonId: string
  /** Blocks the student actively completed (recall, teach-back, viz…). */
  activitiesDone: string[]
  activitiesTotal: number
  /** Newest last. Capped by the store to keep localStorage small. */
  attempts: AttemptRecord[]
  /** Reached the end of the lesson body. */
  read: boolean
  firstOpenedAt?: number
  lastVisitedAt?: number
}

const WEIGHT_EVIDENCE = 0.75
const WEIGHT_ENGAGEMENT = 0.25

/** Recency-weighted accuracy: the newest attempt at a question counts
 *  fully, older attempts at the same question decay. This lets a
 *  student recover from an early mistake by getting it right later. */
function evidenceScore(attempts: AttemptRecord[]): { score: number; answered: number } {
  if (attempts.length === 0) return { score: 0, answered: 0 }

  const byQuestion = new Map<string, AttemptRecord[]>()
  for (const a of attempts) {
    const list = byQuestion.get(a.questionId) ?? []
    list.push(a)
    byQuestion.set(a.questionId, list)
  }

  let total = 0
  let weightSum = 0
  for (const list of byQuestion.values()) {
    const ordered = [...list].sort((a, b) => a.at - b.at)
    // Harder questions are worth more — level 5 is worth 1.5x level 1.
    const level = ordered[ordered.length - 1].level
    const levelWeight = 1 + (level - 1) * 0.125

    let qScore = 0
    let qWeight = 0
    ordered.forEach((a, i) => {
      // Most recent attempt weight 1, each step back halves it.
      const recency = 1 / 2 ** (ordered.length - 1 - i)
      qScore += (a.correct ? 1 : 0) * recency
      qWeight += recency
    })
    total += (qScore / qWeight) * levelWeight
    weightSum += levelWeight
  }

  return { score: weightSum === 0 ? 0 : total / weightSum, answered: byQuestion.size }
}

export interface MasteryResult {
  /** 0–100 */
  percent: number
  stage: MasteryStage
  accuracy: number
  questionsAnswered: number
  activitiesDone: number
  activitiesTotal: number
  /** What to do next to move up a stage. */
  nextStep: string
}

export function computeMastery(
  progress: LessonProgress | undefined,
  questionCount: number,
): MasteryResult {
  if (!progress) {
    return {
      percent: 0,
      stage: 'not-started',
      accuracy: 0,
      questionsAnswered: 0,
      activitiesDone: 0,
      activitiesTotal: 0,
      nextStep: 'Start the lesson.',
    }
  }

  const { score, answered } = evidenceScore(progress.attempts)

  // Coverage stops one lucky correct answer from implying mastery.
  const coverage = questionCount === 0 ? 1 : Math.min(1, answered / questionCount)
  const evidence = score * coverage

  const engagementParts = [
    progress.read ? 1 : 0,
    progress.activitiesTotal === 0
      ? progress.read
        ? 1
        : 0
      : Math.min(1, progress.activitiesDone.length / progress.activitiesTotal),
  ]
  const engagement = engagementParts.reduce((a, b) => a + b, 0) / engagementParts.length

  const percent = Math.round((evidence * WEIGHT_EVIDENCE + engagement * WEIGHT_ENGAGEMENT) * 100)

  // A progress record only exists once the student has opened the lesson,
  // so they have started it even if they have not yet done anything in it.
  const stage = stageFor(percent, answered, score, true)

  return {
    percent,
    stage,
    accuracy: answered === 0 ? 0 : score,
    questionsAnswered: answered,
    activitiesDone: progress.activitiesDone.length,
    activitiesTotal: progress.activitiesTotal,
    nextStep: nextStepFor(stage, progress, questionCount, answered),
  }
}

function stageFor(
  percent: number,
  answered: number,
  accuracy: number,
  started: boolean,
): MasteryStage {
  if (!started && percent <= 0 && answered === 0) return 'not-started'
  // Mastery needs both a high score and real evidence — never score alone.
  if (percent >= 88 && answered >= 4 && accuracy >= 0.85) return 'mastered'
  if (percent >= 72 && answered >= 3) return 'proficient'
  if (percent >= 55) return 'familiar'
  if (percent >= 32) return 'practicing'
  return 'learning'
}

function nextStepFor(
  stage: MasteryStage,
  progress: LessonProgress,
  questionCount: number,
  answered: number,
): string {
  if (stage === 'mastered') return 'Keep it fresh — revisit in a few days.'
  if (!progress.read) return 'Read through the lesson.'
  if (progress.activitiesTotal > progress.activitiesDone.length)
    return 'Finish the lesson activities.'
  if (answered < questionCount) return `Answer ${questionCount - answered} more question(s).`
  return 'Retry the questions you got wrong.'
}

/** Course-level roll-up. Weighted by question count so a big lesson
 *  counts for more than a short one. */
export function aggregateMastery(
  results: { result: MasteryResult; weight: number }[],
): number {
  const totalWeight = results.reduce((a, r) => a + r.weight, 0)
  if (totalWeight === 0) return 0
  return Math.round(
    results.reduce((a, r) => a + r.result.percent * r.weight, 0) / totalWeight,
  )
}
