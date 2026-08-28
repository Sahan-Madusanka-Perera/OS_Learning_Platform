import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

/* Internal fragmentation, made arithmetic-free: drag the file size
   and watch the last block fill up and the waste shrink or grow. */

export function InternalFragmentationDemo({ blockKB = 4 }: { blockKB?: number }) {
  const [fileKB, setFileKB] = useState(8.66)
  const reduce = useReducedMotion()

  const blocksNeeded = Math.max(1, Math.ceil(fileKB / blockKB))
  const allocated = blocksNeeded * blockKB
  const wasted = allocated - fileKB
  const lastBlockUsed = fileKB - (blocksNeeded - 1) * blockKB

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <label htmlFor="frag-size" className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-ink">File size</span>
        <span className="font-mono text-brand-600 dark:text-brand-400">{fileKB.toFixed(2)} KB</span>
      </label>
      <input
        id="frag-size"
        type="range"
        min={0.5}
        max={20}
        step={0.01}
        value={fileKB}
        onChange={(e) => setFileKB(Number(e.target.value))}
        className="w-full accent-[var(--color-brand-500)]"
      />
      <p className="mt-1 text-xs text-ink-3">Block size is fixed at {blockKB} KB.</p>

      <div className="scroll-x mt-4 rounded-lg bg-sunken p-3">
        <div className="flex min-w-max gap-1.5">
          {Array.from({ length: blocksNeeded }, (_, i) => {
            const isLast = i === blocksNeeded - 1
            const usedInBlock = isLast ? lastBlockUsed : blockKB
            const fillPct = (usedInBlock / blockKB) * 100
            return (
              <motion.div
                key={i}
                layout={!reduce}
                className="relative h-24 w-16 overflow-hidden rounded-md border border-line-strong bg-card"
                title={`Block ${i + 1}: ${usedInBlock.toFixed(2)} KB of ${blockKB} KB used`}
              >
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-brand-500"
                  animate={{ height: `${fillPct}%` }}
                  transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                {isLast && fillPct < 99.5 && (
                  <div
                    className="absolute inset-x-0 top-0 [background-image:repeating-linear-gradient(45deg,var(--color-danger-300),var(--color-danger-300)_3px,transparent_3px,transparent_7px)]"
                    style={{ height: `${100 - fillPct}%` }}
                    aria-hidden="true"
                  />
                )}
                <span className="absolute inset-x-0 bottom-1 text-center text-2xs font-bold text-white mix-blend-difference">
                  {i + 1}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        <Fact label="Blocks allocated" value={`${blocksNeeded} × ${blockKB} KB = ${allocated} KB`} />
        <Fact label="Actually used" value={`${fileKB.toFixed(2)} KB`} />
        <Fact
          label="Wasted (internal fragmentation)"
          value={`${wasted.toFixed(2)} KB`}
          tone={wasted > 0.01 ? 'danger' : 'success'}
        />
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        {wasted < 0.01 ? (
          <>
            The file size is an exact multiple of the block size, so every block is completely full
            and <span className="font-medium text-ink">no space is wasted</span>. This is the only
            case where internal fragmentation is zero.
          </>
        ) : (
          <>
            The striped area in the last block is{' '}
            <span className="font-medium text-ink">unusable</span>. Another file cannot borrow it,
            because a block can be allocated to only one file at a time.
          </>
        )}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant="ghost" onClick={() => setFileKB(8.66)}>
          Syllabus example (8.66 KB)
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setFileKB(blockKB * 3)}>
          Exact fit ({blockKB * 3} KB)
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setFileKB(blockKB * 2 + 0.05)}>
          Worst case
        </Button>
      </div>
    </div>
  )
}

function Fact({
  label,
  value,
  tone = 'neutral',
}: {
  label: string
  value: string
  tone?: 'neutral' | 'danger' | 'success'
}) {
  return (
    <div
      className={cx(
        'rounded-lg border px-3.5 py-2.5',
        tone === 'danger'
          ? 'border-danger-200 bg-danger-50 dark:border-danger-800/60 dark:bg-danger-900/25'
          : tone === 'success'
            ? 'border-success-200 bg-success-50 dark:border-success-800/60 dark:bg-success-900/25'
            : 'border-line bg-sunken/60',
      )}
    >
      <p className="text-2xs font-medium uppercase tracking-[0.05em] text-ink-3">{label}</p>
      <p className="font-mono text-base font-semibold text-ink">{value}</p>
    </div>
  )
}

/* ------------------------------------------------------------------
   Defragmentation: watch a fragmented disk get put back in order.
   ------------------------------------------------------------------ */

const FRAG_LAYOUT = [
  1, 0, 2, 1, 0, 3, 2, 0, 1, 3, 0, 2, 1, 0, 3, 2, 0, 0, 1, 3,
  0, 2, 0, 1, 3, 0, 0, 2, 1, 0, 3, 0, 2, 0, 1, 0, 3, 0, 0, 0,
]
const COLORS = ['transparent', 'var(--color-brand-500)', 'var(--color-accent-500)', 'var(--color-success-500)']

export function DefragmentationDemo() {
  const [defragged, setDefragged] = useState(false)
  const reduce = useReducedMotion()

  const ordered = [...FRAG_LAYOUT].sort((a, b) => (a === 0 ? 1 : b === 0 ? -1 : a - b))
  const layout = defragged ? ordered : FRAG_LAYOUT

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="scroll-x rounded-lg bg-sunken p-3">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: 'repeat(20, minmax(14px, 1fr))', minWidth: 320 }}
        >
          {layout.map((f, i) => (
            <motion.div
              key={i}
              className={cx(
                'aspect-square rounded-[3px]',
                f === 0 && 'border border-dashed border-line-strong',
              )}
              style={{ background: COLORS[f] }}
              animate={{ background: COLORS[f] }}
              transition={{
                duration: reduce ? 0 : 0.4,
                delay: reduce ? 0 : (i % 20) * 0.015,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={() => setDefragged((d) => !d)}>
          {defragged ? 'Show the fragmented disk again' : 'Run defragmentation'}
        </Button>
        <div className="flex flex-wrap gap-2.5 text-xs text-ink-3">
          {['File A', 'File B', 'File C'].map((n, i) => (
            <span key={n} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-sm"
                style={{ background: COLORS[i + 1] }}
              />
              {n}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        {defragged ? (
          <>
            Each file's blocks are now <span className="font-medium text-ink">contiguous</span>, so
            the read/write head sweeps once instead of jumping about — seek time drops and files
            open faster. As a side effect the free space has also gathered into one region, though
            that is compaction's goal, not defragmentation's.
          </>
        ) : (
          <>
            The three files are scattered. To read one file the disk head must jump across the
            platter repeatedly, which raises <span className="font-medium text-ink">seek time</span>{' '}
            and slows every open, save and backup. Note this matters for{' '}
            <span className="font-medium text-ink">HDDs only</span> — an SSD has no moving head, and
            defragmenting one simply wears it out.
          </>
        )}
      </p>
    </div>
  )
}
