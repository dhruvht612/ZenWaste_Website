import { useReveal } from '../hooks/useReveal.js'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const GLYPH = {
  cam: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M4 8.5h3l1.4-2h7.2L17 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" {...S} />
      <circle cx="12" cy="13.2" r="3" {...S} />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M5 6h14v9H14l-2 3-2-3H5z" {...S} />
      <path d="M9 10.5h6M9 12.8h4" {...S} />
    </svg>
  ),
  core: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" {...S} stroke="#fff" />
      <path d="M9.5 14.5v-5l2.5 3 2.5-3v5" {...S} stroke="#fff" />
    </svg>
  ),
  cc: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" {...S} />
      <rect x="13" y="4" width="7" height="7" rx="1.5" {...S} />
      <rect x="4" y="13" width="7" height="7" rx="1.5" {...S} />
      <path d="M16.5 14v3.5M14.8 15.8h3.4" {...S} />
    </svg>
  ),
  dispatch: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M20 5 4 11l6 2 2 6z" {...S} />
      <path d="M20 5 10 13" {...S} />
    </svg>
  ),
  evidence: (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" {...S} />
      <path d="M8.5 12.5l2 2 4-4.5" {...S} />
    </svg>
  ),
}

const FLOW = [
  { icon: 'cam', title: 'ZenCam', sub: 'Captures what happens at the curb' },
  { icon: 'ai', title: 'AI vision', sub: 'Understands the visual evidence' },
  { icon: 'core', title: 'ZenduWaste', sub: 'Creates operational intelligence', core: true },
  { icon: 'cc', title: 'Command Center', sub: 'Surfaces the exception' },
  { icon: 'dispatch', title: 'Dispatch', sub: 'Takes action on it' },
  { icon: 'evidence', title: 'Service evidence', sub: 'Supports resolution' },
]

export default function TrustBar() {
  const ref = useReveal()
  return (
    <section className="section eco" id="ecosystem" ref={ref}>
      <div className="container">
        <div className="section-head eco-head" data-reveal>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>The platform</span>
          <h2 className="section-title" style={{ margin: '0 auto' }}>
            From visual evidence to operational action.
          </h2>
          <p className="section-lead" style={{ margin: 'var(--s-4) auto 0' }}>
            ZenduWaste is not another disconnected dashboard. It’s the operational
            intelligence layer powered by ZenCam — turning what the camera sees into
            action your team can take.
          </p>
        </div>

        <div className="flow" data-reveal role="img"
          aria-label="Product flow: ZenCam captures what happens, AI vision understands the evidence, ZenduWaste creates operational intelligence, the Command Center surfaces the exception, Dispatch takes action, and service evidence supports resolution.">
          {FLOW.map((n, i) => (
            <div className="flow-item" key={n.title}>
              <div className={`flow-node${n.core ? ' is-core' : ''}`}>
                <span className="flow-ic">{GLYPH[n.icon]}</span>
                <strong>{n.title}</strong>
                <span className="flow-sub">{n.sub}</span>
              </div>
              {i < FLOW.length - 1 && (
                <span className="flow-link" aria-hidden="true"><span className="flow-travel" /></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
