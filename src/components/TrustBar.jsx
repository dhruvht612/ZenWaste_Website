import { useReveal } from '../hooks/useReveal.js'

const INPUTS = [
  { name: 'ZenCam AI', role: 'Cameras already on the truck' },
  { name: 'ZenduONE', role: 'Telematics · routing · GPS' },
  { name: 'GoFleet', role: 'Fleet operations' },
  { name: 'Soft-Pak', role: 'Billing & service ERP' },
]

const OUTPUTS = [
  { name: 'Command Center', role: 'Dispatch acts on exceptions' },
  { name: 'Customer portal', role: 'Proof of service, on demand' },
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
          <span className="eyebrow" style={{ justifyContent: 'center' }}>The ecosystem</span>
          <h2 className="section-title" style={{ margin: '0 auto' }}>
            One intelligence layer across the tools you already run.
          </h2>
          <p className="section-lead" style={{ margin: 'var(--s-4) auto 0' }}>
            ZenduWaste is not another disconnected system. It reads from the hardware and
            software already on your operation — and turns it into action.
          </p>
        </div>

        <div className="eco-diagram" data-reveal role="img"
          aria-label="Data from ZenCam AI, ZenduONE, GoFleet and Soft-Pak flows into the ZenduWaste intelligence layer, which drives the Command Center and the customer portal.">
          <div className="eco-col eco-in">
            <span className="eco-col-label">Runs on</span>
            {INPUTS.map((n) => (
              <div className="eco-node" key={n.name}>
                <span className="eco-dot" />
                <span className="eco-node-text">
                  <strong>{n.name}</strong>
                  <span>{n.role}</span>
                </span>
              </div>
            ))}
          </div>

          <Connector />

          <div className="eco-core">
            <span className="eco-core-mark" aria-hidden="true" />
            <strong>ZenduWaste</strong>
            <span>AI intelligence layer</span>
          </div>

          <Connector />

          <div className="eco-col eco-out">
            <span className="eco-col-label">Drives</span>
            {OUTPUTS.map((n) => (
              <div className="eco-node eco-node-out" key={n.name}>
                <span className="eco-node-text">
                  <strong>{n.name}</strong>
                  <span>{n.role}</span>
                </span>
                <span className="eco-dot eco-dot-out" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
