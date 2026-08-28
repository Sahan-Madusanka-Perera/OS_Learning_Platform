import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

/* ============================================================
   Disk allocation lab
   ------------------------------------------------------------
   The same three files, laid out on the same disk, under each of
   the three allocation methods. Switching method re-lays the disk
   in front of the student, so the trade-offs (fragmentation vs
   pointer overhead vs index blocks) are visible rather than
   memorised from a table.
   ============================================================ */

type Method = 'contiguous' | 'linked' | 'indexed'

const GRID_W = 10
const GRID_H = 5
const TOTAL = GRID_W * GRID_H

interface FileSpec {
  name: string
  blocks: number
  color: string
}

const FILES: FileSpec[] = [
  { name: 'notes.txt', blocks: 4, color: 'var(--color-brand-600)' },
  { name: 'photo.jpg', blocks: 6, color: 'var(--color-accent-700)' },
  { name: 'song.mp3', blocks: 5, color: 'var(--color-success-700)' },
]

interface Layout {
  /** blockIndex → { file, order } */
  cells: Map<number, { file: number; order: number }>
  /** blockIndex of each file's index block, for indexed allocation. */
  indexBlocks: Map<number, number>
  fileBlocks: number[][]
}

function buildLayout(method: Method, fragmented: boolean): Layout {
  const cells = new Map<number, { file: number; order: number }>()
  const indexBlocks = new Map<number, number>()
  const fileBlocks: number[][] = []

  if (method === 'contiguous') {
    // Contiguous needs one unbroken run per file. With a fragmented
    // disk the free space is chopped up, so the third file will not fit.
    let cursor = fragmented ? 2 : 0
    FILES.forEach((f, fi) => {
      const blocks: number[] = []
      for (let i = 0; i < f.blocks; i++) {
        const idx = cursor + i
        if (idx < TOTAL) {
          cells.set(idx, { file: fi, order: i })
          blocks.push(idx)
        }
      }
      fileBlocks.push(blocks)
      cursor += f.blocks + (fragmented ? 3 : 0)
    })
  } else {
    // Linked and indexed scatter freely — that is the whole point.
    const scatter = [
      [3, 14, 27, 41],
      [1, 8, 19, 22, 35, 44],
      [6, 12, 25, 31, 47],
    ]
    FILES.forEach((f, fi) => {
      const blocks = scatter[fi].slice(0, f.blocks)
      blocks.forEach((b, i) => cells.set(b, { file: fi, order: i }))
      fileBlocks.push(blocks)
      if (method === 'indexed') {
        const ib = [10, 20, 30][fi]
        indexBlocks.set(fi, ib)
      }
    })
  }
  return { cells, indexBlocks, fileBlocks }
}

const METHOD_INFO: Record<
  Method,
  { title: string; directory: string; pros: string[]; cons: string[] }
> = {
  contiguous: {
    title: 'Contiguous allocation',
    directory: 'file name + start block + length',
    pros: ['Very fast — direct access', 'No pointer overhead', 'Disk head barely moves'],
    cons: ['External fragmentation', 'Growing a file is difficult', 'Needs a big enough gap'],
  },
  linked: {
    title: 'Linked allocation',
    directory: 'file name + start block (+ size)',
    pros: ['No external fragmentation', 'Files grow easily', 'Efficient use of free space'],
    cons: ['Sequential access only — slow', 'A pointer in every block', 'One corrupt pointer loses the rest'],
  },
  indexed: {
    title: 'Indexed allocation',
    directory: 'file name + index block',
    pros: ['Direct AND random access', 'No external fragmentation', 'Files grow dynamically'],
    cons: ['An extra index block per file', 'Index block size caps file size'],
  },
}

