import { useReveal } from '../hooks/useReveal.js'
import { useTilt } from '../hooks/useTilt.js'
import EvidenceFrame from './EvidenceFrame.jsx'

/* Product-themed line icons (24×24, inherit color via currentColor). */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const ICONS = {
  verify: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="13" rx="2.5" {...S} />
      <path d="M3 9h18" {...S} />
      <path d="M8.5 14.5l2.2 2.2 4.3-4.6" {...S} />
    </svg>
  ),
  contam: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M12 3.5 21 19H3z" {...S} />
      <path d="M12 10v4" {...S} />
      <circle cx="12" cy="16.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  missed: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.6 12 21 12 21Z" {...S} />
      <path d="M12 8.2v3.2M12 14.1v.05" {...S} />
    </svg>
  ),
  sync: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M4.5 9a7.5 7.5 0 0 1 12.6-3.1L20 8.5" {...S} />
      <path d="M20 4.5v4h-4" {...S} />
      <path d="M19.5 15a7.5 7.5 0 0 1-12.6 3.1L4 15.5" {...S} />
      <path d="M4 19.5v-4h4" {...S} />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d="M4 8.5h3l1.4-2h7.2L17 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" {...S} />
      <circle cx="12" cy="13.2" r="3.2" {...S} />
    </svg>
  ),
}

const CAPS = [
  {
    icon: 'verify',
    title: 'AI pickup confirmation',
    body: 'Every stop becomes a verified service event — timestamped, geotagged, and backed by ZenCam footage. Disputes end with a frame, not an argument.',
    meta: [{ k: 'Verified in pilot', v: '98%' }, { k: 'Every event', v: 'Timestamped' }],
    wide: true,
  },
  {
    icon: 'contam',
    title: 'Contamination detection',
    body: 'Catch cardboard in organics at the curb, not the tip floor — each flag scored so your team acts on certainty, not noise.',
    meta: [{ k: 'Confidence-scored', v: 'Yes' }],
  },
  {
    icon: 'missed',
    title: 'Missed-stop alerts',
    body: 'Exceptions reach dispatch in minutes — while the truck is still close enough to turn around.',
    meta: [{ k: 'Surface time', v: '<3m' }],
  },
  {
    icon: 'sync',
    title: 'Customer-ready service evidence',
    body: 'Verified service events, timestamps, and available ZenCam footage help your CS team answer “was I serviced?” with confidence — not guesswork.',
    meta: [{ k: 'Backed by', v: 'Footage' }],
  },
  {
    icon: 'camera',
    title: 'Powered by ZenCam',
    body: 'ZenCam captures visual evidence at the curb. ZenduWaste turns that evidence into verified service events, contamination insights, and actionable route exceptions.',
    meta: [{ k: 'Added devices', v: '0' }],
  },
]

function Card({ cap, index }) {
  const tilt = useTilt()
  return (
    <article
      ref={tilt}
      className={`cap-card${cap.wide ? ' wide' : ''}`}
      data-reveal
      style={{ '--i': index % 2 }}
    >
      <div className="cap-main">
        <div className="cap-icon" aria-hidden="true">{ICONS[cap.icon]}</div>
        <h3>{cap.title}</h3>
        <p>{cap.body}</p>
        <div className="cap-meta">
          {cap.meta.map((m) => (
            <div className="k" key={m.k}>
              <b className="mono">{m.v}</b>
              {m.k}
            </div>
          ))}
        </div>
      </div>

      {cap.wide && (
        <div className="cap-demo" aria-hidden="true">
          <EvidenceFrame scene="detect" analyzing meta="ZenCam · Rt 14 · Stop 86" label="cart · 0.98" className="cap-demo-frame" />
          <div className="cap-demo-row">
            <span className="tag tag-ok">Verified</span>
            <span className="rt">
              <strong>Cart serviced</strong>
              <span className="conf"><span className="conf-bar"><i style={{ transform: 'scaleX(0.98)' }} /></span><b>98%</b> confidence</span>
            </span>
            <span className="rtime mono">08:39</span>
          </div>
        </div>
      )}
    </article>
  )
}

export default function Capabilities() {
  const ref = useReveal()
  return (
    <section className="section caps" id="capabilities" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">The platform</span>
          <h2 className="section-title">Five ways ZenduWaste earns its place on every route.</h2>
          <p className="section-lead">
            One AI layer, purpose-built for waste — not a generic telematics dashboard
            with a waste label bolted on.
          </p>
        </div>
        <div className="cap-grid">
          {CAPS.map((cap, i) => (
            <Card key={cap.title} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
