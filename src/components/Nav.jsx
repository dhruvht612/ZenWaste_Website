import { useEffect, useState } from 'react'
import { Brand } from './Logo.jsx'

const LINKS = [
  { href: '#how', label: 'How it works' },
  { href: '#capabilities', label: 'Platform' },
  { href: '#compare', label: 'Why ZenduWaste' },
  { href: '#proof', label: 'Results' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Brand />
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </div>
        <div className="nav-right">
          <a className="btn btn-primary btn-sm" href="#cta">
            Book a demo
            <span className="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
