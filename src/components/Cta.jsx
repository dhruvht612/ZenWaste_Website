import { useReveal } from '../hooks/useReveal.js'

export default function Cta() {
  const ref = useReveal()
  return (
    <section className="cta" id="cta" ref={ref}>
      <div className="aurora-field" aria-hidden="true">
        <span className="aurora aurora-a" />
        <span className="aurora aurora-b" />
      </div>
      <div className="container">
        <div className="cta-card" data-reveal>
          <h2>See it running on your own routes.</h2>
          <p>
            A 30-minute walkthrough on your footage, your routes, your exceptions —
            live, with our team.
          </p>
          <a
            className="btn btn-primary btn-lg"
            href="mailto:sales@gofleet.com?subject=ZenduWaste%20demo"
          >
            Book a live demo
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
