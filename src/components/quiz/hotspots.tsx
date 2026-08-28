import { cx } from '@/lib/utils'

/* Labelled SVG diagrams the student clicks into. Each region is a
   real <button> so the question is fully keyboard-operable — a
   "click the diagram" task must never be mouse-only. */

interface Region {
  id: string
  label: string
  /** SVG rect in the diagram's own coordinate space. */
  x: number
  y: number
  w: number
  h: number
}

interface Diagram {
  title: string
  viewBox: string
  regions: Region[]
  /** Static ornamentation drawn behind the regions. */
  decor?: React.ReactNode
}

const arrow = (x1: number, y1: number, x2: number, y2: number, key: string) => (
  <line
    key={key}
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="var(--border-strong)"
    strokeWidth="1.5"
    markerEnd="url(#hs-arrow)"
  />
)

export const DIAGRAMS: Record<string, Diagram> = {
  /* Where does the OS sit? */
  'system-layers': {
    title: 'Layers of a computer system',
    viewBox: '0 0 420 260',
    regions: [
      { id: 'user', label: 'User (liveware)', x: 60, y: 14, w: 300, h: 40 },
      { id: 'application', label: 'Application software', x: 60, y: 62, w: 300, h: 44 },
      { id: 'os', label: 'Operating system', x: 60, y: 114, w: 300, h: 44 },
      { id: 'driver', label: 'Device drivers', x: 60, y: 166, w: 300, h: 40 },
      { id: 'hardware', label: 'Hardware', x: 60, y: 214, w: 300, h: 40 },
    ],
  },

  /* Seven-state diagram — pick the state being described. */
  'process-states': {
    title: 'Process states',
    viewBox: '0 0 480 300',
    regions: [
      { id: 'new', label: 'New', x: 16, y: 16, w: 92, h: 44 },
      { id: 'ready', label: 'Ready', x: 152, y: 16, w: 92, h: 44 },
      { id: 'running', label: 'Running', x: 288, y: 16, w: 92, h: 44 },
      { id: 'terminated', label: 'Terminated', x: 288, y: 132, w: 92, h: 44 },
      { id: 'blocked', label: 'Blocked', x: 152, y: 132, w: 92, h: 44 },
      { id: 'susp-ready', label: 'Suspended Ready', x: 136, y: 232, w: 124, h: 44 },
      { id: 'susp-blocked', label: 'Suspended Blocked', x: 288, y: 232, w: 124, h: 44 },
    ],
    decor: (
      <g>
        {arrow(110, 38, 150, 38, 'a1')}
        {arrow(246, 38, 286, 38, 'a2')}
        {arrow(334, 62, 334, 130, 'a3')}
        {arrow(286, 48, 248, 130, 'a4')}
        {arrow(198, 130, 198, 62, 'a5')}
        {arrow(198, 178, 198, 230, 'a6')}
        {arrow(334, 178, 334, 230, 'a7')}
      </g>
    ),
  },

  /* Address translation — click the part that never changes, etc. */
  'address-translation': {
    title: 'Virtual to physical address translation',
    viewBox: '0 0 460 230',
    regions: [
      { id: 'page-number', label: 'Page number', x: 24, y: 40, w: 112, h: 44 },
      { id: 'offset-virtual', label: 'Offset (virtual)', x: 140, y: 40, w: 132, h: 44 },
      { id: 'page-table', label: 'Page table', x: 300, y: 30, w: 136, h: 64 },
      { id: 'frame-number', label: 'Frame number', x: 24, y: 152, w: 112, h: 44 },
      { id: 'offset-physical', label: 'Offset (physical)', x: 140, y: 152, w: 132, h: 44 },
    ],
    decor: (
      <g>
        <text x="24" y="28" fontSize="11" fill="var(--text-muted)">
          Virtual address
        </text>
        <text x="24" y="140" fontSize="11" fill="var(--text-muted)">
          Physical address
        </text>
        {arrow(80, 88, 298, 60, 'b1')}
        {arrow(300, 92, 82, 148, 'b2')}
        {arrow(206, 88, 206, 148, 'b3')}
      </g>
    ),
  },

  /* Physical disk anatomy. */
  'disk-anatomy': {
    title: 'Inside a hard disk',
    viewBox: '0 0 380 260',
    regions: [
      { id: 'platter', label: 'Platter', x: 24, y: 20, w: 96, h: 38 },
      { id: 'track', label: 'Track', x: 24, y: 68, w: 96, h: 38 },
      { id: 'sector', label: 'Sector', x: 24, y: 116, w: 96, h: 38 },
      { id: 'block', label: 'Block', x: 24, y: 164, w: 96, h: 38 },
      { id: 'cluster', label: 'Cluster', x: 24, y: 212, w: 96, h: 38 },
    ],
    decor: (
      <g>
        <circle cx="262" cy="132" r="98" fill="var(--surface-sunken)" stroke="var(--border-strong)" />
        <circle cx="262" cy="132" r="74" fill="none" stroke="var(--grid-line)" strokeDasharray="3 3" />
        <circle cx="262" cy="132" r="50" fill="none" stroke="var(--grid-line)" strokeDasharray="3 3" />
        <circle cx="262" cy="132" r="14" fill="var(--border-strong)" />
        <path
          d="M262 34 A98 98 0 0 1 340 72 L262 132 Z"
          fill="var(--color-brand-500)"
          opacity="0.16"
        />
      </g>
    ),
  },
}

