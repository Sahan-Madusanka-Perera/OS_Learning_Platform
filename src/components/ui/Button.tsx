import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cx } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'success' | 'danger' | 'accent'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm ' +
    'disabled:bg-sunken disabled:text-ink-3 disabled:shadow-none',
  accent:
    'bg-accent-500 text-accent-950 hover:bg-accent-400 active:bg-accent-600 shadow-sm font-semibold ' +
    'disabled:bg-sunken disabled:text-ink-3 disabled:shadow-none',
  secondary:
    'bg-card text-ink border border-line-strong hover:bg-sunken active:bg-sunken',
  ghost: 'text-ink-2 hover:bg-sunken hover:text-ink',
  success:
    'bg-success-600 text-white hover:bg-success-700 shadow-sm ' +
    'disabled:bg-sunken disabled:text-ink-3 disabled:shadow-none',
  danger:
    'bg-danger-600 text-white hover:bg-danger-700 shadow-sm ' +
    'disabled:bg-sunken disabled:text-ink-3 disabled:shadow-none',
}

const SIZES: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5 min-h-[36px]',
  md: 'text-sm px-4 py-2.5 gap-2 min-h-[42px]',
  lg: 'text-base px-6 py-3 gap-2.5 min-h-[50px]',
}

const BASE =
  'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 ' +
  'disabled:cursor-not-allowed select-none whitespace-nowrap ' +
  'active:scale-[0.985] motion-reduce:active:scale-100'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  to?: string
  full?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  to,
  full,
  className,
  children,
  ...rest
}: Props) {
  const cls = cx(BASE, VARIANTS[variant], SIZES[size], full && 'w-full', className)
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
