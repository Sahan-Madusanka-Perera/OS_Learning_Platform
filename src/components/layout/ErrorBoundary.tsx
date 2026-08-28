import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'

/* Students must never see a stack trace. If something goes wrong, they get
   a calm explanation, a way to recover, and the reassurance that their
   progress is safe — because it lives in localStorage, not in React state. */

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Unhandled error:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="grid min-h-dvh place-items-center bg-page px-6 text-center">
        <div className="max-w-md">
          <Icon name="wrench" size={38} className="mx-auto mb-4 text-ink-3" />
          <h1 className="text-xl font-semibold tracking-tight text-ink">Something went wrong</h1>
          <p className="mt-2 text-md leading-relaxed text-ink-2">
            An unexpected problem stopped this page from loading. Your progress is saved on this
            device and has not been affected.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700"
            >
              Reload the page
            </button>
            <a
              href="/"
              className="rounded-xl border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-sunken"
            >
              Back to dashboard
            </a>
          </div>
        </div>
      </div>
    )
  }
}
