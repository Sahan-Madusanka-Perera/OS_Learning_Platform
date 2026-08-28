import { useCallback } from 'react'
import {
  Analogy,
  CodeListing,
  ContentList,
  DataTable,
  Definition,
  ExamTip,
  KeyIdea,
  Misconception,
  Steps,
  WorkedExample,
} from './blocks'
import { ActiveRecall, ConfusedHelp, TeachBack } from './activities'
import { Callout } from '@/components/ui/Callout'
import { VizSlot } from '@/components/viz/registry'
import { QuestionCard } from '@/components/quiz/QuestionCard'
import { inline } from '@/lib/inline'
import { Icon } from '@/components/ui/Icon'
import { questionById } from '@/content/course'
import { useProgress } from '@/store/progress'
import type { Lesson, LessonBlock } from '@/types/content'

/* Maps content blocks to presentation. Everything pedagogical lives in
   the block components; this file only decides which one to render and
   wires up the progress side-effects for interactive blocks. */

export function LessonRenderer({ lesson }: { lesson: Lesson }) {
  const progress = useProgress((s) => s.lessons[lesson.id])
  const completeActivity = useProgress((s) => s.completeActivity)
  const recordAttempt = useProgress((s) => s.recordAttempt)

  const done = useCallback(
    (activityId: string) => progress?.activitiesDone.includes(activityId) ?? false,
    [progress],
  )

  return (
    <div className="space-y-6">
      {lesson.blocks.map((block, i) => (
        <BlockView
          key={i}
          block={block}
          index={i}
          lesson={lesson}
          done={done}
          onActivity={(id) => completeActivity(lesson.id, id)}
          onAnswer={(questionId, correct, level) =>
            recordAttempt(lesson.id, { questionId, correct, level, at: Date.now() })
          }
        />
      ))}
    </div>
  )
}

function BlockView({
  block,
  index,
  lesson,
  done,
  onActivity,
  onAnswer,
}: {
  block: LessonBlock
  index: number
  lesson: Lesson
  done: (id: string) => boolean
  onActivity: (id: string) => void
  onAnswer: (questionId: string, correct: boolean, level: number) => void
}) {
  const activityId = `${lesson.id}-act-${index}`

  switch (block.kind) {
    case 'heading':
      return block.level === 'sub' ? (
        <h3 className="!mt-8 border-t border-line pt-6 text-md font-semibold uppercase tracking-[0.06em] text-ink-3">
          {block.text}
        </h3>
      ) : (
        <h2 className="!mt-10 text-xl font-semibold tracking-tight text-ink text-balance">
          {block.text}
        </h2>
      )

    case 'prose':
      return (
        <div className="prose-lesson">
          {block.paragraphs.map((p, i) => (
            <p key={i}>{inline(p)}</p>
          ))}
        </div>
      )

    case 'keyIdea':
      return <KeyIdea block={block} />
    case 'definition':
      return <Definition block={block} />
    case 'analogy':
      return <Analogy block={block} />
    case 'misconception':
      return <Misconception block={block} />
    case 'examTip':
      return <ExamTip block={block} />
    case 'list':
      return <ContentList block={block} />
    case 'steps':
      return <Steps block={block} />
    case 'compare':
    case 'table':
      return <DataTable block={block} />
    case 'worked':
      return <WorkedExample block={block} />
    case 'code':
      return <CodeListing block={block} />

    case 'callout':
      return (
        <Callout tone={block.tone} title={block.title}>
          {inline(block.text)}
        </Callout>
      )

    case 'confused':
      return <ConfusedHelp block={block} />

    case 'recall':
      return (
        <ActiveRecall
          block={block}
          done={done(activityId)}
          onComplete={() => onActivity(activityId)}
        />
      )

    case 'teachBack':
      return (
        <TeachBack
          block={block}
          storageKey={`os-teachback-${activityId}`}
          done={done(activityId)}
          onComplete={() => onActivity(activityId)}
        />
      )

    case 'viz':
      return (
        <figure className="!mt-7">
          {block.title && (
            <figcaption className="mb-2.5 flex items-center gap-2.5">
              <Icon name="lab" size={17} className="shrink-0 text-brand-600 dark:text-brand-400" />
              <span className="font-semibold text-ink">{block.title}</span>
            </figcaption>
          )}
          <VizSlot id={block.viz} props={block.props} />
          {block.caption && (
            <p className="mt-2 text-sm leading-relaxed text-ink-3">{inline(block.caption)}</p>
          )}
        </figure>
      )

    case 'quickCheck': {
      const questions = block.questionIds
        .map((id) => questionById.get(id))
        .filter((q) => q !== undefined)
      if (questions.length === 0) return null
      return (
        <section className="!mt-9 border-t border-line pt-6" aria-label="Quick check">
          <div className="mb-4 flex items-center gap-2.5">
            <Icon name="check" size={17} className="shrink-0 text-brand-600 dark:text-brand-400" />
            <h3 className="font-semibold text-ink">{block.title ?? 'Quick check'}</h3>
            <span className="ml-auto text-xs text-ink-3">
              {questions.length} question{questions.length === 1 ? '' : 's'}
            </span>
          </div>
          <div className="space-y-3">
            {questions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                onAnswered={({ correct }) => onAnswer(q.id, correct, q.level)}
              />
            ))}
          </div>
        </section>
      )
    }
  }
}
