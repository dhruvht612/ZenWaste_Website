import { useReveal } from '../hooks/useReveal.js'
import { useCountUp } from '../hooks/useCountUp.js'

function BigMetric({ end, decimals, prefix = '', suffix, label }) {
  const [ref, val] = useCountUp(end, { decimals })
  return (
    <div className="big-metric" data-reveal>
      <div className="bm-num" ref={ref}>
        {prefix}
        {val}
        <span>{suffix}</span>
      </div>
      <div className="bm-label">{label}</div>
    </div>
  )
}

export default function Metrics() {
  const ref = useReveal()
  return (
    <section className="section metrics" id="proof" ref={ref}>
      <div className="container">
        <div className="section-head" style={{ margin: '0 auto', textAlign: 'center' }} data-reveal>
          <span className="eyebrow" style={{ justifyContent: 'center' }}>Proven in the field</span>
          <h2 className="section-title" style={{ margin: '0 auto' }}>
            Numbers from a live pilot, not a pitch deck.
          </h2>
        </div>

        <div className="metrics-grid">
          <BigMetric end={98} suffix="%" label="of pickups auto-verified by ZenCam" />
          <BigMetric end={3} prefix="<" suffix="min" label="from missed stop to dispatcher alert" />
          <BigMetric end={100} suffix="%" label="of service disputes backed by footage" />
          <BigMetric end={0} suffix="" label="new devices installed on the fleet" />
        </div>

        <figure className="quote" data-reveal>
          <blockquote>
            “We stopped finding out about missed stops from angry residents. Now we
            catch them before the truck leaves the neighborhood.”
          </blockquote>
          {/* TODO: attribute to CR&R once public naming is signed off */}
          <cite>Operations Director · a leading Southern California hauler</cite>
        </figure>
      </div>
    </section>
  )
}
