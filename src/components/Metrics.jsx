import { useReveal } from '../hooks/useReveal.js'

/* Proof section: the operator's words lead; the instruments confirm.
 * Numbers are stated, not animated — a reading, not a fireworks show. */
export default function Metrics() {
  const ref = useReveal()
  return (
    <section className="section proof" id="proof" ref={ref}>
      <div className="container">
        <figure className="quote" data-reveal>
          <blockquote>
            “We stopped finding out about missed stops from angry residents. Now we
            catch them before the truck leaves the neighborhood.”
          </blockquote>
          {/* TODO: attribute to CR&R once public naming is signed off */}
          <cite>Operations Director · a leading Southern California hauler</cite>
        </figure>

        <div className="proof-strip" data-reveal>
          <div><b>98<em>%</em></b><span>of pickups auto-verified by ZenCam</span></div>
          <div><b>&lt;3<em>min</em></b><span>from missed stop to dispatcher alert</span></div>
          <div><b>100<em>%</em></b><span>of service disputes backed by footage</span></div>
          <div><b>0</b><span>new devices installed on the fleet</span></div>
        </div>
        <p className="proof-note" data-reveal>Live pilot data · Southern California residential routes</p>
      </div>
    </section>
  )
}
