import { useEffect, useRef, useState, type HTMLAttributes } from 'react'
import { cx } from '@/lib/utils'

/* A horizontal strip (tabs, the A–Z index) that scrolls when it has to.
   The scrollbar is hidden; instead each edge fades out only while there
   is more content past it, so the strip looks finished when everything
   fits and still says "there is more" when it does not. */
export function ScrollStrip({ className, style, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ left: false, right: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () =>
      setEdges({
        left: el.scrollLeft > 2,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2,
      })
    el.addEventListener('scroll', update, { passive: true })
    // Fires once on observe, which also covers the initial measurement.
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [])

  const mask = `linear-gradient(to right, ${edges.left ? 'transparent' : '#000'}, #000 2.5rem, #000 calc(100% - 2.5rem), ${edges.right ? 'transparent' : '#000'})`

  return (
    <div
      ref={ref}
      className={cx('scroll-x no-scrollbar', className)}
      style={{ ...style, maskImage: mask, WebkitMaskImage: mask }}
      {...rest}
    >
      {children}
    </div>
  )
}
