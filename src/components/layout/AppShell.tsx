import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cx } from '@/lib/utils'
import { TOTAL_LESSONS, modules } from '@/content/course'
import { useCourseOverview } from '@/hooks/useMastery'
import { useProgress } from '@/store/progress'
import { dueItems } from '@/lib/srs'
import { MasteryRing } from '@/components/ui/Progress'
import { Icon, MODULE_ICON, type IconName } from '@/components/ui/Icon'
import { SearchPanel } from './SearchPanel'
import { ThemeToggle } from './ThemeToggle'

const NAV: { to: string; label: string; icon: IconName; end?: boolean }[] = [
  { to: '/', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '/path', label: 'Learning path', icon: 'path' },
  { to: '/review', label: 'Review', icon: 'review' },
  { to: '/practice', label: 'Practice', icon: 'practice' },
  { to: '/exam', label: 'Exam prep', icon: 'exam' },
  { to: '/glossary', label: 'Glossary', icon: 'glossary' },
  { to: '/notes', label: 'Notes', icon: 'notes' },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()
  const reduce = useReducedMotion()
  const overview = useCourseOverview()
  const reviews = useProgress((s) => s.reviews)
  const dueCount = dueItems(Object.values(reviews)).length

  // Close the mobile drawer on navigation.
  useEffect(() => setNavOpen(false), [location.pathname])

  // Cmd/Ctrl+K opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-dvh">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* ---------- Top bar ---------- */}
      <header className="sticky top-0 z-30 border-b border-line bg-card/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[100rem] items-center gap-3 px-3 sm:px-5">
          <button
            type="button"
            onClick={() => setNavOpen((v) => !v)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            className="-ml-1 rounded-lg p-2 text-ink-2 transition hover:bg-sunken hover:text-ink lg:hidden"
          >
            <Icon name={navOpen ? 'close' : 'menu'} size={20} />
          </button>

          <Link to="/" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-md font-bold text-white"
            >
              OS
            </span>
            <span className="hidden sm:block">
              <span className="block text-base font-semibold leading-tight tracking-tight text-ink">
                Operating Systems
              </span>
              <span className="block text-2xs leading-tight text-ink-3">
                A/L ICT · Competency 5
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex items-center gap-2 rounded-xl border border-line bg-sunken px-3 py-1.5 text-sm text-ink-3 transition hover:border-line-strong hover:text-ink-2 sm:w-64"
          >
            <Icon name="search" size={16} />
            <span className="hidden sm:inline">Search the course…</span>
            <kbd className="ml-auto hidden rounded border border-line bg-card px-1.5 py-0.5 font-mono text-2xs sm:block">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-[100rem]">
        {/* ---------- Sidebar (desktop) ---------- */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-line px-3 py-5 lg:block">
          <SidebarContent overview={overview} dueCount={dueCount} />
        </aside>

        {/* ---------- Sidebar (mobile drawer) ---------- */}
        <AnimatePresence>
          {navOpen && (
            <>
              <motion.div
                className="fixed inset-0 top-14 z-20 bg-slate-950/40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.16 }}
                onClick={() => setNavOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                className="fixed left-0 top-14 z-20 h-[calc(100dvh-3.5rem)] w-72 overflow-y-auto border-r border-line bg-card px-3 py-5 lg:hidden"
                initial={reduce ? { opacity: 0 } : { x: -288 }}
                animate={reduce ? { opacity: 1 } : { x: 0 }}
                exit={reduce ? { opacity: 0 } : { x: -288 }}
                transition={{ duration: reduce ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                aria-label="Course navigation"
              >
                <SidebarContent overview={overview} dueCount={dueCount} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ---------- Main ---------- */}
        <main id="main" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

function SidebarContent({
  overview,
  dueCount,
}: {
  overview: ReturnType<typeof useCourseOverview>
  dueCount: number
}) {
  return (
    <nav aria-label="Course sections">
      {/* Progress summary */}
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-line bg-sunken/60 p-3">
        <MasteryRing value={overview.overall} size={48} stroke={5}>
          <span className="text-xs font-bold tabular-nums text-ink">{overview.overall}%</span>
        </MasteryRing>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-ink">Course mastery</p>
          <p className="text-2xs text-ink-3">
            {overview.mastered.length} of {TOTAL_LESSONS} mastered
          </p>
        </div>
      </div>

      <ul className="space-y-0.5">
        {NAV.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx(
                  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300'
                    : 'text-ink-2 hover:bg-sunken hover:text-ink',
                )
              }
            >
              <Icon name={item.icon} size={17} className="shrink-0" />
              {item.label}
              {item.to === '/review' && dueCount > 0 && (
                <span className="ml-auto rounded-full bg-accent-500 px-1.5 py-0.5 text-2xs font-bold text-accent-950">
                  {dueCount}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <p className="mb-2 mt-6 px-3 text-2xs font-semibold uppercase tracking-[0.08em] text-ink-3">
        Modules
      </p>
      <ul className="space-y-0.5">
        {modules.map((m) => {
          const pct = overview.byModule[m.id] ?? 0
          return (
            <li key={m.id}>
              <NavLink
                to={`/module/${m.id}`}
                className={({ isActive }) =>
                  cx(
                    'block rounded-lg px-3 py-2 transition-colors',
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/70'
                      : 'hover:bg-sunken',
                  )
                }
              >
                <span className="flex items-center gap-2.5">
                  <Icon
                    name={MODULE_ICON[m.id] ?? 'layers'}
                    size={16}
                    className="shrink-0 text-ink-3"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-2">
                    {m.shortTitle}
                  </span>
                  <span className="shrink-0 font-mono text-2xs tabular-nums text-ink-3">
                    {pct}%
                  </span>
                </span>
                <span
                  className="mt-1.5 block h-1 overflow-hidden rounded-full bg-sunken"
                  aria-hidden="true"
                >
                  <span
                    className="block h-full rounded-full bg-brand-500 transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
