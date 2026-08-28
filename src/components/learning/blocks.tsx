import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { inline } from '@/lib/inline'
import { cx } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import type {
  AnalogyBlock,
  CompareBlock,
  DefinitionBlock,
  ExamTipBlock,
  KeyIdeaBlock,
  ListBlock,
  MisconceptionBlock,
  StepsBlock,
  TableBlock,
  WorkedExampleBlock,
  CodeBlock,
} from '@/types/content'

const reveal = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
}

/* ---------- Key idea: the one sentence to remember ---------- */
export function KeyIdea({ block }: { block: KeyIdeaBlock }) {
  return (
    <div className="rounded-2xl border border-brand-200/80 bg-brand-50/60 p-5 dark:border-brand-800/60 dark:bg-brand-950/35">
      <div className="flex gap-3.5">
        <Icon
          name="keyIdea"
          size={20}
          className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400"
        />
        <div className="min-w-0">
          {block.title && (
            <p className="mb-1 text-2xs font-semibold uppercase tracking-label text-brand-700 dark:text-brand-400">
              {block.title}
            </p>
          )}
          <p className="text-lg font-medium leading-relaxed text-ink text-pretty">
            {inline(block.text)}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- Definition: simple first, precise second ---------- */
export function Definition({ block }: { block: DefinitionBlock }) {
  const [showTechnical, setShowTechnical] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="border-b border-line bg-sunken px-5 py-3">
        <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
          Definition
        </p>
        <p className="text-lg font-semibold tracking-tight text-ink">{block.term}</p>
      </div>

      <div className="space-y-3 px-5 py-4">
        <div>
          <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-brand-600 dark:text-brand-400">
            In plain words
          </p>
          <p className="text-md leading-relaxed text-ink">{inline(block.simple)}</p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowTechnical((s) => !s)}
            aria-expanded={showTechnical}
            className="flex w-full items-center gap-2 rounded-lg py-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3 transition-colors hover:text-ink"
          >
            <Icon
              name="chevronRight"
              size={13}
              className={cx('transition-transform duration-200', showTechnical && 'rotate-90')}
            />
            The exam definition
          </button>
          <AnimatePresence initial={false}>
            {showTechnical && (
              <motion.div
                initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="pt-2 text-md leading-relaxed text-ink-2">
                  {inline(block.technical)}
                </p>
                {block.example && (
                  <p className="mt-2 rounded-lg bg-sunken px-3 py-2 text-sm text-ink-2">
                    <span className="font-semibold text-ink">Example: </span>
                    {inline(block.example)}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ---------- Analogy: everyday picture → technical reality ---------- */
export function Analogy({ block }: { block: AnalogyBlock }) {
  return (
    <div className="rounded-xl border border-accent-200 bg-accent-50/60 p-5 dark:border-accent-800/60 dark:bg-accent-950/30">
      <div className="mb-3 flex items-center gap-2.5">
        <Icon name="analogy" size={19} className="shrink-0 text-accent-700 dark:text-accent-400" />
        <div>
          <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-accent-700 dark:text-accent-400">
            Think of it like this
          </p>
          <p className="font-semibold text-ink">{block.title}</p>
        </div>
      </div>
      <p className="text-md leading-relaxed text-ink-2">{inline(block.everyday)}</p>
      <div className="mt-3 flex gap-3 border-t border-accent-200/70 pt-3 dark:border-accent-800/50">
        <Icon
          name="arrowRight"
          size={16}
          className="mt-1 shrink-0 text-accent-700 dark:text-accent-400"
        />
        <p className="text-base leading-relaxed text-ink-2">
          <span className="font-semibold text-ink">In the real system: </span>
          {inline(block.mapsTo)}
        </p>
      </div>
    </div>
  )
}

/* ---------- Misconception: name the wrong belief, then correct it ---------- */
export function Misconception({ block }: { block: MisconceptionBlock }) {
  return (
    <div className="overflow-hidden rounded-xl border border-danger-300 dark:border-danger-700/60">
      <div className="flex items-center gap-2.5 border-b border-danger-300 bg-danger-50 px-4 py-2.5 dark:border-danger-700/60 dark:bg-danger-900/30">
        <Icon name="misconception" size={16} className="text-danger-600 dark:text-danger-400" />
        <p className="text-2xs font-semibold uppercase tracking-label text-danger-700 dark:text-danger-300">
          Common mistake
        </p>
      </div>
      <div className="space-y-3 bg-card px-4 py-4">
        <div className="flex gap-2.5">
          <Icon name="cross" size={16} className="mt-1 shrink-0 text-danger-500" />
          <p className="text-md leading-relaxed text-ink-2 line-through decoration-danger-400/60 decoration-1">
            {inline(block.wrong)}
          </p>
        </div>
        <div className="flex gap-2.5">
          <Icon name="check" size={16} className="mt-1 shrink-0 text-success-700 dark:text-success-400" />
          <p className="text-md font-medium leading-relaxed text-ink">{inline(block.right)}</p>
        </div>
        {block.why && (
          <p className="border-t border-line pt-3 text-base leading-relaxed text-ink-3">
            {inline(block.why)}
          </p>
        )}
      </div>
    </div>
  )
}

/* ---------- Exam tip ---------- */
export function ExamTip({ block }: { block: ExamTipBlock }) {
  return (
    <div className="rounded-xl border border-success-300 bg-success-50/70 p-4 dark:border-success-700/60 dark:bg-success-900/25">
      <div className="flex gap-3.5">
        <Icon name="examTip" size={19} className="mt-0.5 shrink-0 text-success-700 dark:text-success-400" />
        <div className="min-w-0">
          <p className="mb-1 text-2xs font-semibold uppercase tracking-label text-success-700 dark:text-success-400">
            Exam tip
          </p>
          <p className="text-md leading-relaxed text-ink-2">{inline(block.text)}</p>
          {block.modelAnswer && (
            <div className="mt-3 rounded-lg border border-success-300/70 bg-card px-3.5 py-2.5 dark:border-success-700/50">
              <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                Model wording
              </p>
              <p className="text-base italic leading-relaxed text-ink">
                “{inline(block.modelAnswer)}”
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ---------- Lists ---------- */
export function ContentList({ block }: { block: ListBlock }) {
  const style = block.style ?? 'bullet'
  const marker = (i: number) => {
    if (style === 'number')
      return (
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-100 text-2xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
          {i + 1}
        </span>
      )
    if (style === 'check')
      return <Icon name="check" size={16} className="mt-1 shrink-0 text-success-700 dark:text-success-400" />
    if (style === 'cross')
      return <Icon name="cross" size={16} className="mt-1 shrink-0 text-danger-500" />
    return (
      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
    )
  }

  return (
    <div>
      {block.title && <p className="mb-2 font-semibold text-ink">{inline(block.title)}</p>}
      <ul className="space-y-2">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-md leading-relaxed text-ink-2">
            {marker(i)}
            <span className="min-w-0">{inline(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Steps: an ordered process ---------- */
export function Steps({ block }: { block: StepsBlock }) {
  return (
    <div>
      {block.title && <p className="mb-3 font-semibold text-ink">{inline(block.title)}</p>}
      <ol className="relative space-y-4 border-l border-dashed border-line-strong pl-6">
        {block.steps.map((s, i) => (
          <li key={i} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-0 grid h-6 w-6 place-items-center rounded-full border border-brand-200 bg-brand-50 text-2xs font-bold text-brand-700 dark:border-brand-800 dark:bg-brand-950 dark:text-brand-300"
            >
              {i + 1}
            </span>
            <p className="font-medium text-ink">{inline(s.title)}</p>
            <p className="mt-0.5 text-base leading-relaxed text-ink-2">{inline(s.detail)}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ---------- Comparison / data tables ---------- */
export function DataTable({
  block,
  emphasiseFirstColumn,
}: {
  block: CompareBlock | TableBlock
  emphasiseFirstColumn?: boolean
}) {
  return (
    <figure>
      {block.title && <figcaption className="mb-2 font-semibold text-ink">{inline(block.title)}</figcaption>}
      <div className="scroll-x rounded-xl border border-line">
        <table className="w-full min-w-[34rem] border-collapse text-left text-base">
          <thead>
            <tr className="bg-sunken">
              {block.headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className="border-b border-line px-3.5 py-2.5 text-xs font-semibold uppercase tracking-[0.05em] text-ink-2"
                >
                  {inline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri} className="even:bg-sunken/45">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={cx(
                      'border-b border-line px-3.5 py-2.5 align-top leading-relaxed last:border-b-0',
                      ci === 0 && emphasiseFirstColumn !== false
                        ? 'font-medium text-ink'
                        : 'text-ink-2',
                    )}
                  >
                    {inline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.caption && <p className="mt-2 text-sm text-ink-3">{inline(block.caption)}</p>}
    </figure>
  )
}

/* ---------- Worked example: steps hidden until the student tries ---------- */
export function WorkedExample({ block }: { block: WorkedExampleBlock }) {
  const [revealed, setRevealed] = useState(0)
  const reduce = useReducedMotion()
  const done = revealed >= block.steps.length

  return (
    <div className="overflow-hidden rounded-xl border border-brand-200 dark:border-brand-800/70">
      <div className="border-b border-brand-200 bg-brand-50 px-5 py-3 dark:border-brand-800/70 dark:bg-brand-950/50">
        <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-brand-700 dark:text-brand-300">
          Worked example
        </p>
        <p className="font-semibold text-ink">{block.title}</p>
      </div>

      <div className="bg-card px-5 py-4">
        <p className="rounded-lg bg-sunken px-4 py-3 text-md leading-relaxed text-ink">
          {inline(block.problem)}
        </p>

        <ol className="mt-4 space-y-3">
          <AnimatePresence initial={false}>
            {block.steps.slice(0, revealed).map((s, i) => (
              <motion.li
                key={i}
                variants={reveal}
                initial={reduce ? 'show' : 'hidden'}
                animate="show"
                transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-3"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 text-2xs font-bold text-brand-700 dark:bg-brand-900 dark:text-brand-300">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="font-medium text-ink">{inline(s.title)}</p>
                  <p className="mt-0.5 font-mono text-sm leading-relaxed text-ink-2">
                    {inline(s.detail)}
                  </p>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>

        {!done ? (
          <button
            type="button"
            onClick={() => setRevealed((r) => r + 1)}
            className="mt-4 w-full rounded-xl border border-dashed border-brand-300 py-2.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50 dark:border-brand-700 dark:text-brand-300 dark:hover:bg-brand-950/60"
          >
            {revealed === 0 ? 'Try it yourself first — then show step 1' : `Show step ${revealed + 1}`}
            <span className="ml-1.5 text-ink-3">
              ({revealed}/{block.steps.length})
            </span>
          </button>
        ) : (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-lg border border-success-300 bg-success-50 px-4 py-3 dark:border-success-700/60 dark:bg-success-900/25"
          >
            <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-success-700 dark:text-success-300">
              Answer
            </p>
            <p className="mt-0.5 text-md font-medium text-ink">{inline(block.answer)}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

/* ---------- Code / terminal-style listing ---------- */
export function CodeListing({ block }: { block: CodeBlock }) {
  return (
    <figure>
      {block.title && <figcaption className="mb-2 font-semibold text-ink">{block.title}</figcaption>}
      <pre className="scroll-x rounded-xl border border-line bg-sunken px-4 py-3.5 font-mono text-sm leading-relaxed text-ink-2">
        <code>{block.lines.join('\n')}</code>
      </pre>
      {block.caption && <p className="mt-2 text-sm text-ink-3">{inline(block.caption)}</p>}
    </figure>
  )
}

/* ---------- Small shared shell for interactive activities ---------- */
export function ActivityShell({
  label,
  icon,
  children,
  tone = 'brand',
  done,
}: {
  label: string
  icon: ReactNode
  children: ReactNode
  tone?: 'brand' | 'accent'
  done?: boolean
}) {
  return (
    <div
      className={cx(
        'rounded-xl border-2 border-dashed p-5 transition-colors duration-300',
        done
          ? 'border-success-300 bg-success-50/50 dark:border-success-700/60 dark:bg-success-900/15'
          : tone === 'accent'
            ? 'border-accent-300 bg-accent-50/40 dark:border-accent-800/70 dark:bg-accent-950/20'
            : 'border-brand-300 bg-brand-50/40 dark:border-brand-800 dark:bg-brand-950/25',
      )}
    >
      <div className="mb-3.5 flex items-center gap-2.5">
        {icon}
        <p className="text-2xs font-semibold uppercase tracking-label text-ink-3">{label}</p>
        {done && (
          <span className="ml-auto inline-flex items-center gap-1 text-2xs font-semibold text-success-700 dark:text-success-400">
            <Icon name="check" size={13} />
            done
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