export function HotspotDiagram({
  diagram,
  picked,
  correctRegion,
  answered,
  onPick,
}: {
  diagram: string
  picked: string | null
  correctRegion: string
  answered: boolean
  onPick: (id: string, label: string, correctLabel: string) => void
}) {
  const d = DIAGRAMS[diagram]
  if (!d) {
    return (
      <p className="rounded-lg bg-sunken px-4 py-3 text-base text-ink-3">
        This diagram is unavailable.
      </p>
    )
  }
  const correctLabel = d.regions.find((r) => r.id === correctRegion)?.label ?? ''

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink-3">
        Click the correct part of the diagram.
      </p>
      <div className="scroll-x rounded-xl border border-line bg-sunken/50 p-3">
        <svg
          viewBox={d.viewBox}
          className="h-auto w-full min-w-[20rem]"
          role="group"
          aria-label={d.title}
        >
          <defs>
            <marker id="hs-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
              <path d="M0 0.5L6 3L0 5.5z" fill="var(--border-strong)" />
            </marker>
          </defs>
          {d.decor}
          {d.regions.map((r) => {
            const isPicked = picked === r.id
            const isCorrect = r.id === correctRegion
            const fill = !answered
              ? 'var(--surface-card)'
              : isCorrect
                ? 'var(--color-success-100)'
                : isPicked
                  ? 'var(--color-danger-100)'
                  : 'var(--surface-card)'
            const stroke = !answered
              ? 'var(--border-strong)'
              : isCorrect
                ? 'var(--color-success-500)'
                : isPicked
                  ? 'var(--color-danger-500)'
                  : 'var(--border-subtle)'
            return (
              <g
                key={r.id}
                role="button"
                tabIndex={answered ? -1 : 0}
                aria-label={r.label}
                aria-disabled={answered}
                className={cx(!answered && 'cursor-pointer')}
                onClick={() => !answered && onPick(r.id, r.label, correctLabel)}
                onKeyDown={(e) => {
                  if (!answered && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    onPick(r.id, r.label, correctLabel)
                  }
                }}
              >
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="8"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={answered && (isCorrect || isPicked) ? 2 : 1.25}
                  className={cx(
                    'transition-all duration-150',
                    !answered && 'hover:stroke-[var(--color-brand-500)]',
                  )}
                />
                <text
                  x={r.x + r.w / 2}
                  y={r.y + r.h / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="500"
                  fill={answered && isCorrect ? 'var(--color-success-900)' : 'var(--text-primary)'}
                  pointerEvents="none"
                >
                  {r.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
