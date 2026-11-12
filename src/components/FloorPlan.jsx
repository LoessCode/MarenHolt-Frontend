/**
 * Ground-floor plan of "Casa Sul", drawn as a working drawing: poché walls,
 * double-line glazing, door swings, furniture, dimension strings, a scale bar
 * and north point. Every stroke is drawn in on scroll (see Studio.jsx).
 * 1 unit ≈ 3 cm → the house is 15.6 × 12.0 m.
 */
export default function FloorPlan() {
  return (
    <svg className="plan" viewBox="0 0 620 500" role="img" aria-label="Ground floor plan of Casa Sul">
      {/* Courtyard paving + tree (drawn first so walls sit on top) */}
      <g className="p-furn p-faint">
        <path d="M300 180H440M300 210H440M300 240H440M335 150V270M370 150V270M405 150V270" />
      </g>
      <g className="p-furn">
        <circle cx="370" cy="210" r="38" strokeDasharray="3 4" />
        <circle cx="370" cy="210" r="5" />
      </g>

      {/* External walls */}
      <path
        className="p-wall-ext"
        d="M40 40H90 M260 40H360 M520 40H560V200 M560 380V440H380 M340 440H40V200 M40 100V40"
      />
      {/* Internal walls */}
      <path
        className="p-wall-int"
        d="M300 40V90 M40 260H120 M150 260H220V440 M220 320H245 M275 320H300 M300 320V440 M440 150H560 M440 270V330 M440 365V440"
      />
      {/* Glazing */}
      <path
        className="p-win"
        d="M90 37H260M90 43H260 M360 37H520M360 43H520 M557 200V380M563 200V380 M37 100V200M43 100V200
           M300 147H440M300 153H440 M300 267H440M300 273H440 M297 150V270M303 150V270 M437 150V270M443 150V270"
      />
      {/* Door swings */}
      <path
        className="p-door"
        d="M120 260V290 M120 290A30 30 0 0 0 150 260 M245 320V350 M245 350A30 30 0 0 0 275 320
           M440 330H475 M475 330A35 35 0 0 1 440 365 M380 440V400 M380 400A40 40 0 0 0 340 440"
      />
      {/* Furniture */}
      <g className="p-furn">
        {/* living */}
        <rect x="62" y="182" width="128" height="34" />
        <path d="M62 194H190" />
        <circle cx="126" cy="132" r="21" />
        {/* dining */}
        <rect x="214" y="76" width="50" height="112" />
        <path d="M202 88v18M202 122v18M202 156v18M276 88v18M276 122v18M276 156v18" />
        {/* kitchen */}
        <rect x="318" y="48" width="232" height="24" />
        <rect x="362" y="96" width="124" height="26" />
        <circle cx="352" cy="60" r="7" />
        {/* bed 01 */}
        <rect x="70" y="334" width="84" height="98" />
        <path d="M70 352H154M82 340h24v8H82zM118 340h24v8h-24z" />
        {/* bath */}
        <rect x="228" y="382" width="64" height="50" rx="14" />
        <circle cx="282" cy="338" r="8" />
        {/* master */}
        <rect x="474" y="292" width="76" height="102" />
        <path d="M474 310H550M486 298h22v8h-22zM516 298h22v8h-22z" />
        <rect x="448" y="160" width="104" height="20" />
        {/* entry bench */}
        <rect x="312" y="414" width="18" height="20" />
      </g>
      {/* Dimension strings */}
      <path
        className="p-dim"
        d="M40 14H560 M36 18L44 10M296 18L304 10M556 18L564 10
           M14 40V440 M10 44L18 36M10 264L18 256M10 444L18 436
           M40 476H207 M40 470V482M73 470V482M207 470V482"
      />
      <rect className="p-scale" x="40" y="473" width="33" height="6" />
      {/* North point */}
      <g className="p-dim">
        <circle cx="592" cy="470" r="12" />
        <path d="M592 455L598 474L592 470L586 474Z" />
      </g>

      {/* Text */}
      <g className="p-text">
        <text x="170" y="9" textAnchor="middle">7.80</text>
        <text x="430" y="9" textAnchor="middle">7.80</text>
        <text x="9" y="150" textAnchor="middle" transform="rotate(-90 9 150)">6.60</text>
        <text x="9" y="350" textAnchor="middle" transform="rotate(-90 9 350)">5.40</text>
        <text x="40" y="496">0</text>
        <text x="70" y="496">1</text>
        <text x="200" y="496">5 m</text>
        <text x="592" y="447" textAnchor="middle">N</text>

        <text className="p-room" x="54" y="244">Living · 48 m²</text>
        <text className="p-room" x="448" y="138">Kitchen · 22 m²</text>
        <text className="p-room" x="312" y="262">Patio</text>
        <text className="p-room" x="54" y="306">Bed 01 · 16 m²</text>
        <text className="p-room" x="228" y="372">Bath</text>
        <text className="p-room" x="312" y="300">Entry</text>
        <text className="p-room" x="452" y="428">Main bed · 26 m²</text>
        <text className="p-room p-accent" x="226" y="292">↗ Up to roof</text>
      </g>
    </svg>
  )
}
