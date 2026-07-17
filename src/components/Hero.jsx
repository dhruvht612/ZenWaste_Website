import { useParallax } from '../hooks/useParallax.js'
import { useSpotlight } from '../hooks/useSpotlight.js'

const FEED = [
  { tag: 'Missed', cls: 'tag-miss', title: 'Route 14 · Stop 87', sub: '1420 Alameda St — no service event in window', time: '8:42', alert: true },
  { tag: 'Verified', cls: 'tag-ok', title: 'Route 14 · Stop 86', sub: 'ZenCam confirmed pickup · 98%', time: '8:39' },
  { tag: 'Contamination', cls: 'tag-flag', title: 'Route 12 · Stop 41', sub: 'Cardboard in organics · frame attached', time: '8:31' },
  { tag: 'Verified', cls: 'tag-ok', title: 'Route 12 · Stop 40', sub: 'ZenCam confirmed pickup · 96%', time: '8:28' },
]

export default function Hero() {
  const spotlightRef = useSpotlight()
  const deviceRef = useParallax()

  return (
    <header className="hero" id="top" ref={spotlightRef}>
      <div className="aurora-field" aria-hidden="true">
        <span className="aurora aurora-a" />
        <span className="aurora aurora-b" />
        <span className="aurora aurora-c" />
      </div>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="spotlight" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge rise rise-1">
            <span className="dot" aria-hidden="true" />
            Built on ZenduONE + ZenCam · No new hardware
          </div>
          <h1 className="rise rise-2">
            Waste fleet intelligence,{' '}
            <span className="grad">already running on your trucks.</span>
          </h1>
          <p className="hero-sub rise rise-3">
            ZenduWaste turns the cameras already mounted on your fleet into an
            AI layer that verifies every pickup, catches contamination at the curb,
            and surfaces missed stops before the customer ever calls.
          </p>
          <div className="hero-actions rise rise-4">
            <a className="btn btn-primary btn-lg" href="#cta">
              See it on your routes
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost btn-lg" href="#how">Watch how it works</a>
          </div>
          <div className="hero-metrics rise rise-5">
            <div className="metric-chip">
              <div className="m-num">98<span>%</span></div>
              <div className="m-label">pickups auto-verified</div>
            </div>
            <div className="metric-chip">
              <div className="m-num">&lt;3<span>min</span></div>
              <div className="m-label">to surface an exception</div>
            </div>
            <div className="metric-chip">
              <div className="m-num">0<span></span></div>
              <div className="m-label">new devices installed</div>
            </div>
          </div>
        </div>

        <div className="hero-visual rise rise-4">
          <div className="device" ref={deviceRef}>
            <div
              className="panel"
              role="img"
              aria-label="ZenduWaste Command Center exception feed: a flagged missed stop on Route 14, a contamination flag on Route 12, and two camera-verified pickups"
            >
              <div className="panel-bar">
                <span className="d" /><span className="d" /><span className="d" />
                <span className="panel-title">Command Center — Live exceptions</span>
                <span className="panel-live"><span className="dot" />Live</span>
              </div>
              <div className="panel-body">
                {FEED.map((r, i) => (
                  <div
                    key={r.title}
                    className={`row feed-anim${r.alert ? ' alert' : ''}`}
                    style={{ animationDelay: `${0.6 + i * 0.13}s` }}
                  >
                    <span className={`tag ${r.cls}`}>{r.tag}</span>
                    <span className="rt">
                      <strong>{r.title}</strong>
                      <span>{r.sub}</span>
                    </span>
                    <span className="rtime">{r.time} AM</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
