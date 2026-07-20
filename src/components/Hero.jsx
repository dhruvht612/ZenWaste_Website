import { useEffect, useState } from 'react'
import { useInViewTicker } from '../hooks/useInViewTicker.js'
import { Mark } from './Logo.jsx'
import NightMap from './NightMap.jsx'

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

/* ZenduONE-style line icons for the app rail (1.8 stroke, rounded). */
const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
const RAIL = [
  { label: 'Today', active: true, d: <><rect x="4" y="5" width="16" height="15" rx="2.5" {...S} /><path d="M4 10h16M8 3v4M16 3v4" {...S} /></> },
  { label: 'Fleet', d: <><path d="M3 16V8.5A1.5 1.5 0 0 1 4.5 7H13v9" {...S} /><path d="M13 10h4l3 3.4V16h-3" {...S} /><circle cx="7" cy="17.6" r="1.8" {...S} /><circle cx="16.5" cy="17.6" r="1.8" {...S} /></> },
  { label: 'Safety', d: <><path d="M12 3.5 19 6v5.4c0 4.4-3 7.6-7 9.1-4-1.5-7-4.7-7-9.1V6z" {...S} /><path d="M9.3 12l2 2 3.5-3.8" {...S} /></> },
  { label: 'Reports', d: <><path d="M5 20V10M12 20V4M19 20v-7" {...S} /></> },
]

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Hero() {
  const [feedRef, tick] = useInViewTicker(2800)

  // Live clock in the toolbar (rests at a fixed time under reduced motion).
  const [clock, setClock] = useState('04:42:07')
  useEffect(() => {
    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    let s = 4 * 3600 + 42 * 60 + 7
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
    return { ...item, key: `${tick}-${i}`, time: `4:${pad(((min % 60) + 60) % 60)}`, fresh: i === 0 }
  })
  const open = rows.filter((r) => r.kind !== 'ok').length

  return (
    <header className="hero" id="top">
      <NightMap />

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-badge rise rise-1">
            <span className="dot" aria-hidden="true" />
            Built on ZenduONE + ZenCam · no new hardware
          </div>
          <h1 className="rise rise-2">
            The intelligence layer for the <em>cameras already on your trucks.</em>
          </h1>
          <p className="hero-sub rise rise-3">
            ZenduWaste turns your existing fleet cameras into an AI layer that verifies
            every pickup, catches contamination at the curb, and surfaces missed stops —
            resolved before the customer ever calls.
          </p>
          <div className="hero-actions rise rise-4">
            <a className="btn btn-primary btn-lg" href="#cta">
              See it on your routes
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn btn-oncanvas btn-lg" href="#how">
              <span className="play-glyph" aria-hidden="true">▶</span>
              Watch how it works
            </a>
          </div>
          <div className="hero-strip rise rise-5">
            <div><b>98%</b><span>pickups auto-verified</span></div>
            <div><b>&lt;3 min</b><span>to surface an exception</span></div>
            <div><b>0</b><span>new devices installed</span></div>
          </div>
        </div>

        <div className="hero-visual rise rise-4">
          {/* The product, framed exactly the way ZenduONE frames it:
              transparent icon rail on the canvas, white container floating. */}
          <div className="shell">
            <div className="shell-rail" aria-hidden="true">
              <span className="rail-mark"><Mark size={34} /></span>
              {RAIL.map((r) => (
                <span key={r.label} className={`rail-item${r.active ? ' active' : ''}`} title={r.label}>
                  <svg viewBox="0 0 24 24" width="20" height="20">{r.d}</svg>
                </span>
              ))}
            </div>

            <section
              className="shell-panel"
              ref={feedRef}
              aria-label="ZenduWaste Command Center — a live feed of route exceptions and camera-verified pickups"
            >
              <div className="panel-bar">
                <span className="panel-module">
                  <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                    <path d="M4 13.5 10 5l3.6 5.2L16.8 7 20 13.5" {...S} />
                    <path d="M4 18.5h16" {...S} />
                  </svg>
                  Command Center
                </span>
                <span className="cc-clock mono" aria-hidden="true">{clock}</span>
                <span className="panel-live"><span className="dot" />Live</span>
                <span className="panel-avatar" aria-hidden="true">RD</span>
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
                        <span className="evidence-frame">
                          <span className="corner-tr" /><span className="corner-bl" />
                          <span className="capture-line" />
                          <span className="frame-meta"><span className="frame-rec" />ZenCam</span>
                        </span>
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
