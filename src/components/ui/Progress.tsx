import { motion, useReducedMotion } from 'motion/react'


export function ProgressBar({
  value,
  className,
  tone = 'brand',
  showLabel,
  height = 8,
  label,
}: {
  value: number
  className?: string
  tone?: 'brand' | 'success' | 'accent'
  showLabel?: boolean
  height?: number
  label?: string
}) {
  const reduce = useReducedMotion()
  const clamped = Math.max(0, Math.min(100, value))
  const fill =
    tone === 'success'
      ? 'var(--color-success-500)'
      : tone === 'accent'
        ? 'var(--color-accent-500)'
        : 'var(--color-brand-500)'

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-baseline justify-between text-xs">
          <span className="text-ink-3">{label}</span>
          {showLabel && <span className="font-semibold tabular-nums text-ink-2">{Math.round(clamped)}%</span>}
        </div>
      )}
      <div
        className="w-full overflow-hidden rounded-full bg-sunken"
        style={{ height }}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: fill }}
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

export function MasteryRing({
  value,
  size = 64,
  stroke = 6,
  color = 'var(--color-brand-500)',
  children,
  ariaLabel,
}: {
  value: number
  size?: number
  stroke?: number
  color?: string
  children?: React.ReactNode
  ariaLabel?: string
}) {
  const reduce = useReducedMotion()
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(100, value))

  return (
    <div
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={ariaLabel ?? `${Math.round(clamped)} percent mastery`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--surface-sunken)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (clamped / 100) * c }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
