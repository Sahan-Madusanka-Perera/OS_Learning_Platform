import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padded?: boolean
  interactive?: boolean
}

export function Card({ children, padded = true, interactive, className, ...rest }: CardProps) {
  return (
    <div
      className={cx(
        'card',
        padded && 'p-5 sm:p-6',
        interactive &&
          'transition-shadow transition-transform duration-200 hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cx('text-base font-semibold text-ink', className)}>{children}</h3>
}

export function SectionHeading({
  title,
  hint,
  action,
}: {
  title: string
  /** Sits below the heading, where supporting text belongs. */
  hint?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
        {hint && <p className="mt-1 text-sm text-ink-2">{hint}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
