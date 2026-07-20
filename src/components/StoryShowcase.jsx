import { useEffect, useRef, useState } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress.js'
import EvidenceFrame from './EvidenceFrame.jsx'

const ROUTE =
  'M 34 66 C 128 18, 168 132, 252 102 C 330 76, 366 150, 300 192 ' +
  'C 250 224, 156 188, 116 228 C 82 262, 46 246, 30 206'

const STEPS = [
  { t: 'Route runs', d: 'Trucks run their normal routes. ZenCam watches every stop through the cameras already on the vehicle.' },
  { t: 'Missed stop detected', d: 'No service event lands inside the pickup window for Stop 87 — the system flags it in real time.' },
  { t: 'AI analyzes the footage', d: 'ZenCam reviews the curbside frames, confirms the cart was never serviced, and scores its confidence.' },
  { t: 'Dispatcher alerted', d: 'The exception surfaces in the Command Center with the evidence attached — while the truck is still nearby.' },
  { t: 'Customer notified', d: 'An automatic update goes out before the resident ever picks up the phone to complain.' },
  { t: 'Resolved — same shift', d: 'The truck is rerouted back, the stop is verified, and the record closes. No callback, no dispute.' },
]

/** Truck traversal eased against scroll: it runs to the missed stop, holds
 *  there while the lifecycle plays, then completes the route. */
function truckFrac(p) {
  if (p < 0.33) return (p / 0.33) * 0.52
  if (p < 0.83) return 0.52
  return 0.52 + ((p - 0.83) / 0.17) * 0.48
}

export default function StoryShowcase() {
  const [trackRef, progress] = useScrollProgress()
  const pathRef = useRef(null)
  const fgRef = useRef(null)
  const truckRef = useRef(null)
  const [stops, setStops] = useState([])

  const stage = Math.min(5, Math.floor(progress * 6 + 1e-6))
  const frac = truckFrac(progress)

  // Sample stop coordinates directly on the path so they always sit on the line.
  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const len = path.getTotalLength()
    const fr = [0.08, 0.24, 0.4, 0.52, 0.68, 0.88]
    setStops(
      fr.map((f, i) => {
        const pt = path.getPointAtLength(f * len)
        return { x: pt.x, y: pt.y, f, missed: i === 3 }
      }),
    )
  }, [])

  // Move the truck + draw the bright route behind it as scroll advances.
  useEffect(() => {
    const path = pathRef.current
    const truck = truckRef.current
    const fg = fgRef.current
    if (!path || !truck || !fg) return
    const len = path.getTotalLength()
    const d = frac * len
    const pt = path.getPointAtLength(d)
    const ahead = path.getPointAtLength(Math.min(len, d + 1))
    const ang = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI
    truck.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${ang})`)
    fg.style.strokeDasharray = `${len}`
    fg.style.strokeDashoffset = `${len * (1 - frac)}`
  }, [frac])

  const stopClass = (s) => {
    if (s.missed) return stage >= 5 ? 'stop done' : stage >= 1 ? 'stop miss' : 'stop'
    return frac >= s.f ? 'stop done' : 'stop'
  }

  return (
    <section className="story" id="how">
      <div className="story-track" ref={trackRef}>
        <div className="story-sticky">
          <div className="aurora-field" aria-hidden="true">
            <span className="aurora aurora-c" style={{ opacity: 0.4 }} />
          </div>

          <div className="container story-inner">
            <div className="story-copy">
              <span className="eyebrow">The lifecycle of one missed stop</span>
              <h2 className="section-title">Watch the software work.</h2>
              <div className="story-steps" role="list">
                {STEPS.map((s, i) => (
                  <div key={s.t} className={`story-step${i === stage ? ' active' : ''}`} role="listitem">
                    <h3>
                      <span className="idx">{i + 1}</span>
                      {s.t}
                    </h3>
                    <p>{s.d}</p>
                  </div>
                ))}
              </div>
              <div className="story-progress" aria-hidden="true">
                <i style={{ transform: `scaleX(${progress})` }} />
              </div>
            </div>

            <div className="stage" aria-hidden="true">
              <svg className="stage-map" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3A8BCC" />
                    <stop offset="100%" stopColor="#0F5795" />
                  </linearGradient>
                </defs>
                <path ref={pathRef} className="route-bg" d={ROUTE} />
                <path ref={fgRef} className="route-fg" d={ROUTE} />
                {stops.map((s, i) => (
                  <circle key={i} className={stopClass(s)} cx={s.x} cy={s.y} r={s.missed ? 7 : 5} />
                ))}
                <g ref={truckRef} className="truck">
                  <rect className="truck-body" x="-7" y="-5" width="14" height="10" rx="2.5" />
                  <rect x="-2" y="-4" width="6" height="8" rx="1.5" fill="rgba(255,255,255,0.9)" />
                </g>
              </svg>

              {/* AI footage analysis */}
              <div className={`stage-overlay ov-scan${stage >= 2 ? ' show' : ''}`}>
                <div className="ov-head"><span className="badge-dot" style={{ background: '#12B76A' }} />ZenCam · analyzing</div>
                <EvidenceFrame scene="detect" analyzing meta="08:41:52" label="cart · 0.96" className="ov-scan-frame" />
                <div className="ov-conf">Cart never serviced <span className="conf"><span className="conf-bar"><i style={{ transform: 'scaleX(0.96)' }} /></span><b>96%</b></span></div>
              </div>

              {/* Dispatcher alert */}
              <div className={`stage-overlay ov-alert${stage >= 3 ? ' show' : ''}`}>
                <div className="ov-head">Command Center</div>
                <div className="row alert" style={{ background: 'transparent', border: 'none', padding: 0 }}>
                  <span className="tag tag-miss">Missed</span>
                  <span className="rt"><strong>Route 14 · Stop 87</strong><span>Pushed to dispatch</span></span>
                </div>
              </div>

              {/* Customer notification */}
              <div className={`stage-overlay ov-notify${stage >= 4 ? ' show' : ''}`}>
                <div className="toast">
                  <span className="ic">✉</span>
                  <span className="tt"><strong>Customer notified</strong><span>“We’ll return today”</span></span>
                </div>
              </div>

              {/* Resolved */}
              <div className={`stage-overlay ov-resolved${stage >= 5 ? ' show' : ''}`}>
                <div className="check">✓</div>
                <strong>Resolved this shift</strong>
                <p>Re-serviced &amp; verified · record closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
