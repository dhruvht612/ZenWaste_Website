import { useReveal } from '../hooks/useReveal.js'
import { Mark } from './Logo.jsx'

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
const IC = {
  camera: <><path d="M4 8.5h3l1.4-2h7.2L17 8.5h3a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1Z" {...S} /><circle cx="12" cy="13.2" r="3.2" {...S} /></>,
  telematics: <><circle cx="12" cy="10" r="2.6" {...S} /><path d="M12 21s6.5-5.4 6.5-10.2A6.5 6.5 0 0 0 12 4.3a6.5 6.5 0 0 0-6.5 6.5C5.5 15.6 12 21 12 21Z" {...S} /></>,
  fleet: <><path d="M3 16V8.5A1.5 1.5 0 0 1 4.5 7H13v9" {...S} /><path d="M13 10h4l3 3.4V16h-3" {...S} /><circle cx="7" cy="17.6" r="1.8" {...S} /><circle cx="16.5" cy="17.6" r="1.8" {...S} /></>,
  erp: <><rect x="4" y="4" width="16" height="16" rx="2.5" {...S} /><path d="M4 9.5h16M9.5 9.5V20" {...S} /></>,
  dispatch: <><path d="M4 13.5 10 5l3.6 5.2L16.8 7 20 13.5" {...S} /><path d="M4 18.5h16" {...S} /></>,
  portal: <><circle cx="12" cy="8.5" r="3.2" {...S} /><path d="M5 19.5c1.3-3 4-4.5 7-4.5s5.7 1.5 7 4.5" {...S} /></>,
}

const INPUTS = [
  { icon: 'camera', name: 'ZenCam AI', role: 'Cameras already on the truck' },
  { icon: 'telematics', name: 'ZenduONE', role: 'Telematics · routing · GPS' },
  { icon: 'fleet', name: 'GoFleet', role: 'Fleet operations' },
  { icon: 'erp', name: 'Soft-Pak', role: 'Billing & service ERP' },
]

const OUTPUTS = [
  { icon: 'dispatch', name: 'Command Center', role: 'Dispatch acts on exceptions' },
  { icon: 'portal', name: 'Customer portal', role: 'Proof of service, on demand' },
]

function Connector() {
  return (
    <span className="eco-link" aria-hidden="true">
      <span className="eco-flow" />
    </span>
  )
}

export default function TrustBar() {
  const ref = useReveal()
  return (
    <section className="section eco" id="ecosystem" ref={ref}>
      <div className="container">
        <div className="section-head eco-head" data-reveal>
          <h2 className="section-title">
            One intelligence layer across the tools you already run.
          </h2>
          <p className="section-lead">
            ZenduWaste is not another disconnected system. It reads from the hardware and
            software already on your operation — and turns it into action.
          </p>
        </div>

        <div className="eco-diagram" data-reveal role="img"
          aria-label="Data from ZenCam AI, ZenduONE, GoFleet and Soft-Pak flows into the ZenduWaste intelligence layer, which drives the Command Center and the customer portal.">
          <div className="eco-col eco-in">
            {INPUTS.map((n) => (
              <div className="eco-node" key={n.name}>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">{IC[n.icon]}</svg>
                <span className="eco-node-text">
                  <strong>{n.name}</strong>
                  <span>{n.role}</span>
                </span>
              </div>
            ))}
          </div>

          <Connector />

          <div className="eco-core">
            <Mark size={40} />
            <strong>ZenduWaste</strong>
            <span>AI intelligence layer</span>
          </div>

          <Connector />

          <div className="eco-col eco-out">
            {OUTPUTS.map((n) => (
              <div className="eco-node eco-node-out" key={n.name}>
                <span className="eco-node-text">
                  <strong>{n.name}</strong>
                  <span>{n.role}</span>
                </span>
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">{IC[n.icon]}</svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
