import { useEffect, useRef, useState } from 'react'
import { BrandMark } from '@/components/ui/BrandMark'
import { Icon, type IconName } from '@/components/ui/Icon'
import { cx } from '@/lib/utils'

const CREATOR = 'Sahan Perera'
const LINKS: { href: string; label: string; handle: string; icon: IconName }[] = [
  {
    href: 'https://github.com/Sahan-Madusanka-Perera',
    label: 'GitHub',
    handle: 'Sahan-Madusanka-Perera',
    icon: 'github',
  },
  {
    href: 'https://www.instagram.com/sahan._perera/',
    label: 'Instagram',
    handle: '@sahan._perera',
    icon: 'instagram',
  },
]

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-20 w-full max-w-5xl border-t border-line pb-8 pt-8">
      <div className="flex flex-col gap-7 md:flex-row md:items-start md:justify-between">
        <div className="flex max-w-sm items-start gap-3">
          <BrandMark size={36} className="shrink-0" />
          <div>
            <p className="text-sm font-semibold text-ink">Operating Systems</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink-3">
              A free, interactive course for G.C.E. A/L ICT, Competency 5. No sign-up: your
              progress stays on this device.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <p className="group inline-flex items-center gap-1.5 text-sm text-ink-2">
            Made with
            <Icon
              name="heart"
              size={16}
              fill="currentColor"
              label="love"
              className="heart-beat text-danger-500"
            />
            by <span className="font-semibold text-ink">{CREATOR}</span>
          </p>
          <ul className="flex flex-wrap gap-2" aria-label={`${CREATOR} online`}>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${l.label}: ${l.handle} (opens in a new tab)`}
                  className="inline-flex min-h-[38px] items-center gap-2 rounded-full border border-line bg-card px-3.5 text-xs font-medium text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
                >
                  <Icon name={l.icon} size={16} />
                  {l.handle}
                </a>
              </li>
            ))}
            <li>
              <ShareButton />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

/* Phones get the native share sheet (WhatsApp, Instagram, Messenger…),
   which is how this course actually spreads. Anywhere without it, the
   link is copied instead and the button says so. */
function ShareButton() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const share = async () => {
    const url = `${window.location.origin}/`
    const data = {
      title: 'Operating Systems · A/L ICT',
      text: 'A free interactive Operating Systems course for A/L ICT: lessons, simulations and exam practice.',
      url,
    }
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(data)
      } catch {
        /* the reader closed the share sheet; nothing to do */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Older browsers and non-secure contexts: the legacy copy path.
      const field = document.createElement('textarea')
      field.value = url
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cx(
        'inline-flex min-h-[38px] items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition-colors',
        copied
          ? 'border-success-300 bg-success-50 text-success-800 dark:border-success-800 dark:bg-success-950/50 dark:text-success-300'
          : 'border-brand-200 bg-brand-50 text-brand-700 hover:border-brand-300 dark:border-brand-800/70 dark:bg-brand-950/50 dark:text-brand-300',
      )}
    >
      <Icon name={copied ? 'check' : 'share'} size={16} />
      <span aria-live="polite">{copied ? 'Link copied' : 'Share the course'}</span>
    </button>
  )
}
