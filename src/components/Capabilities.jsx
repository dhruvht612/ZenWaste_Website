import { useReveal } from '../hooks/useReveal.js'
import { useTilt } from '../hooks/useTilt.js'

const CAPS = [
  {
    icon: '◉',
    title: 'AI pickup confirmation',
    body: 'Every stop becomes a verified service event — timestamped, geotagged, and backed by the frame. Disputes end with a screenshot, not an argument.',
    meta: [{ k: 'Auto-verified', v: '98%' }, { k: 'Per stop', v: '<1s' }],
    wide: true,
  },
  {
    icon: '⚠',
    title: 'Contamination detection',
    body: 'Catch cardboard in organics at the curb, not the tip floor — each flag scored so your team acts on certainty, not noise.',
    meta: [{ k: 'Confidence-scored', v: 'Yes' }],
  },
  {
    icon: '⌁',
    title: 'Missed-stop alerts',
    body: 'Exceptions reach dispatch in minutes — while the truck is still close enough to turn around.',
    meta: [{ k: 'Surface time', v: '<3m' }],
  },
  {
    icon: '⧉',
    title: 'Customer portal + Soft-Pak sync',
    body: 'Service history, proof-of-service, and billing in one place. Your CS team answers “was I serviced?” in a single lookup.',
    meta: [{ k: 'Lookup', v: 'Seconds' }],
  },
  {
    icon: '◫',
    title: 'Runs on your existing cameras',
    body: 'No retrofits, no install trucks, no capex. ZenduWaste layers onto the hardware already mounted on your fleet.',
    meta: [{ k: 'New devices', v: '0' }],
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
      <div className="cap-icon" aria-hidden="true">{cap.icon}</div>
      <h3>{cap.title}</h3>
      <p>{cap.body}</p>
      <div className="cap-meta">
        {cap.meta.map((m) => (
          <div className="k" key={m.k}>
            <b>{m.v}</b>
            {m.k}
          </div>
        ))}
      </div>
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
