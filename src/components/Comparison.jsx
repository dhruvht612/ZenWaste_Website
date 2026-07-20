import { useReveal } from '../hooks/useReveal.js'

const TELEMATICS = ['Where did the truck drive?', 'How fast was it going?', 'What was the route history?', 'Where are the GPS breadcrumbs?']
const ZENDU = ['Was the stop actually serviced?', 'Was the cart at the curb?', 'Was there contamination?', 'Is there footage to prove it?', 'Does dispatch need to act now?']

const COLS = ['ZenduWaste', 'Samsara', 'Geotab', 'Routeware']
// y = yes, n = no, p = partial
const ROWS = [
  ['AI pickup verification per stop', ['y', 'n', 'n', 'p']],
  ['Contamination detection + scoring', ['y', 'n', 'n', 'n']],
  ['Curbside AI camera vision (ZenCam)', ['y', 'n', 'n', 'n']],
  ['Waste-specific exception dispatch', ['y', 'n', 'n', 'p']],
  ['Proof-of-service backed by footage', ['y', 'n', 'n', 'p']],
  ['No additional devices to deploy', ['y', 'n', 'n', 'p']],
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
          <span className="eyebrow">The category difference</span>
          <h2 className="section-title cmp-headline">
            Telematics tells you where the truck went.{' '}
            <span className="grad">We tell you what it did.</span>
          </h2>
          <p className="section-lead">
            Generic fleet platforms track the vehicle. ZenduWaste answers the one question
            a waste operator actually gets called about — was the stop serviced?
          </p>
        </div>

        <div className="vs" data-reveal>
          <div className="vs-col vs-them">
            <div className="vs-cap">
              <span className="vs-kind">Generic telematics</span>
              <span className="vs-sub">Samsara · Geotab · Routeware</span>
            </div>
            <ul className="vs-list">
              {TELEMATICS.map((q) => (
                <li key={q}><span className="vs-mark vs-mark-them">•</span>{q}</li>
              ))}
            </ul>
          </div>

          <div className="vs-divider" aria-hidden="true"><span>vs</span></div>

          <div className="vs-col vs-us">
            <div className="vs-cap">
              <span className="vs-kind">ZenduWaste answers</span>
              <span className="vs-sub">Built for the curb, not the highway</span>
            </div>
            <ul className="vs-list">
              {ZENDU.map((q) => (
                <li key={q}><span className="vs-mark vs-mark-us">✓</span>{q}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cmp-wrap" data-reveal>
          <table className="cmp-table">
            <thead>
              <tr>
                <th scope="col" className="cmp-feature">Capability</th>
                {COLS.map((c, i) => (
                  <th scope="col" key={c} className={i === 0 ? 'us' : ''}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([feature, marks]) => (
                <tr key={feature}>
                  <th scope="row" className="cmp-feature">{feature}</th>
                  {marks.map((m, i) => (
                    <td key={i} className={i === 0 ? 'cmp-col-us' : ''}>
                      <Mark v={m} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
