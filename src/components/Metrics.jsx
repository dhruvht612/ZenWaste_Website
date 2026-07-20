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
          <div><b>98<em>%</em></b><span>pickup verification rate in pilot</span></div>
          <div><b>&lt;3<em>min</em></b><span>average from detected exception to dispatcher alert</span></div>
          <div><b>100<em>%</em></b><span>documented disputes supported by available footage</span></div>
          <div><b>0</b><span>additional devices required for the ZenCam-based solution</span></div>
        </div>
        <p className="proof-note" data-reveal>Live pilot data · Southern California residential routes</p>
      </div>
    </section>
  )
}
