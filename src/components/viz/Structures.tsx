import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

/* ============================================================
   Directory tree + path names
   ------------------------------------------------------------
   Clicking a file writes both its absolute and relative path,
   with the "current directory" movable — which is the only way
   the difference between the two ever really lands.
   ============================================================ */

interface Node {
  name: string
  type: 'dir' | 'file'
  children?: Node[]
}

const TREE: Node = {
  name: 'C:',
  type: 'dir',
  children: [
    {
      name: 'Users',
      type: 'dir',
      children: [
        {
          name: 'Nimal',
          type: 'dir',
          children: [
            {
              name: 'Documents',
              type: 'dir',
              children: [
                { name: 'report.txt', type: 'file' },
                { name: 'notes.docx', type: 'file' },
              ],
            },
            {
              name: 'Pictures',
              type: 'dir',
              children: [
                { name: 'trip.jpg', type: 'file' },
                { name: 'profile.png', type: 'file' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Program Files',
      type: 'dir',
      children: [{ name: 'app.exe', type: 'file' }],
    },
  ],
}

export function DirectoryTreeExplorer() {
  const [selected, setSelected] = useState<string[]>(['C:', 'Users', 'Nimal', 'Documents', 'report.txt'])
  const [cwd, setCwd] = useState<string[]>(['C:', 'Users', 'Nimal', 'Documents'])
  const reduce = useReducedMotion()

  const absolute = winPath(selected)
  const relative = relativePath(cwd, selected)

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="border-b border-line p-4 sm:border-b-0 sm:border-r">
          <p className="mb-2 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
            Hierarchical directory structure
          </p>
          <TreeNode
            node={TREE}
            path={[]}
            depth={0}
            selected={selected}
            cwd={cwd}
            onSelect={setSelected}
            onSetCwd={setCwd}
            reduce={reduce}
          />
          <p className="mt-3 text-xs text-ink-3">
            Click a file to select it. Click a folder’s <span className="font-mono">◎</span> to make
            it the current working directory.
          </p>
        </div>

        <div className="space-y-3 bg-sunken/40 p-4">
          <div>
            <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
              Current working directory
            </p>
            <p className="rounded-lg bg-card px-3 py-2 font-mono text-sm text-ink">
              {winPath(cwd)}
            </p>
          </div>
          <div>
            <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-brand-600 dark:text-brand-400">
              Absolute path
            </p>
            <p className="break-all rounded-lg border border-brand-200 bg-card px-3 py-2 font-mono text-sm text-ink dark:border-brand-800">
              {absolute}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-3">
              Starts at the root directory. Works from anywhere, but it is long.
            </p>
          </div>
          <div>
            <p className="mb-1 text-2xs font-semibold uppercase tracking-[0.08em] text-accent-700 dark:text-accent-400">
              Relative path
            </p>
            <p className="break-all rounded-lg border border-accent-200 bg-card px-3 py-2 font-mono text-sm text-ink dark:border-accent-800">
              {relative}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-3">
              Starts from the current directory. Shorter, but it changes meaning if you move.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* `C:` on its own means "the current folder on drive C", not the root, so the
   root itself is always written `C:\\`. */
function winPath(parts: string[]): string {
  return parts.length === 1 ? `${parts[0]}\\` : parts.join('\\')
}

function relativePath(cwd: string[], target: string[]): string {
  let common = 0
  while (common < cwd.length && common < target.length - 1 && cwd[common] === target[common]) {
    common++
  }
  const up = cwd.length - common
  const down = target.slice(common)
  if (up === 0) return down.join('\\')
  return [...Array(up).fill('..'), ...down].join('\\')
}

function TreeNode({
  node,
  path,
  depth,
  selected,
  cwd,
  onSelect,
  onSetCwd,
  reduce,
}: {
  node: Node
  path: string[]
  depth: number
  selected: string[]
  cwd: string[]
  onSelect: (p: string[]) => void
  onSetCwd: (p: string[]) => void
  reduce: boolean | null
}) {
  const full = [...path, node.name]
  const isSelected = full.join('\\') === selected.join('\\')
  const isCwd = full.join('\\') === cwd.join('\\')

  return (
    <div>
      <motion.div
        initial={reduce ? false : { opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reduce ? 0 : 0.2, delay: reduce ? 0 : depth * 0.04 }}
        className="flex items-center gap-1"
        style={{ paddingLeft: depth * 16 }}
      >
        <button
          type="button"
          onClick={() => node.type === 'file' && onSelect(full)}
          disabled={node.type === 'dir'}
          className={cx(
            'flex items-center gap-1.5 rounded px-1.5 py-0.5 text-sm transition-colors',
            node.type === 'file' && 'hover:bg-brand-50 dark:hover:bg-brand-950',
            isSelected
              ? 'bg-brand-600 font-medium text-white hover:!bg-brand-600'
              : node.type === 'dir'
                ? 'font-medium text-ink'
                : 'text-ink-2',
          )}
        >
          <Icon name={node.type === 'dir' ? 'folder' : 'file'} size={14} className="shrink-0" />
          {node.name}
        </button>
        {node.type === 'dir' && (
          <button
            type="button"
            onClick={() => onSetCwd(full)}
            aria-label={`Set ${node.name} as current directory`}
            title="Make this the current working directory"
            className={cx(
              'rounded px-1 text-xs transition-colors',
              isCwd ? 'text-accent-700 dark:text-accent-400' : 'text-ink-3 hover:text-ink',
            )}
          >
            {isCwd ? '◉' : '◎'}
          </button>
        )}
      </motion.div>
      {node.children?.map((c) => (
        <TreeNode
          key={c.name}
          node={c}
          path={full}
          depth={depth + 1}
          selected={selected}
          cwd={cwd}
          onSelect={onSelect}
          onSetCwd={onSetCwd}
          reduce={reduce}
        />
      ))}
    </div>
  )
}

/* ============================================================
   Directory structure comparison (single / two-level / tree)
   ============================================================ */

export function DirectoryStructures() {
  const [kind, setKind] = useState<'single' | 'two' | 'hier'>('single')

  const INFO = {
    single: {
      title: 'Single-level directory',
      text: 'All files live in one directory with no subdirectories. Simplest possible organisation: fine for a small system, but every file in the whole machine must have a unique name, and finding anything becomes impossible as the count grows.',
    },
    two: {
      title: 'Two-level directory',
      text: 'Multiple directories at the top level, each holding files. Two users can now both have a file called notes.txt, because names only need to be unique within a directory.',
    },
    hier: {
      title: 'Hierarchical (tree) directory',
      text: 'Directories can contain directories, to any depth. Users navigate up and down the levels. Flexible, scalable, and what every modern OS actually uses.',
    },
  }[kind]

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div className="flex gap-1.5 border-b border-line bg-sunken/60 p-3">
        {(['single', 'two', 'hier'] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            aria-pressed={kind === k}
            className={cx(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              kind === k
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-card text-ink-2 hover:bg-brand-50 dark:hover:bg-brand-950',
            )}
          >
            {k === 'single' ? 'Single-level' : k === 'two' ? 'Two-level' : 'Hierarchical'}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5">
        <div className="scroll-x rounded-lg bg-sunken/50 p-4">
          <svg viewBox="0 0 400 190" className="h-auto w-full min-w-[22rem]" role="img" aria-label={INFO.title}>
            <defs>
              <marker id="dt-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
                <path d="M0 0.5L6 3L0 5.5z" fill="var(--border-strong)" />
              </marker>
            </defs>
            <Box x={160} y={8} w={80} h={28} label="root" tone="dir" />
            {kind === 'single' &&
              ['a.txt', 'b.jpg', 'c.exe', 'd.mp3'].map((f, i) => (
                <g key={f}>
                  <line x1={200} y1={36} x2={60 + i * 90} y2={78} stroke="var(--border-strong)" strokeWidth="1.2" markerEnd="url(#dt-arrow)" />
                  <Box x={20 + i * 90} y={80} w={80} h={26} label={f} tone="file" />
                </g>
              ))}
            {kind === 'two' &&
              ['Nimal', 'Kamala', 'Saman'].map((d, i) => (
                <g key={d}>
                  <line x1={200} y1={36} x2={80 + i * 120} y2={78} stroke="var(--border-strong)" strokeWidth="1.2" markerEnd="url(#dt-arrow)" />
                  <Box x={40 + i * 120} y={80} w={80} h={26} label={d} tone="dir" />
                  <line x1={80 + i * 120} y1={106} x2={80 + i * 120} y2={138} stroke="var(--border-strong)" strokeWidth="1.2" markerEnd="url(#dt-arrow)" />
                  <Box x={40 + i * 120} y={140} w={80} h={26} label="notes.txt" tone="file" />
                </g>
              ))}
            {kind === 'hier' && (
              <>
                {[
                  { label: 'Users', cx: 110, w: 80 },
                  { label: 'Program Files', cx: 292, w: 104 },
                ].map((d) => (
                  <g key={d.label}>
                    <line
                      x1={200}
                      y1={36}
                      x2={d.cx}
                      y2={58}
                      stroke="var(--border-strong)"
                      strokeWidth="1.2"
                      markerEnd="url(#dt-arrow)"
                    />
                    <Box x={d.cx - d.w / 2} y={60} w={d.w} h={26} label={d.label} tone="dir" />
                  </g>
                ))}
                {['Documents', 'Pictures'].map((d, i) => (
                  <g key={d}>
                    <line x1={110} y1={86} x2={60 + i * 100} y2={108} stroke="var(--border-strong)" strokeWidth="1.2" markerEnd="url(#dt-arrow)" />
                    <Box x={20 + i * 100} y={110} w={80} h={26} label={d} tone="dir" />
                    <line x1={60 + i * 100} y1={136} x2={60 + i * 100} y2={158} stroke="var(--border-strong)" strokeWidth="1.2" markerEnd="url(#dt-arrow)" />
                    <Box x={20 + i * 100} y={160} w={80} h={24} label={i === 0 ? 'report.txt' : 'trip.jpg'} tone="file" />
                  </g>
                ))}
                <line x1={292} y1={86} x2={292} y2={108} stroke="var(--border-strong)" strokeWidth="1.2" markerEnd="url(#dt-arrow)" />
                <Box x={252} y={110} w={80} h={26} label="app.exe" tone="file" />
              </>
            )}
          </svg>
        </div>
        <p className="mt-3 font-semibold text-ink">{INFO.title}</p>
        <p className="mt-1 text-base leading-relaxed text-ink-2">{INFO.text}</p>
      </div>
    </div>
  )
}

function Box({
  x,
  y,
  w,
  h,
  label,
  tone,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  tone: 'dir' | 'file'
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill={tone === 'dir' ? 'var(--surface-sunken)' : 'var(--surface-card)'}
        stroke={tone === 'dir' ? 'var(--ink-accent)' : 'var(--border-strong)'}
        strokeWidth={tone === 'dir' ? 1.6 : 1.2}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontSize="11.5"
        fontWeight={tone === 'dir' ? 600 : 400}
        fill={tone === 'dir' ? 'var(--ink-accent)' : 'var(--text-secondary)'}
      >
        {label}
      </text>
    </g>
  )
}

/* ============================================================
   Program memory layout (code / data / heap / stack)
   ============================================================ */

const SEGMENTS = [
  {
    name: 'Stack',
    color: 'var(--color-danger-600)',
    grow: 'grows downward ↓',
    text: 'Holds function calls, their parameters, return addresses and local variables. Every time a function is called a new frame is pushed on; when it returns, the frame is popped off.',
  },
  {
    name: 'Heap',
    color: 'var(--color-accent-700)',
    grow: 'grows upward ↑',
    text: 'Used for dynamic memory allocation during execution: memory the program requests while it is running, whose size was not known in advance.',
  },
  {
    name: 'Data / Global segment',
    color: 'var(--color-success-700)',
    grow: 'fixed size',
    text: 'Stores global and static variables: the ones that exist for the entire lifetime of the program.',
  },
  {
    name: 'Code (Text segment)',
    color: 'var(--color-brand-600)',
    grow: 'fixed size',
    text: 'Stores the program instructions themselves: the compiled machine code the CPU fetches and executes.',
  },
]

export function MemoryLayoutDiagram() {
  const [active, setActive] = useState(0)

  return (
    <div className="rounded-xl border border-line bg-card p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]">
        <div>
          <p className="mb-1 text-right font-mono text-2xs text-ink-3">max address</p>
          <div className="space-y-1">
            {SEGMENTS.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cx(
                  'flex w-full items-center justify-between gap-2 rounded-lg border px-3 text-left text-xs font-medium transition-all',
                  i === 0 ? 'h-16' : i === 1 ? 'h-14' : 'h-12',
                  active === i
                    ? 'border-line-strong text-white shadow-sm'
                    : 'border-line bg-sunken text-ink-2 hover:border-line-strong',
                )}
                style={active === i ? { background: s.color, borderColor: s.color } : undefined}
              >
                <span>{s.name}</span>
                <span className={cx('text-2xs', active === i ? 'text-white/80' : 'text-ink-3')}>
                  {s.grow.includes('↓') ? '↓' : s.grow.includes('↑') ? '↑' : ''}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-1 text-right font-mono text-2xs text-ink-3">address 0</p>
        </div>

        <div>
          <p className="mb-2 font-semibold text-ink">{SEGMENTS[active].name}</p>
          <p className="mb-2 inline-block rounded-full bg-sunken px-2.5 py-0.5 font-mono text-2xs text-ink-2">
            {SEGMENTS[active].grow}
          </p>
          <p className="text-base leading-relaxed text-ink-2">{SEGMENTS[active].text}</p>
          <p className="mt-3 rounded-lg bg-sunken px-3.5 py-2.5 text-sm leading-relaxed text-ink-2">
            From the program’s point of view it owns this entire continuous range of addresses,
            starting at 0, even though many programs are running at once. This is the{' '}
            <span className="font-medium text-ink">logical (virtual) address space</span>, and the
            MMU maps it onto whatever physical frames are actually free.
          </p>
        </div>
      </div>
    </div>
  )
}
