import { useReveal } from '../hooks/useReveal.js'

const COLS = ['ZenduWaste', 'Samsara', 'Geotab', 'Routeware']

// y = yes, n = no, p = partial
const ROWS = [
  ['AI pickup verification per stop', ['y', 'n', 'n', 'p']],
  ['Contamination detection + scoring', ['y', 'n', 'n', 'n']],
  ['Works on existing truck cameras', ['y', 'p', 'n', 'n']],
  ['Waste-specific exception dispatch', ['y', 'n', 'n', 'p']],
  ['Proof-of-service to the resident', ['y', 'n', 'n', 'p']],
  ['No new hardware / zero capex', ['y', 'n', 'n', 'p']],
]

function Mark({ v }) {
  if (v === 'y') return <span className="ck" aria-label="Yes">✓</span>
  if (v === 'p') return <span className="partial" aria-label="Partial">partial</span>
  return <span className="no" aria-label="No">—</span>
}

export default function Comparison() {
  const ref = useReveal()
  return (
    <section className="section cmp" id="compare" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <span className="eyebrow">Why not the incumbents</span>
          <h2 className="section-title">Telematics tells you where the truck went. We tell you what it did.</h2>
          <p className="section-lead">
            Samsara, Geotab, and Routeware are built for generic fleets. ZenduWaste is
            built for the one question waste operators actually get called about:
            was the stop serviced?
          </p>
        </div>

        <div className="cmp-wrap" data-reveal>
          <div className="cmp-grid">
            <div className="cmp-cell cmp-head cmp-feature">Capability</div>
            {COLS.map((c, i) => (
              <div key={c} className={`cmp-cell cmp-head${i === 0 ? ' us' : ''}`}>{c}</div>
            ))}

            {ROWS.map(([feature, marks]) => (
              <Row key={feature} feature={feature} marks={marks} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Row({ feature, marks }) {
  return (
    <>
      <div className="cmp-cell cmp-feature">{feature}</div>
      {marks.map((m, i) => (
        <div key={i} className={`cmp-cell${i === 0 ? ' cmp-col-us' : ''}`}>
          <Mark v={m} />
        </div>
      ))}
    </>
  )
}
