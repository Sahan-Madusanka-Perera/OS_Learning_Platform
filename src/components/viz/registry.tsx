import { lazy, Suspense, type ComponentType } from 'react'

/* Visualisations are looked up by id from lesson content, and each is
   code-split — a student reading lesson 1 never downloads the paging
   simulator. */

/* Every visualisation takes optional, content-authored props, so a
   single permissive signature covers the whole registry. */
type VizComponent = ComponentType<Record<string, unknown>>

const load = (fn: () => Promise<{ default: ComponentType<never> }>) =>
  lazy(fn as () => Promise<{ default: VizComponent }>) as VizComponent

export const VIZ: Record<string, VizComponent> = {
  bootSequence: load(() =>
    import('./BootSequence').then((m) => ({ default: m.BootSequence })),
  ),
  systemLayers: load(() => import('./Misc').then((m) => ({ default: m.SystemLayers }))),
  evolutionTimeline: load(() =>
    import('./Evolution').then((m) => ({ default: m.EvolutionTimeline })),
  ),
  multitasking: load(() => import('./Misc').then((m) => ({ default: m.MultitaskingIllusion }))),
  interfaceComparison: load(() =>
    import('./Misc').then((m) => ({ default: m.InterfaceComparison })),
  ),
  fileTypes: load(() => import('./Misc').then((m) => ({ default: m.FileTypeExplorer }))),
  directoryTree: load(() =>
    import('./Structures').then((m) => ({ default: m.DirectoryTreeExplorer })),
  ),
  directoryStructures: load(() =>
    import('./Structures').then((m) => ({ default: m.DirectoryStructures })),
  ),
  memoryLayout: load(() =>
    import('./Structures').then((m) => ({ default: m.MemoryLayoutDiagram })),
  ),
  internalFragmentation: load(() =>
    import('./Fragmentation').then((m) => ({ default: m.InternalFragmentationDemo })),
  ),
  defragmentation: load(() =>
    import('./Fragmentation').then((m) => ({ default: m.DefragmentationDemo })),
  ),
  diskAllocation: load(() =>
    import('./DiskAllocation').then((m) => ({ default: m.DiskAllocationLab })),
  ),
  fatChain: load(() => import('./FatChain').then((m) => ({ default: m.FatChainExplorer }))),
  processStates: load(() =>
    import('./ProcessStates').then((m) => ({ default: m.ProcessStateMachine })),
  ),
  contextSwitch: load(() =>
    import('./DeviceMemory').then((m) => ({ default: m.ContextSwitchDemo })),
  ),
  interrupts: load(() => import('./Misc').then((m) => ({ default: m.InterruptExplorer }))),
  scheduler: load(() => import('./SchedulerLab').then((m) => ({ default: m.SchedulerLab }))),
  addressTranslation: load(() =>
    import('./PagingLab').then((m) => ({ default: m.AddressTranslationLab })),
  ),
  memoryCalculator: load(() =>
    import('./PagingLab').then((m) => ({ default: m.MemoryCalculator })),
  ),
  spooling: load(() => import('./DeviceMemory').then((m) => ({ default: m.SpoolingDemo }))),
}

export function VizSlot({ id, props }: { id: string; props?: Record<string, unknown> }) {
  const Component = VIZ[id]

  if (!Component) {
    return (
      <div className="rounded-xl border border-dashed border-line-strong bg-sunken p-6 text-center">
        <p className="text-base text-ink-3">This interactive is unavailable.</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<VizSkeleton />}>
      {/* Props come from typed content authored in this repo, not user input. */}
      <Component {...(props ?? {})} />
    </Suspense>
  )
}

function VizSkeleton() {
  return (
    <div
      className="animate-pulse rounded-xl border border-line bg-sunken/60 p-6 motion-reduce:animate-none"
      role="status"
      aria-label="Loading interactive"
    >
      <div className="h-3 w-1/3 rounded bg-line-strong/50" />
      <div className="mt-4 h-24 rounded bg-line-strong/30" />
      <div className="mt-3 h-3 w-2/3 rounded bg-line-strong/40" />
    </div>
  )
}
