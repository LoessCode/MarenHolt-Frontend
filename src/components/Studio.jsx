import { useRef, useState } from 'react'
import { gsap, useGSAP, EASE } from '../lib/motion'
import { METRICS, TYPOLOGY } from '../data/content'
import { IMAGES } from '../data/images'
import FloorPlan from './FloorPlan'

const STATEMENT = [
  'Maren Holt Studio',
  { img: 'studio01' },
  'is an architecture and interiors practice working between Lisbon and Copenhagen. For seventeen years we have drawn houses, hotels and reading rooms that begin with the site',
  { img: 'studio03' },
  'and its light — and are then built slowly, with craftspeople, from stone, lime and timber that will age better than we do.',
]

function Odometer({ value }) {
  const digits = String(value).split('')
  return (
    <span className="odo" aria-label={String(value)}>
      {digits.map((d, i) => (
        <span className="odo__col" key={i} aria-hidden="true">
          <span className="odo__strip" data-d={d}>
            {Array.from({ length: 20 }, (_, k) => (
              <span key={k}>{k % 10}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  )
}

function Typology() {
  const [active, setActive] = useState(null)
  const total = 142
  const a = active == null ? null : TYPOLOGY[active]
  return (
    <div className="typo">
      <div className="typo__head">
        <span className="mono">Fig. 04 — Completed work by typology</span>
        <span className="typo__readout" aria-live="polite">
          {a ? (
            <>
              <b>{a.label}</b> — {a.value}% · {Math.round((a.value / 100) * total)} of {total} projects
            </>
          ) : (
            <span className="mono">Hover a segment</span>
          )}
        </span>
      </div>
      <div className="typo__bar" onMouseLeave={() => setActive(null)}>
        {TYPOLOGY.map((t, i) => (
          <button
            key={t.label}
            className={`typo__seg ${active != null && active !== i ? 'is-dim' : ''}`}
            style={{ flexGrow: t.value, '--c': t.color }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            aria-label={`${t.label}: ${t.value} percent`}
          >
            <span className="typo__fill" />
          </button>
        ))}
      </div>
      <div className="typo__legend">
        {TYPOLOGY.map((t, i) => (
          <div
            key={t.label}
            className={`typo__key ${active === i ? 'is-on' : ''}`}
            style={{ flexGrow: t.value, '--c': t.color }}
          >
            <i />
            <span className="typo__pct">{t.value}%</span>
            <span className="typo__lbl">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Studio({ srcs }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const el = root.current
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Section heading rules
        gsap.utils.toArray('.rule', el).forEach((r) =>
          gsap.from(r, {
            scaleX: 0,
            duration: 1.6,
            ease: EASE.inOut,
            scrollTrigger: { trigger: r, start: 'top 92%' },
          }),
        )
        gsap.utils.toArray('.reveal-up', el).forEach((r) =>
          gsap.from(r, {
            yPercent: 110,
            duration: 1.3,
            ease: EASE.out,
            scrollTrigger: { trigger: r.parentElement, start: 'top 90%' },
          }),
        )

        // Statement: words brighten as you read, inline images open up.
        const words = el.querySelectorAll('.statement .w')
        const pics = el.querySelectorAll('.statement .inl')
        const st = { trigger: '.statement', start: 'top 82%', end: 'bottom 45%', scrub: 0.6 }
        gsap.fromTo(words, { opacity: 0.14 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: st })
        pics.forEach((p) =>
          gsap.fromTo(
            p,
            { width: 0 },
            {
              width: '2.1em',
              ease: 'power2.inOut',
              scrollTrigger: { trigger: p, start: 'top 88%', end: 'top 60%', scrub: 0.8 },
            },
          ),
        )

        // Floor plan draws itself.
        const plan = el.querySelector('.plan')
        const strokes = plan.querySelectorAll('path, rect, circle')
        strokes.forEach((s) => {
          const len = s.getTotalLength?.() || 400
          s.style.strokeDasharray = s.getAttribute('stroke-dasharray') ? s.getAttribute('stroke-dasharray') : `${len} ${len}`
          s.dataset.len = len
        })
        const solid = [...strokes].filter((s) => !s.getAttribute('stroke-dasharray'))
        const dashed = [...strokes].filter((s) => s.getAttribute('stroke-dasharray'))
        const order = ['.p-wall-ext', '.p-wall-int', '.p-win', '.p-door', '.p-furn *', '.p-dim, .p-dim *']
        const ptl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: plan, start: 'top 78%', end: 'bottom 55%', scrub: 0.9 },
        })
        order.forEach((sel, i) => {
          const els = solid.filter((s) => s.matches(sel))
          ptl.fromTo(
            els,
            { strokeDashoffset: (j, t) => t.dataset.len },
            { strokeDashoffset: 0, duration: 1, stagger: 0.04 },
            i * 0.55,
          )
        })
        ptl.fromTo(dashed, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.4)
        ptl.fromTo('.p-scale', { fillOpacity: 0 }, { fillOpacity: 1, duration: 0.5 }, 3)
        ptl.fromTo(plan.querySelectorAll('.p-text text'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.05 }, 2.6)
        ptl.fromTo('.plan-card__stamp', { opacity: 0, rotate: -14, scale: 1.4 }, { opacity: 1, rotate: -8, scale: 1, duration: 0.5, ease: 'back.out(2)' }, 3.6)

        // Metrics: rules draw, odometers roll.
        gsap.utils.toArray('.metric', el).forEach((m, i) => {
          const strips = m.querySelectorAll('.odo__strip')
          const tl = gsap.timeline({ scrollTrigger: { trigger: m, start: 'top 86%' } })
          tl.from(m.querySelector('.metric__rule'), { scaleX: 0, duration: 1.4, ease: EASE.inOut }, (i % 2) * 0.12)
            .fromTo(
              strips,
              { yPercent: 0 },
              {
                yPercent: (j, t) => -(10 + Number(t.dataset.d)) * 5,
                duration: (j) => 2.2 + (strips.length - j) * 0.25,
                ease: 'expo.out',
              },
              0.15 + (i % 2) * 0.12,
            )
            .from(m.querySelectorAll('.metric__fade'), { autoAlpha: 0, y: 10, duration: 1, stagger: 0.08, ease: EASE.out }, 0.5)
        })

        // Images: clip reveal + inner parallax.
        gsap.utils.toArray('.frame', el).forEach((f) => {
          const img = f.querySelector('img')
          gsap.fromTo(
            f,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.6,
              ease: EASE.inOut,
              scrollTrigger: { trigger: f, start: 'top 88%' },
            },
          )
          gsap.fromTo(
            img,
            { yPercent: -9, scale: 1.12 },
            {
              yPercent: 9,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: { trigger: f, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })

        // Typology bar grows segment by segment.
        gsap.from('.typo__fill', {
          scaleX: 0,
          duration: 1.2,
          ease: EASE.inOut,
          stagger: 0.12,
          scrollTrigger: { trigger: '.typo', start: 'top 85%' },
        })
      })

      // Reduced motion: show numbers immediately.
      mm.add('(prefers-reduced-motion: reduce)', () => {
        el.querySelectorAll('.odo__strip').forEach((s) => gsap.set(s, { yPercent: -(10 + Number(s.dataset.d)) * 5 }))
      })
    },
    { scope: root },
  )

  let wordKey = 0
  return (
    <section className="studio" id="studio" ref={root}>
      <header className="sec-head">
        <span className="mono sec-head__idx">(01)</span>
        <span className="mono sec-head__title">The Studio</span>
        <span className="mono sec-head__aside">Practice — Numbers — Method</span>
        <span className="rule" />
      </header>

      <p className="statement">
        {STATEMENT.map((part) =>
          typeof part === 'string' ? (
            part.split(' ').map((w) => (
              <span className="w" key={wordKey++}>
                {w}{' '}
              </span>
            ))
          ) : (
            <span className="inl" key={wordKey++} aria-hidden="true">
              <img src={srcs[part.img]} alt="" />
            </span>
          ),
        )}
      </p>

      <div className="studio__grid">
        <figure className="plan-card">
          <div className="plan-card__top mono">
            <span>Casa Sul — Ground floor</span>
            <span>Drg. 07 · Rev C</span>
          </div>
          <FloorPlan />
          <span className="plan-card__stamp mono" aria-hidden="true">
            Built
            <br />
            2024
          </span>
          <figcaption className="plan-card__cap">
            <span className="mono">Fig. 02</span>
            <span>
              A house organised around a single patio: every room borrows its light, and the olive tree is visible from
              each threshold.
            </span>
          </figcaption>
        </figure>

        <div className="metrics">
          <div className="metrics__intro">
            <span className="mono">Fig. 03 — The practice in numbers</span>
            <p>
              Small enough that a partner draws every project. Established enough to see one through from first sketch
              to the last brass fitting.
            </p>
          </div>
          {METRICS.map((m, i) => (
            <div className="metric" key={m.label}>
              <span className="metric__rule" />
              <span className="metric__idx mono metric__fade">M.{String(i + 1).padStart(2, '0')}</span>
              <div className="metric__num">
                <Odometer value={m.value} />
                {m.unit && <span className="metric__unit">{m.unit}</span>}
              </div>
              <span className="metric__label metric__fade">{m.label}</span>
              <span className="metric__note metric__fade">{m.note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="gallery">
        <figure className="gallery__a">
          <div className="frame frame--tall">
            <img src={srcs.studio02} alt={IMAGES.studio02.alt} />
          </div>
          <figcaption className="cap mono">
            <span>Fig. 05</span>
            <span>Lime plaster, hand-trowelled — Casa Sul</span>
          </figcaption>
        </figure>
        <div className="gallery__text">
          <span className="mono">Method</span>
          <h3>
            <span className="mask">
              <span className="reveal-up">Material first,</span>
            </span>
            <span className="mask">
              <span className="reveal-up">
                <em>form second.</em>
              </span>
            </span>
          </h3>
          <p>
            Every project begins on the big oak table in Lisbon — stone offcuts, plaster tests, timber samples left out in
            the sun for a month. We choose the materials before we draw the walls, then let them decide the details.
          </p>
          <ol className="steps">
            {['Site & light study', 'Material library', 'Drawing & model', 'Built with makers'].map((s, i) => (
              <li key={s}>
                <span className="mono">0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <figure className="gallery__b">
          <div className="frame frame--square">
            <img src={srcs.studio01} alt={IMAGES.studio01.alt} />
          </div>
          <figcaption className="cap mono">
            <span>Fig. 06</span>
            <span>Material library, Lisbon studio</span>
          </figcaption>
        </figure>
      </div>

      <figure className="feature">
        <div className="frame frame--wide">
          <img src={srcs.studio03} alt={IMAGES.studio03.alt} />
          <div className="feature__overlay">
            <span className="mono">In progress — 2026</span>
            <span className="feature__title">
              The Meadow Pavilion, <em>Alentejo</em>
            </span>
          </div>
        </div>
      </figure>

      <Typology />
    </section>
  )
}
