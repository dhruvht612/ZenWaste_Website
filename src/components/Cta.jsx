import { useReveal } from '../hooks/useReveal.js'

/* The close: back inside the canvas the page opened on. */
export default function Cta() {
  const ref = useReveal()
  return (
    <section className="cta" id="cta" ref={ref}>
      <div className="container" data-reveal>
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
          <a className="btn btn-oncanvas btn-lg" href="#how">See how it works</a>
        </div>
        <ul className="cta-terms">
          <li>Your footage</li>
          <li>Your routes</li>
          <li>No install</li>
          <li>30 minutes</li>
        </ul>
      </div>
    </section>
  )
}
