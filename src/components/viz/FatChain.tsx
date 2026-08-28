import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

/* ============================================================
   FAT chain explorer
   ------------------------------------------------------------
   FAT-chaining MCQs are a recurring A/L question type and students
   lose marks by (a) reading the table forwards instead of chaining,
   and (b) forgetting to multiply by block size. This walks the
   chain one hop at a time and totals the space as it goes.
   ============================================================ */

interface FatRow {
  block: number
  next: number
}

const DEFAULT_TABLE: FatRow[] = [
  { block: 150, next: 151 },
  { block: 151, next: 152 },
  { block: 152, next: -1 },
  { block: 153, next: 154 },
  { block: 154, next: 155 },
  { block: 155, next: 156 },
]

export function FatChainExplorer({
  table = DEFAULT_TABLE,
  startBlock = 150,
  blockSizeKB = 8,
  fileName = 'report.txt',
}: {
  table?: FatRow[]
  startBlock?: number
  blockSizeKB?: number
  fileName?: string
}) {
  const [visited, setVisited] = useState<number[]>([])
  const reduce = useReducedMotion()

  const current = visited.length === 0 ? null : visited[visited.length - 1]
  const currentRow = current === null ? null : table.find((r) => r.block === current)
  const finished = currentRow?.next === -1
  const notStarted = visited.length === 0

  const step = () => {
    if (notStarted) {
      setVisited([startBlock])
      return
    }
    if (!currentRow || currentRow.next === -1) return
    const nextExists = table.some((r) => r.block === currentRow.next)
    setVisited((v) => [...v, currentRow.next])
    if (!nextExists) {
      // Chain runs off the visible portion of the table.
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="border-b border-line bg-sunken/60 px-4 py-3">
        <p className="text-sm text-ink-2">
          Block size = <span className="font-mono font-semibold text-ink">{blockSizeKB} KB</span> ·
          The directory entry for{' '}
          <span className="font-mono font-semibold text-ink">{fileName}</span> contains the{' '}
          <span className="font-medium text-ink">first block number: {startBlock}</span> ·{' '}
          <span className="font-mono">−1</span> marks the last block.
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-5">
        {/* FAT table */}
        <div className="rounded-lg border border-line">
          <table className="w-full border-collapse text-sm">
            <caption className="border-b border-line bg-sunken px-3 py-1.5 text-left text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
              File Allocation Table
            </caption>
            <thead>
              <tr className="bg-sunken/60">
                <th scope="col" className="border-b border-line px-4 py-1.5 text-left font-semibold text-ink-3">
                  Block
                </th>
                <th scope="col" className="border-b border-line px-4 py-1.5 text-left font-semibold text-ink-3">
                  Next
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((r) => {
                const order = visited.indexOf(r.block)
                const isCurrent = r.block === current
                return (
                  <tr
                    key={r.block}
                    className={cx(
                      'transition-colors duration-300',
                      isCurrent
                        ? 'bg-brand-200 dark:bg-brand-800/70'
                        : order >= 0
                          ? 'bg-brand-50 dark:bg-brand-950/60'
                          : 'even:bg-sunken/40',
                    )}
                  >
                    <td className="border-b border-line px-4 py-1.5 font-mono font-semibold text-ink">
                      {r.block}
                      {order >= 0 && (
                        <span className="ml-2 rounded bg-brand-600 px-1.5 py-0.5 text-2xs font-bold text-white">
                          {order + 1}
                        </span>
                      )}
                    </td>
                    <td
                      className={cx(
                        'border-b border-line px-4 py-1.5 font-mono',
                        r.next === -1 ? 'font-semibold text-danger-600 dark:text-danger-400' : 'text-ink-2',
                      )}
                    >
                      {r.next}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Chain trace */}
        <div>
          <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
            The chain so far
          </p>
          <div className="min-h-[3rem] rounded-lg bg-sunken px-4 py-3">
            {notStarted ? (
              <p className="text-base text-ink-3">
                Start at the block number stored in the directory entry.
              </p>
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                {visited.map((b, i) => (
                  <motion.span
                    key={`${b}-${i}`}
                    initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5"
                  >
                    {i > 0 && <span aria-hidden="true" className="text-ink-3">→</span>}
                    <span className="rounded-md bg-brand-600 px-2 py-1 font-mono text-sm font-semibold text-white">
                      {b}
                    </span>
                  </motion.span>
                ))}
                {finished && (
                  <>
                    <span aria-hidden="true" className="text-ink-3">→</span>
                    <span className="rounded-md bg-danger-500 px-2 py-1 font-mono text-sm font-semibold text-white">
                      −1 (end)
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {!finished && (
              <Button size="sm" onClick={step}>
                {notStarted ? `Start at block ${startBlock}` : 'Follow the pointer →'}
              </Button>
            )}
            {visited.length > 0 && (
              <Button size="sm" variant="ghost" onClick={() => setVisited([])}>
                Reset
              </Button>
            )}
          </div>

          {finished && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-lg border border-success-300 bg-success-50 p-3.5 dark:border-success-700/60 dark:bg-success-900/25"
            >
              <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-success-700 dark:text-success-300">
                Answer
              </p>
              <ul className="space-y-1 text-base text-ink-2">
                <li>
                  Directory entry ={' '}
                  <span className="font-mono font-semibold text-ink">{startBlock}</span> (the first
                  block)
                </li>
                <li>
                  Blocks used ={' '}
                  <span className="font-mono font-semibold text-ink">{visited.length}</span> (
                  {visited.join(', ')})
                </li>
                <li>
                  Disk space allocated ={' '}
                  <span className="font-mono font-semibold text-ink">
                    {visited.length} × {blockSizeKB} KB = {visited.length * blockSizeKB} KB
                  </span>
                </li>
              </ul>
              <p className="mt-2 border-t border-success-300/60 pt-2 text-sm text-ink-3 dark:border-success-700/50">
                Rows not on the chain (like {table.filter((r) => !visited.includes(r.block)).map((r) => r.block).join(', ')})
                belong to other files — ignore them.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
