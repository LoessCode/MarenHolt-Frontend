import { useRef, useState } from 'react'
import { gsap, useGSAP, EASE } from '../lib/motion'
import { SLIDES } from '../data/content'
import { IMAGES } from '../data/images'

/*
 * Hero
 * ────
 * 1. A full-bleed slideshow. Slides change with a "louvre" wipe: the incoming
 *    image is cut into vertical strips that open alternately from top/bottom.
 * 2. On scroll the hero pins, and the image is split by an SVG clipPath into
 *    six columns of different heights standing on a shared ground line —
 *    the photo becomes an elevation drawing, complete with structural grid
 *    bubbles (A–F) and a hatched ground section.
 */

const STRIPS = 6 // slideshow transition strips
const COLS = 6 // scroll louvre columns
const SLIDE_DURATION = 6.5

// Final elevation geometry (fractions of the hero box)
const SIDE = 0.034
const GAP = 0.014
const BASE = 0.885
const TOPS = [0.4, 0.27, 0.47, 0.33, 0.43, 0.24]
const COL_W = (1 - SIDE * 2 - GAP * (COLS - 1)) / COLS
const colX = (i) => SIDE + i * (COL_W + GAP)
const AXIS_TOP = 0.15

const stripClip = (i, state) => {
  const L = (i * 100) / STRIPS - 0.06
  const R = 100 - ((i + 1) * 100) / STRIPS - 0.06
  if (state === 'open') return `inset(0% ${R}% 0% ${L}%)`
  return i % 2 ? `inset(100% ${R}% 0% ${L}%)` : `inset(0% ${R}% 100% ${L}%)`
}

