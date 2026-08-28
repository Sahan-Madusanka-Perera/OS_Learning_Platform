import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

/* ============================================================
   Address translation lab
   ------------------------------------------------------------
   Students consistently lose marks by changing the offset during
   translation. Here the offset bits are literally coloured the
   same before and after, and animate straight down the page,
   so "the offset never changes" becomes something they see.
   ============================================================ */

interface PageTableEntry {
  page: number
  frame: number
  present: boolean
}

const DEFAULT_TABLE: PageTableEntry[] = [
  { page: 0, frame: 6, present: true },
  { page: 1, frame: 1, present: true },
  { page: 2, frame: 5, present: true },
  { page: 3, frame: 0, present: true },
  { page: 4, frame: 3, present: false },
  { page: 5, frame: 7, present: true },
  { page: 6, frame: 2, present: true },
  { page: 7, frame: 4, present: true },
]

export function AddressTranslationLab({
  pageBits = 3,
  offsetBits = 10,
  frameBits = 3,
}: {
  pageBits?: number
  offsetBits?: number
  frameBits?: number
}) {
  const [pageNo, setPageNo] = useState(5)
  const [offset, setOffset] = useState(232)
  const [table, setTable] = useState(DEFAULT_TABLE)
  const reduce = useReducedMotion()

  const maxOffset = 2 ** offsetBits - 1
  const entry = table.find((t) => t.page === pageNo)
  const fault = !entry?.present

  const pageBin = pageNo.toString(2).padStart(pageBits, '0')
  const offsetBin = offset.toString(2).padStart(offsetBits, '0')
  const frameBin = entry ? entry.frame.toString(2).padStart(frameBits, '0') : '?'.repeat(frameBits)

  const pageSize = 2 ** offsetBits
  const logical = pageNo * pageSize + offset
  const physical = entry ? entry.frame * pageSize + offset : null

  const handleFault = () => {
    // Servicing the fault: evict a resident page to free its frame,
    // then load the faulting page into it.
    const victim = table.find((t) => t.present && t.page !== pageNo)
    if (!victim || !entry) return
    setTable((prev) =>
      prev.map((t) =>
        t.page === victim.page
          ? { ...t, present: false }
          : t.page === pageNo
            ? { ...t, frame: victim.frame, present: true }
            : t,
      ),
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="border-b border-line bg-sunken/60 px-4 py-3">
        <p className="text-sm text-ink-2">
          Page size = frame size ={' '}
          <span className="font-mono font-semibold text-ink">{fmtBytes(pageSize)}</span> ·{' '}
          {pageBits} page-number bits · {offsetBits} offset bits · {frameBits} frame-number bits
        </p>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {/* Controls */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label
              htmlFor="pl-page"
              className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink"
            >
              <span>Page number</span>
              <span className="font-mono text-brand-600 dark:text-brand-400">
                {pageNo} ({pageBin}₂)
              </span>
            </label>
            <input
              id="pl-page"
              type="range"
              min={0}
              max={2 ** pageBits - 1}
              value={pageNo}
              onChange={(e) => setPageNo(Number(e.target.value))}
              className="w-full accent-[var(--color-brand-500)]"
            />
          </div>
          <div>
            <label
              htmlFor="pl-offset"
              className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink"
            >
              <span>Offset (displacement)</span>
              <span className="font-mono text-accent-700 dark:text-accent-400">{offset}</span>
            </label>
            <input
              id="pl-offset"
              type="range"
              min={0}
              max={maxOffset}
              value={offset}
              onChange={(e) => setOffset(Number(e.target.value))}
              className="w-full accent-[var(--color-accent-500)]"
            />
          </div>
        </div>

        {/* Virtual address */}
        <div>
          <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
            Virtual (logical) address — byte {logical.toLocaleString()}
          </p>
          <div className="scroll-x">
            <div className="flex min-w-max gap-1 font-mono text-sm">
              <Bits bits={pageBin} tone="brand" label="page number" />
              <Bits bits={offsetBin} tone="accent" label="offset" />
            </div>
          </div>
        </div>

        {/* Page table */}
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
          <div className="scroll-x rounded-lg border border-line">
            <table className="w-full min-w-[18rem] border-collapse text-sm">
              <caption className="border-b border-line bg-sunken px-3 py-1.5 text-left text-2xs font-semibold uppercase tracking-[0.06em] text-ink-3">
                Page table
              </caption>
              <thead>
                <tr className="bg-sunken/60">
                  <th scope="col" className="border-b border-line px-3 py-1.5 text-left font-semibold text-ink-3">Page</th>
                  <th scope="col" className="border-b border-line px-3 py-1.5 text-left font-semibold text-ink-3">Frame</th>
                  <th scope="col" className="border-b border-line px-3 py-1.5 text-left font-semibold text-ink-3">Present/Absent</th>
                </tr>
              </thead>
              <tbody>
                {table.map((t) => (
                  <tr
                    key={t.page}
                    className={cx(
                      'transition-colors',
                      t.page === pageNo
                        ? 'bg-brand-100 dark:bg-brand-900/50'
                        : 'even:bg-sunken/40',
                    )}
                  >
                    <td className="border-b border-line px-3 py-1.5 font-mono font-semibold text-ink">
                      {t.page}
                    </td>
                    <td className="border-b border-line px-3 py-1.5 font-mono text-ink-2">
                      {t.present ? `${t.frame} (${t.frame.toString(2).padStart(frameBits, '0')}₂)` : '—'}
                    </td>
                    <td className="border-b border-line px-3 py-1.5">
                      <span
                        className={cx(
                          'rounded px-1.5 py-0.5 font-mono text-xs font-semibold',
                          t.present
                            ? 'bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-300'
                            : 'bg-danger-100 text-danger-700 dark:bg-danger-900/50 dark:text-danger-300',
                        )}
                      >
                        {t.present ? '1' : '0'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid place-items-center rounded-lg border border-line bg-sunken/50 px-4 py-4 sm:w-44">
            <div className="text-center">
              <p className="text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
                MMU lookup
              </p>
              <p className="mt-1 font-mono text-sm text-ink-2">
                page <span className="font-semibold text-brand-600 dark:text-brand-400">{pageNo}</span>
              </p>
              <motion.p
                key={String(entry?.frame) + String(entry?.present)}
                initial={reduce ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="my-1 text-ink-3"
                aria-hidden="true"
              >
                ↓
              </motion.p>
              {fault ? (
                <p className="font-mono text-sm font-semibold text-danger-600 dark:text-danger-400">
                  PAGE FAULT
                </p>
              ) : (
                <p className="font-mono text-sm">
                  frame{' '}
                  <span className="font-semibold text-success-700 dark:text-success-400">
                    {entry!.frame}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Physical address / fault */}
        {fault ? (
          <div className="rounded-lg border border-danger-300 bg-danger-50 p-4 dark:border-danger-700/60 dark:bg-danger-900/25">
            <p className="font-semibold text-ink">Page fault — this page is not in RAM</p>
            <p className="mt-1 text-base leading-relaxed text-ink-2">
              Page {pageNo}’s present/absent bit is <span className="font-mono font-semibold">0</span>,
              so no physical address exists yet. The OS must load the page from secondary storage
              into a free frame. If no frame is free, it evicts a resident page first — freeing that
              frame and setting the evicted page’s present bit to 0.
            </p>
            <Button size="sm" className="mt-3" onClick={handleFault}>
              Service the page fault
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-1.5 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              Physical address — byte {physical!.toLocaleString()} in RAM
            </p>
            <div className="scroll-x">
              <div className="flex min-w-max gap-1 font-mono text-sm">
                <Bits bits={frameBin} tone="success" label="frame number" />
                <Bits bits={offsetBin} tone="accent" label="offset — unchanged" />
              </div>
            </div>
            <div className="mt-3 rounded-lg bg-sunken px-4 py-3">
              <p className="text-sm leading-relaxed text-ink-2">
                Only the left-hand part changed:{' '}
                <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">
                  {pageBin}
                </span>{' '}
                became{' '}
                <span className="font-mono font-semibold text-success-700 dark:text-success-400">
                  {frameBin}
                </span>
                . The offset{' '}
                <span className="font-mono font-semibold text-accent-700 dark:text-accent-400">
                  {offsetBin}
                </span>{' '}
                is byte-for-byte identical — because a page and a frame are the same size, so the
                byte sits at the same distance from the start of either one.
              </p>
              <p className="mt-2 font-mono text-xs text-ink-3">
                physical = frame × frame size + offset = {entry!.frame} × {pageSize} + {offset} ={' '}
                {physical!.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Bits({
  bits,
  tone,
  label,
}: {
  bits: string
  tone: 'brand' | 'accent' | 'success'
  label: string
}) {
  const bg =
    tone === 'brand'
      ? 'bg-brand-500'
      : tone === 'accent'
        ? 'bg-accent-500 !text-accent-950'
        : 'bg-success-500'
  return (
    <div>
      <div className="flex gap-0.5">
        {bits.split('').map((b, i) => (
          <span
            key={i}
            className={cx(
              'grid h-7 w-[22px] place-items-center rounded text-xs font-semibold text-white',
              bg,
            )}
          >
            {b}
          </span>
        ))}
      </div>
      <p className="mt-1 text-center text-2xs font-medium text-ink-3">{label}</p>
    </div>
  )
}

function fmtBytes(n: number): string {
  if (n >= 2 ** 30) return `${n / 2 ** 30} GB`
  if (n >= 2 ** 20) return `${n / 2 ** 20} MB`
  if (n >= 2 ** 10) return `${n / 2 ** 10} KB`
  return `${n} B`
}

/* ============================================================
   Memory-size calculator
   ------------------------------------------------------------
   The syllabus is full of "if page size is X and there are N
   pages…" questions. Rather than a static worked answer, this
   lets the student move any one quantity and watch the powers of
   two on the others fall out — which is the actual skill.
   ============================================================ */

const POWERS = Array.from({ length: 25 }, (_, i) => i + 8) // 2^8 … 2^32

export function MemoryCalculator() {
  const [pageSizeExp, setPageSizeExp] = useState(12) // 4 KB
  const [pageCountExp, setPageCountExp] = useState(10) // 1024 pages
  const [frameCountExp, setFrameCountExp] = useState(8) // 256 frames

  const pageSize = 2 ** pageSizeExp
  const virtualSize = 2 ** (pageSizeExp + pageCountExp)
  const physicalSize = 2 ** (pageSizeExp + frameCountExp)

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="space-y-4">
        <Slider
          id="mc-pagesize"
          label="Page size = frame size"
          value={pageSizeExp}
          min={9}
          max={22}
          onChange={setPageSizeExp}
          display={`${fmtBytes(pageSize)}  (2^${pageSizeExp})`}
          note={`${pageSizeExp} offset bits`}
        />
        <Slider
          id="mc-pages"
          label="Number of pages (virtual memory)"
          value={pageCountExp}
          min={4}
          max={20}
          onChange={setPageCountExp}
          display={`${(2 ** pageCountExp).toLocaleString()} pages  (2^${pageCountExp})`}
          note={`${pageCountExp} page-number bits`}
          tone="brand"
        />
        <Slider
          id="mc-frames"
          label="Number of frames (physical memory)"
          value={frameCountExp}
          min={2}
          max={20}
          onChange={setFrameCountExp}
          display={`${(2 ** frameCountExp).toLocaleString()} frames  (2^${frameCountExp})`}
          note={`${frameCountExp} frame-number bits`}
          tone="success"
        />
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <Result
          label="Virtual memory capacity"
          value={fmtBytes(virtualSize)}
          working={`${fmtBytes(pageSize)} × ${(2 ** pageCountExp).toLocaleString()} = 2^${pageSizeExp} × 2^${pageCountExp} = 2^${pageSizeExp + pageCountExp} bytes`}
        />
        <Result
          label="Physical memory capacity (RAM)"
          value={fmtBytes(physicalSize)}
          working={`${fmtBytes(pageSize)} × ${(2 ** frameCountExp).toLocaleString()} = 2^${pageSizeExp} × 2^${frameCountExp} = 2^${pageSizeExp + frameCountExp} bytes`}
        />
        <Result
          label="Virtual address length (bus)"
          value={`${pageSizeExp + pageCountExp} bits`}
          working={`${pageCountExp} page-number bits + ${pageSizeExp} offset bits`}
        />
        <Result
          label="Physical address length (bus width)"
          value={`${pageSizeExp + frameCountExp} bits`}
          working={`${frameCountExp} frame-number bits + ${pageSizeExp} offset bits`}
        />
      </div>

      <p className="mt-4 rounded-lg bg-sunken px-4 py-3 text-sm leading-relaxed text-ink-2">
        <span className="font-semibold text-ink">Notice: </span>
        halving the page size doubles the number of pages for the same memory, and adds one offset
        bit while removing one page-number bit. The total address length never changes — that is
        fixed by the bus width.
      </p>
    </div>
  )
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  onChange,
  display,
  note,
  tone = 'accent',
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  display: string
  note: string
  tone?: 'brand' | 'accent' | 'success'
}) {
  const accent =
    tone === 'brand'
      ? 'accent-[var(--color-brand-500)]'
      : tone === 'success'
        ? 'accent-[var(--color-success-500)]'
        : 'accent-[var(--color-accent-500)]'
  return (
    <div>
      <label htmlFor={id} className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="font-mono text-xs text-ink-2">{display}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cx('w-full', accent)}
        aria-describedby={`${id}-note`}
      />
      <p id={`${id}-note`} className="mt-0.5 text-2xs text-ink-3">
        → {note}
      </p>
    </div>
  )
}

function Result({ label, value, working }: { label: string; value: string; working: string }) {
  return (
    <div className="rounded-lg border border-line bg-sunken/60 px-3.5 py-2.5">
      <p className="text-2xs font-medium uppercase tracking-[0.05em] text-ink-3">{label}</p>
      <p className="font-mono text-lg font-semibold text-ink">{value}</p>
      <p className="mt-0.5 break-words font-mono text-2xs leading-tight text-ink-3">{working}</p>
    </div>
  )
}

export { POWERS }
