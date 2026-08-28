import type { SVGProps } from 'react'

/* ============================================================
   Icon system
   ------------------------------------------------------------
   One drawn set, one geometry: 24×24 box, 1.5 stroke, round caps
   and joins, currentColor throughout. Everything optical lives on
   the same grid so icons sit together at any size without one
   looking heavier than its neighbour.

   Sizes are capped at the low end because this product is used on
   shared low-end screens and projected in classrooms — a 12px icon
   that reads on a laptop disappears from the back of a room.
   ============================================================ */

export type IconName = keyof typeof PATHS

const PATHS = {
  /* --- wayfinding --- */
  dashboard: <><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></>,
  path: <><circle cx="6" cy="5" r="2.25" /><circle cx="6" cy="19" r="2.25" /><circle cx="18" cy="12" r="2.25" /><path d="M6 7.25v9.5M8.25 5H14a2 2 0 012 2v2.9M8.25 19H14a2 2 0 002-2v-2.75" /></>,
  review: <><path d="M20.5 12a8.5 8.5 0 11-2.6-6.1" /><path d="M20.5 3.5V9h-5.4" /></>,
  practice: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" /></>,
  exam: <><circle cx="12" cy="9" r="5.5" /><path d="M8.4 13.6L7 21.5l5-2.6 5 2.6-1.4-7.9" /></>,
  glossary: <><path d="M4 5.5A2.5 2.5 0 016.5 3H19v14.5H6.5A2.5 2.5 0 004 20z" /><path d="M4 17.5A2.5 2.5 0 016.5 15H19" /><path d="M8.5 7.5h6" /></>,
  notes: <><path d="M16.5 3.6l3.9 3.9L8.9 19H5v-3.9z" /><path d="M14.2 5.9l3.9 3.9" /></>,

  /* --- module identities --- */
  layers: <><path d="M12 2.8l9 4.7-9 4.7-9-4.7z" /><path d="M3.5 12.2l8.5 4.4 8.5-4.4" /><path d="M3.5 16.9l8.5 4.4 8.5-4.4" /></>,
  gear: <><circle cx="12" cy="12" r="3.1" /><path d="M19.4 14.5a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.56V21a2 2 0 11-4 0v-.11a1.7 1.7 0 00-1.1-1.56 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.56-1H3a2 2 0 110-4h.11a1.7 1.7 0 001.56-1.1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H9a1.7 1.7 0 001-1.56V3a2 2 0 114 0v.11a1.7 1.7 0 001 1.56 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V9a1.7 1.7 0 001.56 1H21a2 2 0 110 4h-.11a1.7 1.7 0 00-1.56 1z" /></>,
  folder: <><path d="M3.5 7.2A2.2 2.2 0 015.7 5h3.1l2.2 2.6h7.3a2.2 2.2 0 012.2 2.2v7.9a2.2 2.2 0 01-2.2 2.2H5.7a2.2 2.2 0 01-2.2-2.2z" /></>,
  disk: <><ellipse cx="12" cy="6" rx="7.8" ry="3.2" /><path d="M4.2 6v12c0 1.77 3.49 3.2 7.8 3.2s7.8-1.43 7.8-3.2V6" /><path d="M4.2 12c0 1.77 3.49 3.2 7.8 3.2s7.8-1.43 7.8-3.2" /></>,
  cpu: <><rect x="7" y="7" width="10" height="10" rx="1.6" /><rect x="3.5" y="3.5" width="17" height="17" rx="2.4" /><path d="M9.5 1.5v2M14.5 1.5v2M9.5 20.5v2M14.5 20.5v2M1.5 9.5h2M1.5 14.5h2M20.5 9.5h2M20.5 14.5h2" /></>,
  memory: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><path d="M6.5 10v4M10 10v4M14 10v4M17.5 10v4" /></>,
  plug: <><path d="M8.5 2.5v6M15.5 2.5v6" /><path d="M5.5 8.5h13v3a6.5 6.5 0 01-6.5 6.5A6.5 6.5 0 015.5 11.5z" /><path d="M12 18v3.5" /></>,

  /* --- pedagogical block markers --- */
  keyIdea: <><path d="M9 18h6" /><path d="M10 21.5h4" /><path d="M12 2.5a6.5 6.5 0 00-3.8 11.8c.5.36.8.94.8 1.55V16h6v-.15c0-.61.3-1.19.8-1.55A6.5 6.5 0 0012 2.5z" /></>,
  analogy: <><circle cx="7" cy="7" r="4" /><rect x="13.5" y="13.5" width="8" height="8" rx="1.6" /><path d="M10.4 9.6l3.2 3.2" /></>,
  misconception: <><path d="M12 3.2L21.4 19.5H2.6z" /><path d="M12 9.5v4.2M12 16.8v.1" /></>,
  examTip: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4" /><path d="M12 3.5V1M12 23v-2.5M20.5 12H23M1 12h2.5" /></>,
  recall: <><path d="M9.5 3.5a3.5 3.5 0 00-3.4 4.3A3.5 3.5 0 004.5 14a3.5 3.5 0 003 3.46A3 3 0 0012 20V4.5a2.5 2.5 0 00-2.5-1z" /><path d="M14.5 3.5a3.5 3.5 0 013.4 4.3A3.5 3.5 0 0119.5 14a3.5 3.5 0 01-3 3.46A3 3 0 0112 20" /></>,
  teachBack: <><path d="M20.5 12.5a7.5 7.5 0 01-8.1 7.48L6 21.5l1.6-4.4A7.5 7.5 0 1120.5 12.5z" /><path d="M9 11h6M9 14h4" /></>,
  confused: <><circle cx="12" cy="12" r="9" /><path d="M9.4 9.2a2.7 2.7 0 015.25.9c0 1.8-2.65 2.7-2.65 2.7" /><path d="M12 16.8v.1" /></>,
  lab: <><path d="M9.5 2.5v6.1L4.2 18a2 2 0 001.73 3h12.14a2 2 0 001.73-3L14.5 8.6V2.5" /><path d="M8.2 2.5h7.6" /><path d="M6.7 14.5h10.6" /></>,

  /* --- callout tones --- */
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5.5" /><path d="M12 7.6v.1" /></>,
  warn: <><path d="M12 3.2L21.4 19.5H2.6z" /><path d="M12 9.5v4.2M12 16.8v.1" /></>,
  success: <><circle cx="12" cy="12" r="9" /><path d="M8.2 12.4l2.6 2.6 5-5.4" /></>,
  note: <><path d="M9 3.5h6l-.6 6.2 3.4 3.4H6.2l3.4-3.4z" /><path d="M12 13.1v7.4" /></>,
  danger: <><circle cx="12" cy="12" r="9" /><path d="M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6" /></>,

  /* --- actions & controls --- */
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="M15.8 15.8L21 21" /></>,
  close: <><path d="M6 6l12 12M18 6L6 18" /></>,
  menu: <><path d="M3.5 7h17M3.5 12h17M3.5 17h17" /></>,
  chevronRight: <><path d="M9.5 5l7 7-7 7" /></>,
  chevronDown: <><path d="M5 9.5l7 7 7-7" /></>,
  arrowRight: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
  arrowLeft: <><path d="M20 12H4M10 6l-6 6 6 6" /></>,
  arrowUp: <><path d="M12 20V4M6 10l6-6 6 6" /></>,
  arrowDown: <><path d="M12 4v16M6 14l6 6 6-6" /></>,
  check: <><path d="M4.5 12.5l5 5 10-11" /></>,
  cross: <><path d="M6 6l12 12M18 6L6 18" /></>,
  plus: <><path d="M12 4.5v15M4.5 12h15" /></>,
  minus: <><path d="M4.5 12h15" /></>,
  bookmark: <><path d="M6 3.8h12a1 1 0 011 1v16.4l-7-4.2-7 4.2V4.8a1 1 0 011-1z" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 6.8V12l3.4 2" /></>,
  trash: <><path d="M4 6.5h16" /><path d="M9.5 6.5V4.2h5v2.3" /><path d="M6.5 6.5l.9 13a1.6 1.6 0 001.6 1.5h6a1.6 1.6 0 001.6-1.5l.9-13" /></>,
  play: <><path d="M7 4.7l12 7.3-12 7.3z" /></>,
  pause: <><path d="M9 4.5v15M15 4.5v15" /></>,
  reset: <><path d="M3.5 12a8.5 8.5 0 102.6-6.1" /><path d="M3.5 3.5V9h5.4" /></>,
  hint: <><path d="M12 2.8a6.2 6.2 0 00-3.6 11.3c.5.35.8.92.8 1.53V16h5.6v-.37c0-.61.3-1.18.8-1.53A6.2 6.2 0 0012 2.8z" /><path d="M9.8 19h4.4M10.6 21.6h2.8" /></>,
  sun: <><circle cx="12" cy="12" r="4.2" /><path d="M12 1.8v2.4M12 19.8v2.4M22.2 12h-2.4M4.2 12H1.8M19.2 4.8l-1.7 1.7M6.5 17.5l-1.7 1.7M19.2 19.2l-1.7-1.7M6.5 6.5L4.8 4.8" /></>,
  moon: <><path d="M20.5 13.4A8.7 8.7 0 019.6 3.4a8.7 8.7 0 1010.9 10z" /></>,
  monitor: <><rect x="2.5" y="4" width="19" height="12.5" rx="2" /><path d="M8.5 20.5h7M12 16.5v4" /></>,

  /* --- state & outcome --- */
  graduation: <><path d="M2.5 8.5L12 4l9.5 4.5L12 13z" /><path d="M6.5 10.5v5.2c0 1.8 2.46 3.3 5.5 3.3s5.5-1.5 5.5-3.3v-5.2" /><path d="M21.5 8.5v6" /></>,
  trending: <><path d="M3 17l6-6 4 4 8-8.5" /><path d="M15.5 6.5H21v5.5" /></>,
  sprout: <><path d="M12 21v-8.5" /><path d="M12 12.5C12 8.9 9.1 6 5.5 6c0 3.6 2.9 6.5 6.5 6.5z" /><path d="M12 12.5c0-2.9 2.4-5.3 5.3-5.3 0 2.9-2.4 5.3-5.3 5.3z" /></>,
  books: <><path d="M4 4.5h4.5v15H4z" /><path d="M8.5 4.5H13v15H8.5z" /><path d="M14.4 5.6l4.3 1.1-3.8 14.5-4.3-1.1z" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="M15.4 8.6l-1.9 5.5-5.5 1.9 1.9-5.5z" /></>,
  wrench: <><path d="M15.2 3.4a5.5 5.5 0 00-5.9 8.9L3 18.6 5.4 21l6.3-6.3a5.5 5.5 0 008.9-5.9l-3.3 3.3-3.4-.6-.6-3.4z" /></>,
  flame: <><path d="M12 21.5c3.6 0 6.5-2.7 6.5-6.1 0-4.7-4.3-6.6-3.6-11.4-2.6.5-5.4 3.4-5.4 6.6 0 1.4.5 2.3.5 2.3s-1.6-.6-2.2-2.3c-1.5 1.5-2.3 3.3-2.3 4.8 0 3.4 2.9 6.1 6.5 6.1z" /></>,
  target: <><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.8" /><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" /></>,
  file: <><path d="M13.5 3.5H7a2 2 0 00-2 2v13a2 2 0 002 2h10a2 2 0 002-2V9z" /><path d="M13.5 3.5V9H19" /></>,
  lock: <><rect x="4.5" y="10.5" width="15" height="10.5" rx="2" /><path d="M8 10.5V7.5a4 4 0 018 0v3" /></>,

  /* --- file kinds --- */
  chart: <><rect x="3" y="3" width="18" height="18" rx="2.2" /><path d="M3 9.5h18M9.5 9.5V21M3 15.2h18" /></>,
  presentation: <><rect x="2.5" y="3.5" width="19" height="12" rx="2" /><path d="M12 15.5v3M8 21.5l4-3 4 3" /><path d="M7 11.5l3-3 2.4 2.4L17 6.6" /></>,
  image: <><rect x="3" y="3.5" width="18" height="17" rx="2.2" /><circle cx="8.6" cy="9.2" r="1.7" /><path d="M3.4 17l4.6-4.6 3.5 3.5 3.2-3.2 6 6" /></>,
  audio: <><path d="M9 18V5.2l11-2v12.6" /><circle cx="6.2" cy="18" r="2.8" /><circle cx="17.2" cy="15.8" r="2.8" /></>,
  video: <><rect x="2.5" y="5" width="14" height="14" rx="2.2" /><path d="M16.5 10l5-3v10l-5-3z" /></>,
  archive: <><rect x="2.5" y="4" width="19" height="5" rx="1.5" /><path d="M4.5 9v9.5a2 2 0 002 2h11a2 2 0 002-2V9" /><path d="M10 13h4" /></>,
  code: <><path d="M9 17l-5-5 5-5M15 7l5 5-5 5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3.2 9.5h17.6M3.2 14.5h17.6" /><path d="M12 3a15 15 0 000 18 15 15 0 000-18z" /></>,
  terminal: <><rect x="2.5" y="4" width="19" height="16" rx="2.2" /><path d="M6.5 9.5l3 2.5-3 2.5M12.5 15h5" /></>,
} as const

interface Props extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /** Rendered size in px. Floor of 14 keeps icons legible when projected. */
  size?: number
  /** Only set true when the icon is the sole carrier of meaning. */
  label?: string
}

export function Icon({ name, size = 18, label, className, ...rest }: Props) {
  const glyph = PATHS[name]
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      {...rest}
    >
      {glyph}
    </svg>
  )
}

/** Module id → icon, so the identity is drawn rather than pictographic. */
export const MODULE_ICON: Record<string, IconName> = {
  m1: 'layers',
  m2: 'gear',
  m3: 'folder',
  m4: 'disk',
  m5: 'cpu',
  m6: 'memory',
  m7: 'plug',
}
