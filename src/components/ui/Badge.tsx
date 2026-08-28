import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'

type Tone = 'neutral' | 'brand' | 'success' | 'warn' | 'danger' | 'accent'

const TONES: Record<Tone, string> = {
  neutral: 'bg-sunken text-ink-2 border-line',
  brand: 'bg-brand-50 text-brand-700 border-brand-200 dark:bg-brand-950 dark:text-brand-200 dark:border-brand-800',
  success:
    'bg-success-50 text-success-700 border-success-100 dark:bg-success-900/35 dark:text-success-300 dark:border-success-700/50',
  warn: 'bg-warn-50 text-warn-700 border-warn-100 dark:bg-warn-900/35 dark:text-warn-300 dark:border-warn-700/50',
  danger:
    'bg-danger-50 text-danger-700 border-danger-100 dark:bg-danger-900/35 dark:text-danger-300 dark:border-danger-700/50',
  accent:
    'bg-accent-50 text-accent-800 border-accent-200 dark:bg-accent-900/35 dark:text-accent-200 dark:border-accent-700/50',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-2xs font-medium leading-5',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
