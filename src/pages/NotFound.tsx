import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function NotFound({ what = 'page' }: { what?: string }) {
  return (
    <div className="mx-auto grid min-h-[50dvh] max-w-md place-items-center text-center">
      <div>
        <Icon name="compass" size={38} className="mx-auto mb-4 text-ink-3" />
        <h1 className="text-xl font-semibold tracking-tight text-ink">
          We couldn’t find that {what}
        </h1>
        <p className="mt-2 text-md leading-relaxed text-ink-2">
          The link may be out of date, or the {what} may have been renamed. Nothing is lost — your
          progress is saved.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button to="/">Back to dashboard</Button>
          <Button to="/path" variant="secondary">
            See the learning path
          </Button>
        </div>
      </div>
    </div>
  )
}
