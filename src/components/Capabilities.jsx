import { useReveal } from '../hooks/useReveal.js'

/* Product-themed line icons (24×24, inherit color via currentColor). */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
const ICONS = {
  contam: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M12 3.5 21 19H3z" {...S} />
      <path d="M12 10v4" {...S} />
      <circle cx="12" cy="16.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  missed: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.6 12 21 12 21Z" {...S} />
      <path d="M12 8.2v3.2M12 14.1v.05" {...S} />
    </svg>
  ),
  sync: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M4.5 9a7.5 7.5 0 0 1 12.6-3.1L20 8.5" {...S} />
      <path d="M20 4.5v4h-4" {...S} />
      <path d="M19.5 15a7.5 7.5 0 0 1-12.6 3.1L4 15.5" {...S} />
      <path d="M4 19.5v-4h4" {...S} />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M4 8.5h3l1.4-2h7.2L17 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" {...S} />
      <circle cx="12" cy="13.2" r="3.2" {...S} />
    </svg>
  ),
}

const ROWS = [
  {
    icon: 'contam',
    title: 'Contamination detection',
    body: 'Catch cardboard in organics at the curb, not the tip floor — each flag scored so your team acts on certainty, not noise.',
    fact: { v: '91%', k: 'typical flag confidence' },
  },
  {
    icon: 'missed',
    title: 'Missed-stop alerts',
    body: 'Exceptions reach dispatch in minutes — while the truck is still close enough to turn around.',
    fact: { v: '<3 min', k: 'to dispatcher alert' },
  },
  {
    icon: 'sync',
    title: 'Customer portal + Soft-Pak sync',
    body: 'Service history, proof-of-service, and billing in one place. Your CS team answers "was I serviced?" in a single lookup.',
    fact: { v: '<10 s', k: 'CS lookup time' },
  },
  {
    icon: 'camera',
    title: 'Runs on your existing cameras',
    body: 'No retrofits, no install trucks, no capex. ZenduWaste layers onto the hardware already mounted on your fleet.',
    fact: { v: '0', k: 'new devices' },
  },
]

export default function Capabilities() {
  const ref = useReveal()
  return (
    <section className="section caps" id="capabilities" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <h2 className="section-title">Five ways ZenduWaste earns its place on every route.</h2>
          <p className="section-lead">
            One AI layer, purpose-built for waste — not a generic telematics dashboard
            with a waste label bolted on.
          </p>
        </div>

        {/* The lead capability gets the full treatment: claim + working proof. */}
        <div className="cap-lead" data-reveal>
          <div>
            <h3>AI pickup confirmation</h3>
            <p>
              Every stop becomes a verified service event — timestamped, geotagged, and
              backed by the frame. Disputes end with a screenshot, not an argument.
            </p>
            <div className="cap-lead-facts">
              <div className="k"><b>98%</b>auto-verified</div>
              <div className="k"><b>&lt;1 s</b>per stop</div>
            </div>
          </div>
          <div className="cap-demo" aria-hidden="true">
            <div className="evidence-frame cap-demo-frame">
              <span className="corner-tr" /><span className="corner-bl" />
              <span className="capture-line" />
              <span className="frame-meta"><span className="frame-rec" />ZenCam · Rt 14 · Stop 86</span>
            </div>
            <div className="cap-demo-row">
              <span className="tag tag-ok">Verified</span>
              <span className="rt">
                <strong>Cart serviced</strong>
                <span className="conf"><span className="conf-bar"><i style={{ transform: 'scaleX(0.98)' }} /></span><b>98%</b> confidence</span>
              </span>
              <span className="rtime mono">04:39</span>
            </div>
          </div>
        </div>

        <div className="cap-ledger">
          {ROWS.map((r, i) => (
            <article className="cap-row" key={r.title} data-reveal style={{ '--i': i }}>
              <div className="cap-ic" aria-hidden="true">{ICONS[r.icon]}</div>
              <div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
              <div className="cap-fact">
                <b>{r.fact.v}</b>
                <span>{r.fact.k}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
