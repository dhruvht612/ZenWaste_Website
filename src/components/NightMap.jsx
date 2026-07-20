/* The dispatch map at night — the faint street grid behind the canvas
 * sections, with one live route running its collection pattern. */
export default function NightMap() {
  return (
    <svg
      className="nightmap"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* street grid — irregular city blocks */}
      <g className="street">
        <path d="M0 140 H1440" />
        <path d="M0 320 H1440" />
        <path d="M0 500 H1440" />
        <path d="M0 690 H1440" />
        <path d="M0 830 H1440" />
        <path d="M120 0 V900" />
        <path d="M340 0 V900" />
        <path d="M560 0 V900" />
        <path d="M900 0 V900" />
        <path d="M1120 0 V900" />
        <path d="M1330 0 V900" />
        <path d="M560 320 L900 500" />
        <path d="M120 690 L340 830" />
        <path d="M1120 140 L1330 320" />
      </g>
      <g className="street-major">
        <path d="M0 230 H1440" />
        <path d="M730 0 V900" />
      </g>
      {/* tonight's route */}
      <path
        className="live-route"
        d="M120 830 V690 H340 V500 H560 V320 H900 V500 H1120 V230 H1330"
      />
      <g>
        <circle className="map-stop" cx="340" cy="690" r="3" />
        <circle className="map-stop" cx="560" cy="500" r="3" />
        <circle className="map-stop" cx="900" cy="320" r="3" />
        <circle className="map-stop" cx="1120" cy="500" r="3" />
        <circle className="map-stop-live" cx="1120" cy="230" r="4" />
      </g>
    </svg>
  )
}
