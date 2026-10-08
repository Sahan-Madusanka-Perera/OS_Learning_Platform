import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { allQuestions, lessonById, modules } from '@/content/course'
import { LEVEL_LABELS, type Question, type QuestionLevel } from '@/types/content'
import { useProgress } from '@/store/progress'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { AnswerFeedback } from '@/components/quiz/Feedback'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { MasteryRing, ProgressBar } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { cx, formatClock, shuffle } from '@/lib/utils'
import { Icon, MODULE_ICON, type IconName } from '@/components/ui/Icon'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/* The final assessment is not just a score. It reports by *kind of
   thinking* — recall, understanding, application, reasoning, exam style —
   and by module, so a student learns what to do next rather than simply
   how they did. */

const TIMED_SECONDS = 25 * 60
const QUESTION_COUNT = 20

interface Answer {
  questionId: string
  correct: boolean
  level: QuestionLevel
  lessonId: string
}

export function AssessmentPage() {
  useDocumentTitle('Final assessment')
  const [params] = useSearchParams()
  const timed = params.get('timed') === '1'
  const recordAttempt = useProgress((s) => s.recordAttempt)
  const saveAssessment = useProgress((s) => s.saveAssessment)
  const reduce = useReducedMotion()

  const [phase, setPhase] = useState<'intro' | 'running' | 'results'>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [secondsLeft, setSecondsLeft] = useState(TIMED_SECONDS)
  const [confirmExit, setConfirmExit] = useState(false)
  const savedRef = useRef(false)

  // A balanced paper: weighted across levels, spread across modules.
  const [paper, setPaper] = useState<Question[]>([])

  const build = () => {
    // Structured questions are excluded — they are self-marked and belong
    // in the Exam prep section, not in an auto-scored assessment.
    const pool = allQuestions.filter((q) => q.type !== 'structured')
    const byLevel: Record<number, Question[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] }
    for (const q of pool) byLevel[q.level].push(q)
    // Roughly: 3 recall, 5 understanding, 5 application, 4 reasoning, 3 exam style.
    const want: Record<number, number> = { 1: 3, 2: 5, 3: 5, 4: 4, 5: 3 }
    const picked: Question[] = []
    for (const lvl of [1, 2, 3, 4, 5]) {
      picked.push(...shuffle(byLevel[lvl]).slice(0, want[lvl]))
    }
    // Top up if a level was short.
    if (picked.length < QUESTION_COUNT) {
      const chosen = new Set(picked.map((q) => q.id))
      picked.push(
        ...shuffle(pool.filter((q) => !chosen.has(q.id))).slice(0, QUESTION_COUNT - picked.length),
      )
    }
    setPaper(shuffle(picked).slice(0, QUESTION_COUNT))
  }

  const start = () => {
    build()
    setAnswers([])
    setIndex(0)
    setSecondsLeft(TIMED_SECONDS)
    savedRef.current = false
    setPhase('running')
  }

  // Countdown for the timed variant.
  useEffect(() => {
    if (phase !== 'running' || !timed) return
    if (secondsLeft <= 0) {
      setPhase('results')
      return
    }
    const t = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => window.clearTimeout(t)
  }, [phase, timed, secondsLeft])

  const report = useMemo(() => buildReport(answers), [answers])

  // Persist the result once, when results are first shown.
  useEffect(() => {
    if (phase !== 'results' || savedRef.current || answers.length === 0) return
    savedRef.current = true
    saveAssessment({
      scope: timed ? 'timed' : 'final',
      score: report.correct,
      total: paper.length,
      byLevel: report.byLevel,
      weakLessonIds: report.weakLessons,
    })
  }, [phase, answers.length, report, paper.length, saveAssessment, timed])

  /* ---------- Intro ---------- */
  if (phase === 'intro') {
    return (
      <div className="mx-auto max-w-2xl">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-display text-ink sm:text-4xl">
            {timed ? 'Timed practice' : 'Final assessment'}
          </h1>
          <p className="mt-2 text-md leading-relaxed text-ink-2">
            {timed
              ? 'The same paper, under exam conditions. Feedback is held back until the end, as it would be in a real examination.'
              : 'A balanced paper across the whole competency, with immediate feedback on every question.'}
          </p>
        </header>

        <Card className="mb-5">
          <h2 className="mb-3 font-semibold text-ink">What to expect</h2>
          <ul className="space-y-2.5">
            {[
              [`${QUESTION_COUNT} questions`, 'spread across all four competency levels'],
              [
                'Five difficulty levels',
                'recognition, understanding, application, reasoning and exam style',
              ],
              [
                timed ? '25 minutes' : 'No time limit',
                timed
                  ? 'the clock runs from the moment you begin'
                  : 'take as long as you need to think properly',
              ],
              [
                timed ? 'Feedback at the end' : 'Immediate feedback',
                timed
                  ? 'so you experience real exam conditions'
                  : 'explaining the reasoning behind every answer',
              ],
              [
                'A diagnostic report',
                'broken down by kind of thinking and by module, with what to do next',
              ],
            ].map(([k, v]) => (
              <li key={k} className="flex gap-3 text-base leading-relaxed">
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-brand-500"
                />
                <span className="text-ink-2">
                  <span className="font-medium text-ink">{k}</span>: {v}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button size="lg" onClick={start}>
            Begin {timed ? 'timed practice' : 'assessment'}
            <Icon name="arrowRight" size={16} />
          </Button>
          <Button size="lg" variant="secondary" to="/exam">
            Back to exam prep
          </Button>
        </div>
        {!timed && (
          <p className="mt-4 text-sm text-ink-3">
            Prefer exam conditions?{' '}
            <Link to="/assessment?timed=1" className="text-brand-600 hover:underline dark:text-brand-400">
              Take the timed version instead
            </Link>
            .
          </p>
        )}
      </div>
    )
  }

  /* ---------- Running ---------- */
  if (phase === 'running') {
    const q = paper[index]
    const answeredThis = answers.some((a) => a.questionId === q?.id)
    const isLast = index >= paper.length - 1

    if (!q) return null

    return (
      <div className="mx-auto max-w-2xl">
        <div className="sticky top-14 z-10 -mx-4 mb-5 bg-page/95 px-4 py-3 backdrop-blur-sm sm:-mx-6 sm:px-6">
          <div className="flex items-center gap-3">
            <ProgressBar value={(index / paper.length) * 100} className="flex-1" height={6} />
            <span className="shrink-0 font-mono text-sm tabular-nums text-ink-3">
              {index + 1}/{paper.length}
            </span>
            {timed && (
              <span
                className={cx(
                  'shrink-0 rounded-lg px-2.5 py-1 font-mono text-sm font-semibold tabular-nums',
                  secondsLeft < 120
                    ? 'bg-danger-100 text-danger-700 dark:bg-danger-900/50 dark:text-danger-300'
                    : 'bg-sunken text-ink-2',
                )}
                role="timer"
                aria-live="off"
              >
                {formatClock(secondsLeft)}
              </span>
            )}
            <Button size="sm" variant="ghost" onClick={() => setConfirmExit(true)}>
              Exit
            </Button>
          </div>
        </div>

        <p className="mb-3 text-xs text-ink-3">
          Level {q.level} · {LEVEL_LABELS[q.level]}
        </p>

        <motion.div
          key={q.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.24 }}
        >
          <QuestionCard
            question={q}
            compact
            deferFeedback={timed}
            onAnswered={({ correct }) => {
              setAnswers((a) => [
                ...a,
                { questionId: q.id, correct, level: q.level, lessonId: q.lessonId },
              ])
              recordAttempt(q.lessonId, {
                questionId: q.id,
                correct,
                level: q.level,
                at: Date.now(),
              })
            }}
          />
        </motion.div>

        <div className="mt-4 flex gap-2">
          {index > 0 && !timed && (
            <Button variant="secondary" onClick={() => setIndex((i) => i - 1)}>
              <Icon name="arrowLeft" size={16} />
              Back
            </Button>
          )}
          <Button
            full
            disabled={!answeredThis}
            onClick={() => (isLast ? setPhase('results') : setIndex((i) => i + 1))}
          >
            {!answeredThis
              ? 'Answer to continue'
              : isLast
                ? 'Finish and see my report'
                : 'Next question'}
            {answeredThis && <Icon name="arrowRight" size={16} />}
          </Button>
        </div>

        <Modal
          open={confirmExit}
          onClose={() => setConfirmExit(false)}
          title="Leave the assessment?"
        >
          <p className="text-md leading-relaxed text-ink-2">
            Your answers so far have already been recorded against each lesson’s mastery, but you
            will not get a report unless you finish.
          </p>
          <div className="mt-5 flex gap-2">
            <Button variant="secondary" onClick={() => setConfirmExit(false)}>
              Keep going
            </Button>
            <Button variant="danger" onClick={() => setPhase('results')}>
              End and see partial report
            </Button>
          </div>
        </Modal>
      </div>
    )
  }

  /* ---------- Results ---------- */
  return (
    <ResultsReport
      report={report}
      total={paper.length}
      paper={paper}
      answers={answers}
      timed={timed}
      onRetake={start}
    />
  )
}

/* ------------------------------------------------------------------ */

interface Report {
  correct: number
  answered: number
  percent: number
  byLevel: Record<number, { correct: number; total: number }>
  byModule: Record<string, { correct: number; total: number }>
  weakLessons: string[]
  strongLessons: string[]
  conceptScore: number
  applicationScore: number
  examReadiness: number
}

function buildReport(answers: Answer[]): Report {
  const byLevel: Record<number, { correct: number; total: number }> = {}
  const byModule: Record<string, { correct: number; total: number }> = {}
  const byLesson: Record<string, { correct: number; total: number }> = {}

  const lessonToModule = new Map<string, string>()
  for (const m of modules) for (const l of m.lessons) lessonToModule.set(l.id, m.id)

  for (const a of answers) {
    ;(byLevel[a.level] ??= { correct: 0, total: 0 }).total++
    if (a.correct) byLevel[a.level].correct++

    const mid = lessonToModule.get(a.lessonId)
    if (mid) {
      ;(byModule[mid] ??= { correct: 0, total: 0 }).total++
      if (a.correct) byModule[mid].correct++
    }

    ;(byLesson[a.lessonId] ??= { correct: 0, total: 0 }).total++
    if (a.correct) byLesson[a.lessonId].correct++
  }

  const correct = answers.filter((a) => a.correct).length
  const pct = (o?: { correct: number; total: number }) =>
    !o || o.total === 0 ? 0 : Math.round((o.correct / o.total) * 100)

  // Levels 1–2 test whether the concept is understood at all.
  const concept = merge([byLevel[1], byLevel[2]])
  // Levels 3–4 test whether it can be used on an unfamiliar situation.
  const application = merge([byLevel[3], byLevel[4]])
  // Level 5 plus overall accuracy approximates readiness for the real paper.
  const exam = merge([byLevel[5], { correct, total: answers.length }])

  return {
    correct,
    answered: answers.length,
    percent: answers.length === 0 ? 0 : Math.round((correct / answers.length) * 100),
    byLevel,
    byModule,
    weakLessons: Object.entries(byLesson)
      .filter(([, v]) => v.correct / v.total < 0.5)
      .map(([k]) => k),
    strongLessons: Object.entries(byLesson)
      .filter(([, v]) => v.correct === v.total && v.total > 0)
      .map(([k]) => k),
    conceptScore: pct(concept),
    applicationScore: pct(application),
    examReadiness: pct(exam),
  }

  function merge(parts: ({ correct: number; total: number } | undefined)[]) {
    return parts.reduce<{ correct: number; total: number }>(
      (acc, p) => ({ correct: acc.correct + (p?.correct ?? 0), total: acc.total + (p?.total ?? 0) }),
      { correct: 0, total: 0 },
    )
  }
}

function ResultsReport({
  report,
  total,
  paper,
  answers,
  timed,
  onRetake,
}: {
  report: Report
  total: number
  paper: Question[]
  answers: Answer[]
  timed: boolean
  onRetake: () => void
}) {
  const reduce = useReducedMotion()
  const [showAnswers, setShowAnswers] = useState(false)
  const answerMap = new Map(answers.map((a) => [a.questionId, a]))

  const verdict: { icon: IconName; title: string; text: string; tone: string } =
    report.percent >= 85
      ? { icon: 'graduation', title: 'Mastered', text: 'You have a strong, exam-ready grasp of this competency.', tone: 'text-success-700 dark:text-success-400' }
      : report.percent >= 70
        ? { icon: 'trending', title: 'Nearly there', text: 'Solid understanding with a few specific gaps to close.', tone: 'text-success-700 dark:text-success-400' }
        : report.percent >= 50
          ? { icon: 'books', title: 'Developing', text: 'The foundations are in place. Targeted revision will move this quickly.', tone: 'text-accent-700 dark:text-accent-400' }
          : { icon: 'sprout', title: 'Early days', text: 'Work through the lessons again before assessing: practice cements understanding, it does not create it.', tone: 'text-ink-3' }

  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="mb-5 text-center">
          <Icon name={verdict.icon} size={36} className={`mx-auto mb-3 ${verdict.tone}`} />
          <h1 className="text-xl font-semibold tracking-tight text-ink">
            {timed ? 'Timed practice' : 'Final assessment'}: {verdict.title}
          </h1>
          <div className="my-5 flex justify-center">
            <MasteryRing
              value={report.percent}
              size={128}
              stroke={10}
              color={report.percent >= 70 ? 'var(--color-success-500)' : 'var(--color-brand-500)'}
            >
              <div>
                <p className="font-mono text-3xl font-bold leading-none tabular-nums text-ink">
                  {report.percent}%
                </p>
                <p className="mt-1 text-xs text-ink-3">
                  {report.correct}/{report.answered || total}
                </p>
              </div>
            </MasteryRing>
          </div>
          <p className="mx-auto max-w-md text-md leading-relaxed text-ink-2">{verdict.text}</p>
        </Card>
      </motion.div>

      {/* Diagnostic breakdown */}
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <Dial label="Concept understanding" value={report.conceptScore} hint="Levels 1–2: recall and understanding" />
        <Dial label="Application" value={report.applicationScore} hint="Levels 3–4: using it in new situations" />
        <Dial label="Exam readiness" value={report.examReadiness} hint="Level 5 and overall accuracy" />
      </div>

      {/* By level */}
      <Card className="mb-5">
        <h2 className="mb-3 font-semibold text-ink">By kind of thinking</h2>
        <div className="space-y-3">
          {([1, 2, 3, 4, 5] as QuestionLevel[]).map((lvl) => {
            const d = report.byLevel[lvl]
            const pct = !d || d.total === 0 ? 0 : Math.round((d.correct / d.total) * 100)
            if (!d) return null
            return (
              <div key={lvl}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="text-ink-2">
                    <span className="font-medium text-ink">Level {lvl}</span> · {LEVEL_LABELS[lvl]}
                  </span>
                  <span className="font-mono tabular-nums text-ink-3">
                    {d.correct}/{d.total}
                  </span>
                </div>
                <ProgressBar value={pct} height={6} tone={pct >= 70 ? 'success' : 'brand'} />
              </div>
            )
          })}
        </div>
      </Card>

      {/* By module */}
      <Card className="mb-5">
        <h2 className="mb-3 font-semibold text-ink">By module</h2>
        <div className="space-y-2.5">
          {modules.map((m) => {
            const d = report.byModule[m.id]
            if (!d) return null
            const pct = Math.round((d.correct / d.total) * 100)
            return (
              <div key={m.id} className="flex items-center gap-3">
                <Icon name={MODULE_ICON[m.id] ?? 'layers'} size={16} className="shrink-0 text-ink-3" />
                <Link
                  to={`/module/${m.id}`}
                  className="min-w-0 flex-1 truncate text-sm text-ink-2 hover:text-ink"
                >
                  {m.shortTitle}
                </Link>
                <div className="w-24 shrink-0 sm:w-40">
                  <ProgressBar value={pct} height={5} tone={pct >= 70 ? 'success' : 'brand'} />
                </div>
                <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums text-ink-3">
                  {d.correct}/{d.total}
                </span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Strong / weak */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <Card className="border-success-200 bg-success-50/40 dark:border-success-800 dark:bg-success-900/15">
          <h2 className="mb-2 flex items-center gap-2 font-semibold text-ink">
            <Icon name="check" size={17} className="text-success-700 dark:text-success-400" /> Strong areas
          </h2>
          {report.strongLessons.length === 0 ? (
            <p className="text-sm text-ink-2">
              No topic was fully correct this time, which is exactly what the review queue is for.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {report.strongLessons.slice(0, 6).map((id) => (
                <li key={id} className="text-sm text-ink-2">
                  {lessonById.get(id)?.title}
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="border-warn-300 bg-warn-50/40 dark:border-warn-700/60 dark:bg-warn-900/15">
          <h2 className="mb-2 flex items-center gap-2 font-semibold text-ink">
            <Icon name="warn" size={17} className="text-warn-700 dark:text-warn-400" /> Review these
          </h2>
          {report.weakLessons.length === 0 ? (
            <p className="text-sm text-ink-2">
              Nothing fell below 50%. Keep the material fresh with daily review.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {report.weakLessons.slice(0, 6).map((id) => (
                <li key={id}>
                  <Link
                    to={`/lesson/${id}`}
                    className="text-sm text-ink-2 underline decoration-dotted underline-offset-2 hover:text-ink"
                  >
                    {lessonById.get(id)?.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* Recommendation */}
      <Card className="mb-5 border-brand-200 bg-brand-50/60 dark:border-brand-800 dark:bg-brand-950/40">
        <h2 className="mb-2 font-semibold text-ink">What to do next</h2>
        <ol className="space-y-2">
          {buildRecommendations(report).map((r, i) => (
            <li key={i} className="flex gap-2.5 text-base leading-relaxed text-ink-2">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-600 text-2xs font-bold text-white">
                {i + 1}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ol>
      </Card>

      {/* Answer review */}
      {timed && (
        <Card className="mb-5">
          <button
            type="button"
            onClick={() => setShowAnswers((s) => !s)}
            aria-expanded={showAnswers}
            className="flex w-full items-center gap-2 text-left font-semibold text-ink"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 12 12"
              className={cx('transition-transform', showAnswers && 'rotate-90')}
              aria-hidden="true"
            >
              <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Review every question and answer
          </button>
          {showAnswers && (
            <div className="mt-4 space-y-4">
              {paper.map((q) => {
                const a = answerMap.get(q.id)
                if (!a) return null
                return (
                  <div key={q.id} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                    <p className="text-base font-medium text-ink">{q.prompt}</p>
                    <AnswerFeedback question={q} correct={a.correct} />
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={onRetake}>Take it again</Button>
        <Button variant="secondary" to="/review">
          Go to review queue
        </Button>
        <Button variant="ghost" to="/exam">
          Back to exam prep
        </Button>
      </div>

      {report.percent >= 85 && <Celebration />}
    </div>
  )
}

function buildRecommendations(report: Report): string[] {
  const out: string[] = []

  if (report.weakLessons.length > 0) {
    const first = lessonById.get(report.weakLessons[0])
    out.push(
      `Re-read “${first?.title}”: it scored below 50% and is the highest-value revision available to you right now.`,
    )
  }
  if (report.conceptScore < 60) {
    out.push(
      'Your level 1–2 scores show the underlying concepts are not yet secure. Go back through the lesson explanations rather than doing more practice questions.',
    )
  } else if (report.applicationScore < 60) {
    out.push(
      'You know the definitions but struggle to apply them. Practise level 3–4 questions specifically: the Practice page lets you filter by level.',
    )
  }
  if (report.examReadiness < 70) {
    out.push(
      'Work through the structured questions in Exam prep, marking your own answers against the mark schemes. That is the fastest way to learn what examiners reward.',
    )
  }
  out.push('Clear your review queue daily: spaced repetition is what makes this stick until the exam.')
  if (report.percent >= 85) {
    out.push('Retake the timed version in a few days to confirm the knowledge has held.')
  }
  return out.slice(0, 4)
}

function Dial({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="rounded-xl border border-line bg-card p-4 text-center">
      <p className="text-2xs font-medium uppercase tracking-[0.05em] text-ink-3">{label}</p>
      <p className="my-1 font-mono text-3xl font-bold tabular-nums text-ink">{value}%</p>
      <ProgressBar value={value} height={5} tone={value >= 70 ? 'success' : 'brand'} />
      <p className="mt-2 text-2xs leading-snug text-ink-3">{hint}</p>
    </div>
  )
}

function Celebration() {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduce ? 0 : 0.4, duration: reduce ? 0 : 0.5 }}
      className="mt-6 overflow-hidden rounded-2xl border border-success-300 bg-gradient-to-br from-success-50 to-brand-50 p-6 text-center dark:border-success-700 dark:from-success-900/40 dark:to-brand-950/50"
    >
      <Icon name="graduation" size={36} className="mx-auto mb-3 text-success-700 dark:text-success-400" />
      <h2 className="text-lg font-semibold tracking-tight text-ink">Competency 5 mastered</h2>
      <p className="mx-auto mt-2 max-w-md text-base leading-relaxed text-ink-2">
        You can define what an operating system is, explain how it manages files, processes, memory
        and devices, and work through the calculations under exam conditions. That is the whole
        competency.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {['Concepts understood', 'Practice completed', 'Assessment passed'].map((t) => (
          <Badge key={t} tone="success">
            <Icon name="check" size={13} />
            {t}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}
