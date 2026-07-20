import { Brand } from './Logo.jsx'

const COLS = [
  {
    h: 'Platform',
    links: [
      ['Pickup confirmation', '#capabilities'],
      ['Contamination detection', '#capabilities'],
      ['Exception alerts', '#capabilities'],
      ['Service evidence', '#capabilities'],
    ],
  },
  {
    h: 'Company',
    links: [
      ['How it works', '#how'],
      ['Why ZenduWaste', '#compare'],
      ['Results', '#proof'],
      ['Book a demo', '#cta'],
    ],
  },
  {
    h: 'Ecosystem',
    links: [
      ['ZenCam', '#top'],
      ['ZenduONE platform', '#top'],
      ['GoFleet', '#top'],
      ['Command Center', '#how'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div style={{ maxWidth: '320px' }}>
            <Brand />
            <p className="footer-tag">
              AI waste-fleet intelligence, running on the cameras already on your trucks.
            </p>
          </div>
          <div className="footer-cols">
            {COLS.map((col) => (
              <div className="footer-col" key={col.h}>
                <h4>{col.h}</h4>
                {col.links.map(([label, href]) => (
                  <a key={label} href={href}>{label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ZenduWaste by GoFleet · part of ZenduONE · powered by ZenCam</span>
          <a href="mailto:sales@gofleet.com">sales@gofleet.com</a>
        </div>
      </div>
    </footer>
  )
}
