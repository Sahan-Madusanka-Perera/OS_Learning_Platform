import type { ReactNode } from 'react'
import { cx } from '@/lib/utils'
import { Icon, type IconName } from './Icon'

type Tone = 'info' | 'warn' | 'success' | 'note' | 'danger'

const TONES: Record<Tone, { wrap: string; tint: string; icon: IconName }> = {
  info: {
    wrap: 'bg-brand-50/70 border-brand-200 dark:bg-brand-950/40 dark:border-brand-800/70',
    tint: 'text-brand-600 dark:text-brand-400',
    icon: 'info',
  },
  warn: {
    wrap: 'bg-warn-50/70 border-warn-300 dark:bg-warn-900/20 dark:border-warn-700/50',
    tint: 'text-warn-700 dark:text-warn-400',
    icon: 'warn',
  },
  success: {
    wrap: 'bg-success-50/70 border-success-300 dark:bg-success-900/20 dark:border-success-700/50',
    tint: 'text-success-700 dark:text-success-400',
    icon: 'success',
  },
  note: {
    wrap: 'bg-sunken border-line',
    tint: 'text-ink-3',
    icon: 'note',
  },
  danger: {
    wrap: 'bg-danger-50/70 border-danger-300 dark:bg-danger-900/20 dark:border-danger-700/50',
    tint: 'text-danger-600 dark:text-danger-400',
    icon: 'danger',
  },
}

export function Callout({
  tone = 'info',
  title,
  children,
  className,
}: {
  tone?: Tone
  title?: string
  children: ReactNode
  className?: string
}) {
  const t = TONES[tone]
  return (
    <div className={cx('rounded-xl border p-4 sm:p-5', t.wrap, className)}>
      <div className="flex gap-3.5">
        <Icon name={t.icon} size={19} className={cx('mt-0.5 shrink-0', t.tint)} />
        <div className="min-w-0 flex-1">
          {title && <p className="mb-1 font-semibold text-ink">{title}</p>}
          <div className="prose-lesson !text-base !leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  )
}
