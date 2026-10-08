import { useId } from 'react'

/* ============================================================
   The course mark
   ------------------------------------------------------------
   The operating system drawn the way the course teaches it: a
   shell wrapped around a kernel. The white ring is the OS layer
   between the user and the hardware (Module 1); the amber core
   is the kernel at its centre (Module 7). Read quickly, the ring
   is also a squared "O".

   The same geometry is exported as public/favicon.svg, so the
   tab icon, the share image and the header always match.
   ============================================================ */

export function BrandMark({
  size = 32,
  className,
  title,
}: {
  size?: number
  className?: string
  /** Only set when the mark is the sole carrier of meaning. */
  title?: string
}) {
  const id = `bm${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--color-brand-500)' }} />
          <stop offset="1" style={{ stopColor: 'var(--color-brand-700)' }} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <rect
        x="7.5"
        y="7.5"
        width="17"
        height="17"
        rx="4.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
      />
      <rect
        x="12.25"
        y="12.25"
        width="7.5"
        height="7.5"
        rx="2"
        style={{ fill: 'var(--color-accent-400)' }}
      />
    </svg>
  )
}