export default function Hero({ srcs, play }) {
  const root = useRef(null)
  const api = useRef({})
  const [idx, setIdx] = useState(0)
  const slide = SLIDES[idx]

  // ── Setup: slideshow engine, mouse parallax, scroll louvres ──────────────
  useGSAP(
    () => {
      const el = root.current
      const slides = gsap.utils.toArray('.hero__slide', el)
      const fills = gsap.utils.toArray('.hero__seg i', el)
      let cur = 0
      let busy = false
      let progress = null
      let inView = true

      gsap.set(slides, { autoAlpha: 0, zIndex: 1 })
      gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 })
      gsap.set(fills, { scaleX: 0 })

      const run = () => {
        fills.forEach((f, i) => gsap.set(f, { scaleX: i < cur ? 1 : 0 }))
        progress = gsap.to(fills[cur], {
          scaleX: 1,
          duration: SLIDE_DURATION,
          ease: 'none',
          paused: !inView,
          onComplete: () => goTo((cur + 1) % slides.length),
        })
      }

      const goTo = (n) => {
        if (busy || n === cur) return
        busy = true
        progress?.kill()
        const inc = slides[n]
        const out = slides[cur]
        const strips = inc.querySelectorAll('.hero__strip')
        const prev = cur
        strips.forEach((s, i) => gsap.set(s, { clipPath: stripClip(i, 'closed') }))
        gsap.set(inc, { autoAlpha: 1, zIndex: 3 })
        gsap.set(inc.querySelector('.hero__dim'), { opacity: 0 })
        fills.forEach((f, i) => gsap.to(f, { scaleX: i < n ? 1 : 0, duration: 0.6, ease: EASE.soft }))
        setIdx(n)

        gsap
          .timeline({
            onComplete: () => {
              gsap.set(out, { autoAlpha: 0, zIndex: 1 })
              gsap.set(out.querySelectorAll('img'), { scale: 1 })
              gsap.set(inc, { zIndex: 2 })
              gsap.set(strips, { clipPath: 'none' })
              busy = false
              cur = n
              run()
            },
          })
          .to(strips, {
            clipPath: (i) => stripClip(i, 'open'),
            duration: 1.5,
            ease: 'expo.inOut',
            stagger: { each: 0.07, from: prev < n ? 'start' : 'end' },
          })
          .fromTo(inc.querySelectorAll('img'), { scale: 1.24 }, { scale: 1, duration: 2.6, ease: 'expo.out' }, 0.2)
          .to(out.querySelectorAll('img'), { scale: 1.08, duration: 1.7, ease: 'power2.inOut' }, 0)
          .to(out.querySelector('.hero__dim'), { opacity: 0.5, duration: 1.4, ease: 'power2.inOut' }, 0)
      }

      api.current.start = run
      api.current.goTo = goTo
      api.current.setInView = (v) => {
        inView = v
        if (progress) v ? progress.resume() : progress.pause()
      }

      // Mouse parallax — slow, heavy, a few pixels only.
      const par = el.querySelector('.hero__parallax')
      const qx = gsap.quickTo(par, 'xPercent', { duration: 1.6, ease: 'power3.out' })
      const qy = gsap.quickTo(par, 'yPercent', { duration: 1.6, ease: 'power3.out' })
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        qx(((e.clientX - r.left) / r.width - 0.5) * -2.2)
        qy(((e.clientY - r.top) / r.height - 0.5) * -1.6)
      }
      el.addEventListener('pointermove', onMove)

      // Scroll: pin and break the image into an elevation.
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const rects = gsap.utils.toArray('#hero-louvre rect')
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=115%',
            pin: true,
            scrub: 1,
            onToggle: (self) => api.current.setInView(self.isActive || self.progress < 1),
          },
        })
        tl.to('.hero__content', { yPercent: -18, autoAlpha: 0, duration: 0.32, ease: 'power2.in' }, 0)
          .to('.hero__aside', { autoAlpha: 0, duration: 0.2 }, 0)
          .to('.hero__shade', { autoAlpha: 0, duration: 0.45 }, 0.05)
          .fromTo(par, { scale: 1 }, { scale: 1.12, duration: 1 }, 0)
        rects.forEach((r, i) => {
          tl.to(
            r,
            { attr: { x: colX(i), width: COL_W, y: TOPS[i], height: BASE - TOPS[i] }, duration: 0.62, ease: 'power3.inOut' },
            0.08 + Math.abs(i - (COLS - 1) / 2) * 0.05,
          )
        })
        tl.fromTo('.hero__ground', { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out' }, 0.45)
          .fromTo('.hero__hatch', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.4 }, 0.55)
          .fromTo(
            '.hero__axis',
            { autoAlpha: 0, yPercent: -4 },
            { autoAlpha: 1, yPercent: 0, duration: 0.25, stagger: 0.035, ease: 'power2.out' },
            0.6,
          )
          .fromTo('.hero__elev', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.75)
          .to({}, { duration: 0.18 })
      })

      return () => {
        el.removeEventListener('pointermove', onMove)
        mm.revert()
      }
    },
    { scope: root },
  )

  // ── Intro after the preloader ────────────────────────────────────────────
  useGSAP(
    () => {
      const el = root.current
      if (!play) {
        gsap.set(el.querySelectorAll('.hero__content .line > span'), { yPercent: 115 })
        gsap.set(el.querySelectorAll('.hero__fade'), { autoAlpha: 0, y: 14 })
        gsap.set(el.querySelector('.hero__intro'), { scale: 1.32 })
        return
      }
      gsap
        .timeline({ onComplete: () => api.current.start?.() })
        .to(el.querySelector('.hero__intro'), { scale: 1, duration: 2.4, ease: EASE.out }, 0)
        .to(el.querySelectorAll('.hero__content .line > span'), { yPercent: 0, duration: 1.4, ease: EASE.out, stagger: 0.09 }, 0.35)
        .to(el.querySelectorAll('.hero__fade'), { autoAlpha: 1, y: 0, duration: 1.1, ease: EASE.out, stagger: 0.07 }, 0.8)
    },
    { dependencies: [play], scope: root },
  )

  return (
    <section className="hero" id="top" ref={root} aria-label="Introduction">
      <svg className="hero__defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="hero-louvre" clipPathUnits="objectBoundingBox">
            {Array.from({ length: COLS }, (_, i) => (
              <rect key={i} x={i / COLS - 0.001} y="0" width={1 / COLS + 0.002} height="1" />
            ))}
          </clipPath>
        </defs>
      </svg>

      <div className="hero__media">
        <div className="hero__intro">
          <div className="hero__parallax">
            {SLIDES.map((s) => (
              <div className="hero__slide" key={s.key}>
                {Array.from({ length: STRIPS }, (_, j) => (
                  <div className="hero__strip" key={j}>
                    <img
                      src={srcs[s.key]}
                      alt={j === 0 ? IMAGES[s.key].alt : ''}
                      aria-hidden={j > 0 || undefined}
                      draggable="false"
                    />
                  </div>
                ))}
                <div className="hero__dim" />
              </div>
            ))}
          </div>
        </div>
        <div className="hero__shade" />
      </div>

      {/* Elevation drawing overlay, revealed on scroll */}
      <div className="hero__drawing" aria-hidden="true">
        {TOPS.map((top, i) => (
          <div className="hero__axis" key={i} style={{ left: `${(colX(i) + COL_W / 2) * 100}%` }}>
            <span className="hero__bubble" style={{ top: `${AXIS_TOP * 100}%` }}>
              {'ABCDEF'[i]}
            </span>
            <span className="hero__axisline" style={{ top: `calc(${AXIS_TOP * 100}% + 30px)`, bottom: `${(1 - top) * 100}%` }} />
          </div>
        ))}
        <div className="hero__ground" style={{ top: `${BASE * 100}%`, left: `${SIDE * 50}%`, right: `${SIDE * 50}%` }} />
        <div className="hero__hatch" style={{ top: `${BASE * 100}%`, left: `${SIDE * 50}%`, right: `${SIDE * 50}%` }} />
        <div className="hero__elev mono" style={{ top: `calc(${BASE * 100}% + 22px)` }}>
          <span>Elev. A — South facade, 1:500</span>
          <span className="hero__elev-name" key={idx}>
            {String(idx + 1).padStart(2, '0')} — {slide.name}, {slide.place}
          </span>
          <span>Scroll to enter the studio ↓</span>
        </div>
      </div>

      <div className="hero__content">
        <p className="hero__kicker mono">
          <span className="line">
            <span>(Est. 2009) — Architecture &amp; Interiors — Lisbon · Copenhagen</span>
          </span>
        </p>
        <h1 className="hero__title">
          <span className="line">
            <span>Rooms that</span>
          </span>
          <span className="line">
            <span>
              <em>hold</em> the light.
            </span>
          </span>
        </h1>
        <div className="hero__bottom">
          <p className="hero__lede hero__fade">
            A practice of fourteen architects and makers designing houses, hotels and quiet public rooms — built slowly,
            from materials that age well.
          </p>
          <div className="hero__meta hero__fade">
            <div className="hero__meta-row mono">
              <span className="swap" key={`i${idx}`}>
                <span>
                  {String(idx + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                </span>
              </span>
              <span className="swap" key={`t${idx}`}>
                <span>{slide.type}</span>
              </span>
            </div>
            <div className="hero__meta-name">
              <span className="swap" key={`n${idx}`}>
                <span>{slide.name}</span>
              </span>
            </div>
            <div className="hero__meta-row mono">
              <span className="swap" key={`p${idx}`}>
                <span>{slide.place}</span>
              </span>
              <span className="swap" key={`y${idx}`}>
                <span>{slide.year}</span>
              </span>
            </div>
            <div className="hero__segs" role="tablist" aria-label="Featured projects">
              {SLIDES.map((s, i) => (
                <button
                  key={s.key}
                  className={`hero__seg ${i === idx ? 'is-active' : ''}`}
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={`Show ${s.name}`}
                  onClick={() => api.current.goTo?.(i)}
                >
                  <i />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero__aside" aria-hidden="true">
      <div className="hero__coords mono hero__fade">
        <span className="swap" key={`c${idx}`}>
          <span>{slide.coords}</span>
        </span>
      </div>
      <div className="hero__scroll mono hero__fade">
        <span>Scroll</span>
        <i />
      </div>
      </div>
    </section>
  )
}