export function DiskAllocationLab() {
  const [method, setMethod] = useState<Method>('contiguous')
  const [fragmented, setFragmented] = useState(false)
  const [selected, setSelected] = useState<number | null>(0)
  const reduce = useReducedMotion()

  const layout = useMemo(() => buildLayout(method, fragmented), [method, fragmented])
  const info = METHOD_INFO[method]

  const contiguousFails =
    method === 'contiguous' && layout.fileBlocks.some((b, i) => b.length < FILES[i].blocks)

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="border-b border-line bg-sunken/60 p-3">
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(METHOD_INFO) as Method[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              aria-pressed={method === m}
              className={cx(
                'rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition-colors',
                method === m
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-card text-ink-2 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-950',
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <p className="mb-1 font-semibold text-ink">{info.title}</p>
        <p className="mb-4 text-sm text-ink-2">
          The row this file’s folder keeps for it — its{' '}
          <span className="font-medium text-ink">directory entry</span> — stores:{' '}
          <span className="font-mono text-ink">{info.directory}</span>
        </p>

        {/* File legend */}
        <div className="mb-3 flex flex-wrap gap-2">
          {FILES.map((f, i) => (
            <button
              key={f.name}
              type="button"
              onClick={() => setSelected(selected === i ? null : i)}
              aria-pressed={selected === i}
              className={cx(
                'flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all',
                selected === i
                  ? 'border-line-strong bg-sunken text-ink'
                  : 'border-line text-ink-2 opacity-70 hover:opacity-100',
              )}
            >
              <span
                aria-hidden="true"
                className="h-3 w-3 rounded-sm"
                style={{ background: f.color }}
              />
              {f.name}
              <span className="text-ink-3">({f.blocks} blocks)</span>
            </button>
          ))}
        </div>

        {/* The disk */}
        <div className="scroll-x rounded-lg border border-line bg-sunken/50 p-3">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: `repeat(${GRID_W}, minmax(30px, 1fr))`, minWidth: 330 }}
            role="grid"
            aria-label="Disk blocks"
          >
            {Array.from({ length: TOTAL }, (_, i) => {
              const cell = layout.cells.get(i)
              const indexOwner = [...layout.indexBlocks.entries()].find(([, b]) => b === i)?.[0]
              const dim = selected !== null && cell && cell.file !== selected
              const indexDim = selected !== null && indexOwner !== undefined && indexOwner !== selected

              return (
                <motion.div
                  key={`${method}-${i}`}
                  initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: dim || indexDim ? 0.45 : 1, scale: 1 }}
                  transition={{ duration: reduce ? 0 : 0.25, delay: reduce ? 0 : i * 0.006 }}
                  className={cx(
                    'relative grid aspect-square place-items-center rounded text-2xs font-semibold',
                    !cell && indexOwner === undefined && 'border border-dashed border-line-strong text-ink-3',
                  )}
                  style={
                    cell
                      ? { background: FILES[cell.file].color, color: '#fff' }
                      : indexOwner !== undefined
                        ? {
                            background: 'var(--surface-card)',
                            border: `2px solid ${FILES[indexOwner].color}`,
                            color: FILES[indexOwner].color,
                          }
                        : undefined
                  }
                  title={
                    cell
                      ? `Block ${i} — ${FILES[cell.file].name}, part ${cell.order + 1}`
                      : indexOwner !== undefined
                        ? `Block ${i} — index block for ${FILES[indexOwner].name}`
                        : `Block ${i} — free`
                  }
                >
                  {cell ? (
                    <>
                      {i}
                      {method === 'linked' && (
                        <span className="absolute -bottom-0.5 right-0.5 text-2xs opacity-90">
                          {layout.fileBlocks[cell.file][cell.order + 1] !== undefined
                            ? `→${layout.fileBlocks[cell.file][cell.order + 1]}`
                            : '−1'}
                        </span>
                      )}
                    </>
                  ) : indexOwner !== undefined ? (
                    'IDX'
                  ) : (
                    i
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Contextual explanation */}
        {method === 'contiguous' && (
          <div className="mt-3">
            <Button size="sm" variant="secondary" onClick={() => setFragmented((f) => !f)}>
              {fragmented ? 'Show a fresh, empty disk' : 'Simulate a disk after months of use'}
            </Button>
            {fragmented && (
              <div
                className={cx(
                  'mt-3 rounded-lg border p-3.5',
                  contiguousFails
                    ? 'border-danger-300 bg-danger-50 dark:border-danger-700/60 dark:bg-danger-900/25'
                    : 'border-warn-300 bg-warn-50 dark:border-warn-700/60 dark:bg-warn-900/25',
                )}
              >
                <p className="text-base leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">External fragmentation. </span>
                  Deleted files have left gaps. Plenty of blocks are free in total, but they are
                  scattered — so a file that needs an unbroken run may not fit even though the
                  free space adds up to more than enough. That is the fatal weakness of contiguous
                  allocation.
                </p>
              </div>
            )}
          </div>
        )}

        {method === 'linked' && (
          <p className="mt-3 rounded-lg bg-sunken px-4 py-3 text-base leading-relaxed text-ink-2">
            Each block carries a pointer (the small <span className="font-mono">→n</span> label) to
            the next one. The last block holds <span className="font-mono">−1</span>. To read block
            4 of a file you must walk blocks 1, 2 and 3 first — which is why linked allocation gives{' '}
            <span className="font-medium text-ink">sequential access only</span>. This is exactly
            how the FAT chain works.
          </p>
        )}

        {method === 'indexed' && (
          <div className="mt-3 rounded-lg bg-sunken px-4 py-3">
            <p className="text-base leading-relaxed text-ink-2">
              Each file gets one <span className="font-medium text-ink">index block</span> (outlined
              above) holding the addresses of all its data blocks. To reach block 4 you read the
              index and jump straight there — direct and random access, with no chain to walk.
            </p>
            {selected !== null && (
              <p className="mt-2 font-mono text-xs text-ink-3">
                Index block {layout.indexBlocks.get(selected)} for {FILES[selected].name} contains:{' '}
                [{layout.fileBlocks[selected].join(', ')}]
              </p>
            )}
          </div>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-success-200 bg-success-50/60 p-3.5 dark:border-success-800/60 dark:bg-success-900/20">
            <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-success-700 dark:text-success-300">
              Advantages
            </p>
            <ul className="space-y-1">
              {info.pros.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-ink-2">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-success-700 dark:text-success-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-danger-200 bg-danger-50/60 p-3.5 dark:border-danger-800/60 dark:bg-danger-900/20">
            <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-danger-700 dark:text-danger-300">
              Disadvantages
            </p>
            <ul className="space-y-1">
              {info.cons.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-ink-2">
                  <Icon name="cross" size={15} className="mt-0.5 shrink-0 text-danger-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
