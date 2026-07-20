/**
 * The signature element: a schematic of what ZenCam actually sees at the curb.
 * A perspective ground plane, a waste cart, and an AI detection box with a
 * confidence label — the product's core truth rendered as a camera still.
 *
 * Variants:
 *   scene="detect"  full curbside detection view (default)
 *   scene="mini"    cart + box only, for tiny thumbnails
 *   scene="empty"   just the analyzing sweep (no objects)
 */
export default function EvidenceFrame({
  scene = 'detect',
  label = 'cart · 0.98',
  meta,
  analyzing = false,
  className = '',
}) {
  return (
    <div className={`evidence-frame ${className}`}>
      <span className="corner-tr" />
      <span className="corner-bl" />

      {scene !== 'blank' && (
        <svg className="ev-scene" viewBox="0 0 240 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {(scene === 'detect' || scene === 'empty') && (
            <>
              {/* ground plane — converging perspective lines read as a camera view */}
              <g className="ev-ground">
                <line x1="0" y1="150" x2="88" y2="96" />
                <line x1="60" y1="150" x2="104" y2="96" />
                <line x1="130" y1="150" x2="122" y2="96" />
                <line x1="210" y1="150" x2="140" y2="96" />
                <line x1="0" y1="150" x2="240" y2="150" />
                <line x1="16" y1="126" x2="224" y2="126" />
                <line x1="40" y1="108" x2="200" y2="108" />
              </g>
              <line className="ev-curb" x1="30" y1="99" x2="210" y2="99" />
              {scene === 'detect' && <rect className="ev-truck" x="-4" y="60" width="46" height="34" rx="4" />}
            </>
          )}

          {scene !== 'empty' && (
            <g className="ev-cart">
              <path className="ev-cart-body" d="M104 62 h30 l-3 34 h-24 z" />
              <rect className="ev-cart-lid" x="102" y="57" width="34" height="7" rx="3" />
              <circle className="ev-wheel" cx="110" cy="98" r="3" />
              <circle className="ev-wheel" cx="126" cy="98" r="3" />
            </g>
          )}

          {scene !== 'empty' && (
            <g className="ev-box">
              <rect x="94" y="50" width="52" height="54" rx="2" />
              <path d="M94 60 v-10 h10 M136 50 h10 v10 M94 94 v10 h10 M146 94 v10 h-10" />
            </g>
          )}
        </svg>
      )}

      {scene === 'detect' && (
        <span className="ev-tag">{label}</span>
      )}

      {analyzing && <span className="capture-line" />}
      {meta && (
        <span className="frame-meta"><span className="frame-rec" />{meta}</span>
      )}
    </div>
  )
}
