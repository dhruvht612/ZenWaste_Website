import { useId } from 'react'

/* The ZenduWaste logomark: a "Z" drawn as a collection route — stroke with
 * rounded joins, a stop node where the route begins and ends — set on a
 * tile of the ZenduONE canvas gradient. */
export function Mark({ size = 30 }) {
  const id = useId()
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010658" />
          <stop offset="100%" stopColor="#050712" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id}-c)`} />
      <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="none" stroke="rgba(170,180,223,0.25)" />
      <path
        d="M10.5 10.5 H21.5 L10.5 21.5 H21.5"
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="10.5" r="2.4" fill="#67A7DA" />
      <circle cx="21.5" cy="21.5" r="2.4" fill="#67A7DA" />
    </svg>
  )
}

export function Brand({ href = '#top', markSize = 30 }) {
  return (
    <a className="brand" href={href} aria-label="ZenduWaste home">
      <Mark size={markSize} />
      Zendu<span className="brand-w">Waste</span>
    </a>
  )
}
