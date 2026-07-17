import { useReveal } from '../hooks/useReveal.js'

const ITEMS = ['ZenduONE', 'ZenCam AI', 'GoFleet', 'Soft-Pak', 'CR&R Pilot']

export default function TrustBar() {
  const ref = useReveal()
  return (
    <section className="trust" ref={ref}>
      <div className="container">
        <p className="trust-label" data-reveal>
          One intelligence layer across the tools your operation already runs
        </p>
        <div className="trust-row" data-reveal>
          {ITEMS.map((name) => (
            <span className="trust-item" key={name}>
              <span className="badge-dot" aria-hidden="true" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
