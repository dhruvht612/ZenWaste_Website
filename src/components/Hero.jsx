import { useEffect, useState } from 'react'
import { useParallax } from '../hooks/useParallax.js'
import { useSpotlight } from '../hooks/useSpotlight.js'
import { useInViewTicker } from '../hooks/useInViewTicker.js'
import EvidenceFrame from './EvidenceFrame.jsx'

/* The pool the live feed draws from. New events arrive at the top on each
 * tick, so the Command Center reads as an operation actually running. */
const POOL = [
  { kind: 'miss', tag: 'Missed', route: 'Route 14 · Stop 87', sub: '1420 Alameda St — no service event in window', evidence: true, action: 'Dispatch' },
  { kind: 'ok', tag: 'Verified', route: 'Route 14 · Stop 86', sub: 'ZenCam confirmed pickup', conf: 98 },
  { kind: 'flag', tag: 'Contamination', route: 'Route 12 · Stop 41', sub: 'Cardboard in organics · frame attached', conf: 91 },
  { kind: 'ok', tag: 'Verified', route: 'Route 12 · Stop 40', sub: 'ZenCam confirmed pickup', conf: 96 },
  { kind: 'ok', tag: 'Verified', route: 'Route 9 · Stop 112', sub: 'ZenCam confirmed pickup', conf: 99 },
  { kind: 'flag', tag: 'Contamination', route: 'Route 7 · Stop 22', sub: 'Plastic bag in green cart', conf: 88 },
  { kind: 'ok', tag: 'Verified', route: 'Route 9 · Stop 111', sub: 'ZenCam confirmed pickup', conf: 97 },
]

const TAG_CLASS = { miss: 'tag-miss', flag: 'tag-flag', ok: 'tag-ok' }

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Hero() {
  const spotlightRef = useSpotlight()
  const deviceRef = useParallax()
  const [feedRef, tick] = useInViewTicker(2800)

  // Live clock in the panel header (rests at a fixed time under reduced motion).
  const [clock, setClock] = useState('08:42:07')
  useEffect(() => {
    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    let s = 8 * 3600 + 42 * 60 + 7
    const id = setInterval(() => {
      s += 1
      setClock(`${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  // Build the visible feed: newest arrival on top, five rows deep.
  const rows = Array.from({ length: 5 }, (_, i) => {
    const item = POOL[(tick + i) % POOL.length]
    const min = 42 - i * 3
    return { ...item, key: `${tick}-${i}`, time: `8:${pad(((min % 60) + 60) % 60)}`, fresh: i === 0 }
  })
  const open = rows.filter((r) => r.kind !== 'ok').length

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
            Powered by ZenCam · Built on the ZenduONE platform
          </div>
          <h1 className="rise rise-2">
            The camera sees the stop.{' '}
            <span className="grad">ZenduWaste understands what happened.</span>
          </h1>
          <p className="hero-sub rise rise-3">
            AI-powered waste fleet intelligence, powered by ZenCam. ZenduWaste pairs
            ZenCam’s AI camera technology with software built for waste operations — to
            verify service events, catch contamination, and surface route exceptions.
          </p>
          <div className="hero-actions rise rise-4">
            <a className="btn btn-primary btn-lg" href="#cta">
              See it on your routes
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost btn-lg" href="#how">
              <span className="play-glyph" aria-hidden="true">▶</span>
              Watch how it works
            </a>
          </div>
          <div className="hero-metrics rise rise-5">
            <div className="metric-chip">
              <div className="m-num">98<span>%</span></div>
              <div className="m-label">pickup verification in pilot</div>
            </div>
            <div className="metric-chip">
              <div className="m-num">&lt;3<span>min</span></div>
              <div className="m-label">exception → dispatcher alert</div>
            </div>
            <div className="metric-chip">
              <div className="m-num">0<span></span></div>
              <div className="m-label">added devices required</div>
            </div>
          </div>
        </div>

        <div className="hero-visual rise rise-4">
          <div className="device" ref={deviceRef}>
            <section
              className="panel cc"
              ref={feedRef}
              aria-label="ZenduWaste Command Center — a live feed of route exceptions and camera-verified pickups"
            >
              <div className="panel-bar">
                <span className="d" /><span className="d" /><span className="d" />
                <span className="panel-title">Command Center</span>
                <span className="cc-clock mono" aria-hidden="true">{clock}</span>
                <span className="panel-live"><span className="dot" />Live</span>
              </div>

              <div className="cc-rail" aria-hidden="true">
                <div className="cc-stat">
                  <b className="mono">6</b><span>active routes</span>
                </div>
                <div className="cc-stat">
                  <b className="mono" style={{ color: 'var(--error-600)' }}>{open}</b><span>open exceptions</span>
                </div>
                <div className="cc-stat">
                  <b className="mono" style={{ color: 'var(--success-600)' }}>412</b><span>verified today</span>
                </div>
              </div>

              <div className="panel-body cc-feed">
                {rows.map((r) => (
                  <article
                    key={r.key}
                    className={`row cc-row${r.kind === 'miss' ? ' alert' : ''}${r.fresh ? ' fresh' : ''}`}
                  >
                    <span className={`tag ${TAG_CLASS[r.kind]}`}>{r.tag}</span>
                    <span className="rt">
                      <strong>{r.route}</strong>
                      <span>{r.sub}</span>
                      {r.conf != null && (
                        <span className="conf">
                          <span className="conf-bar"><i style={{ transform: `scaleX(${r.conf / 100})` }} /></span>
                          <b>{r.conf}%</b> confidence
                        </span>
                      )}
                    </span>
                    {r.evidence ? (
                      <span className="cc-evidence" aria-hidden="true">
                        <EvidenceFrame scene="mini" analyzing className="cc-ev" />
                        <span className="btn btn-primary btn-sm cc-act">{r.action} →</span>
                      </span>
                    ) : (
                      <span className="rtime mono">{r.time}</span>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </header>
  )
}
