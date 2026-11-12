/**
 * The mark is a plan-drawing door swing: a room outline with an opening,
 * the leaf, and its quarter-circle arc — the first thing an architect draws.
 */
export function LogoMark({ className = '', size = 30 }) {
  return (
    <svg
      className={`logo-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path className="lm-wall" pathLength="1" d="M10.5 26.5H4.5V4.5h23v22h-6.5" />
      <path className="lm-leaf" pathLength="1" d="M10.5 26.5V16" />
      <path className="lm-arc" pathLength="1" d="M10.5 16a10.5 10.5 0 0 1 10.5 10.5" strokeDasharray="0.04 0.04" />
    </svg>
  )
}

export default function Logo({ onClick }) {
  return (
    <a className="logo" href="#top" onClick={onClick} aria-label="Maren Holt Studio — home">
      <LogoMark />
      <span className="logo__type">
        <span className="logo__name">Maren Holt</span>
        <span className="logo__sub">Architecture &amp; Interiors</span>
      </span>
    </a>
  )
}
