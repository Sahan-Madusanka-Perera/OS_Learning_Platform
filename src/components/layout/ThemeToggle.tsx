import { useEffect, useState } from 'react'
import { Icon } from '@/components/ui/Icon'

type Theme = 'light' | 'dark' | 'system'
const KEY = 'os-academy-theme'

function apply(theme: Theme) {
  const root = document.documentElement
  if (theme === 'system') root.removeAttribute('data-theme')
  else root.setAttribute('data-theme', theme)
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return (localStorage.getItem(KEY) as Theme) ?? 'system'
    } catch {
      return 'system'
    }
  })

  useEffect(() => {
    apply(theme)
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* private mode — the choice just won't persist */
    }
  }, [theme])

  const next: Theme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
  const label = theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Theme: ${label}. Switch to ${next}.`}
      title={`Theme: ${label}`}
      className="rounded-lg p-2 text-ink-2 transition hover:bg-sunken hover:text-ink"
    >
      <Icon name={theme === 'dark' ? 'moon' : theme === 'light' ? 'sun' : 'monitor'} size={18} />
    </button>
  )
}
