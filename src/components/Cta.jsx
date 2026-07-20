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
          <span className="cta-eyebrow">Book a walkthrough</span>
          <h2>See it running on your own routes.</h2>
          <p>
            30 minutes on your footage, your routes, your exceptions — live, with our team.
            We pull a real shift and show you what ZenCam already saw.
          </p>
          <div className="cta-actions">
            <a
              className="btn btn-primary btn-lg"
              href="mailto:sales@gofleet.com?subject=ZenduWaste%20demo"
            >
              Book a live demo
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-lg cta-ghost" href="#how">See how it works</a>
          </div>
          <ul className="cta-chips">
            <li>Your footage</li>
            <li>Your routes</li>
            <li>No install</li>
            <li>30 minutes</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
