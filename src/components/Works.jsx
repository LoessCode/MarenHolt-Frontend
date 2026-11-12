import { useRef } from 'react'
import { gsap, useGSAP, EASE } from '../lib/motion'
import { WORKS } from '../data/content'
import { IMAGES } from '../data/images'

/*
 * Selected work: an index list. On hover a portrait follows the cursor with
 * inertia, leaning into the direction of travel; images swap with a vertical
 * wipe. On touch screens each row shows its own thumbnail instead.
 */
export default function Works({ srcs }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const el = root.current
      const float = el.querySelector('.float')
      const items = gsap.utils.toArray('.float__item', el)
      const rows = gsap.utils.toArray('.work', el)
      const mm = gsap.matchMedia()

      // Row entrance
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        rows.forEach((r) => {
          gsap
            .timeline({ scrollTrigger: { trigger: r, start: 'top 92%' } })
            .from(r.querySelector('.work__rule'), { scaleX: 0, duration: 1.4, ease: EASE.inOut })
            .from(r.querySelectorAll('.work__in'), { yPercent: 105, duration: 1.2, ease: EASE.out, stagger: 0.05 }, 0.15)
        })
        gsap.from(el.querySelectorAll('.works__head .reveal-up'), {
          yPercent: 110,
          duration: 1.3,
          ease: EASE.out,
          stagger: 0.08,
          scrollTrigger: { trigger: '.works__head', start: 'top 85%' },
        })
      })

      // Cursor-follow preview (fine pointers only)
      mm.add('(hover: hover) and (pointer: fine)', () => {
        gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 })
        gsap.set(items, { clipPath: 'inset(100% 0% 0% 0%)' })
        const qx = gsap.quickTo(float, 'x', { duration: 0.75, ease: 'power3.out' })
        const qy = gsap.quickTo(float, 'y', { duration: 0.75, ease: 'power3.out' })
        const qr = gsap.quickTo(float, 'rotation', { duration: 0.9, ease: 'power3.out' })
        let lastX = null
        let vel = 0
        let current = -1

        const onMove = (e) => {
          qx(e.clientX)
          qy(e.clientY)
          if (lastX !== null) vel += e.clientX - lastX
          lastX = e.clientX
        }
        // Lean follows horizontal velocity and settles back to upright.
        const lean = () => {
          vel *= Math.pow(0.82, gsap.ticker.deltaRatio(60))
          qr(gsap.utils.clamp(-10, 10, vel * 0.3))
        }
        gsap.ticker.add(lean)
        const show = (i) => {
          if (i === current) return
          const prev = current
          current = i
          gsap.set(items[i], { zIndex: 2 })
          gsap.fromTo(
            items[i],
            { clipPath: prev < 0 || prev < i ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: EASE.out, overwrite: true },
          )
          gsap.fromTo(items[i].querySelector('img'), { scale: 1.35 }, { scale: 1, duration: 1.1, ease: EASE.out, overwrite: true })
          if (prev >= 0) {
            gsap.set(items[prev], { zIndex: 1 })
            gsap.to(items[prev], { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, onComplete: () => current !== prev && gsap.set(items[prev], { clipPath: 'inset(100% 0% 0% 0%)' }) })
          }
          gsap.to(float.querySelector('.float__label'), { autoAlpha: 1, duration: 0.3 })
        }
        const enterList = (e) => {
          qx(e.clientX)
          qy(e.clientY)
          gsap.to(float, { autoAlpha: 1, scale: 1, duration: 0.7, ease: EASE.out })
        }
        const leaveList = () => {
          gsap.to(float, { autoAlpha: 0, scale: 0.6, duration: 0.5, ease: 'power3.in' })
          if (current >= 0) gsap.set(items[current], { clipPath: 'inset(100% 0% 0% 0%)', delay: 0.5 })
          current = -1
        }

        const list = el.querySelector('.works__list')
        list.addEventListener('pointermove', onMove)
        list.addEventListener('pointerenter', enterList)
        list.addEventListener('pointerleave', leaveList)
        const handlers = rows.map((r, i) => {
          const h = () => show(i)
          r.addEventListener('pointerenter', h)
          return h
        })
        return () => {
          gsap.ticker.remove(lean)
          list.removeEventListener('pointermove', onMove)
          list.removeEventListener('pointerenter', enterList)
          list.removeEventListener('pointerleave', leaveList)
          rows.forEach((r, i) => r.removeEventListener('pointerenter', handlers[i]))
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="works" id="work" ref={root} data-nav="dark">
      <header className="sec-head sec-head--dark">
        <span className="mono sec-head__idx">(02)</span>
        <span className="mono sec-head__title">Selected Work</span>
        <span className="mono sec-head__aside">2020 — 2024</span>
        <span className="rule" />
      </header>

      <div className="works__head">
        <h2>
          <span className="mask">
            <span className="reveal-up">Six buildings,</span>
          </span>
          <span className="mask">
            <span className="reveal-up">
              <em>one patient way</em> of making.
            </span>
          </span>
        </h2>
        <p className="works__lede">
          A small selection from 142 completed projects. Each began with a long walk on the site — most with the same
          clients who still call us years later.
        </p>
      </div>

      <ul className="works__list">
        {WORKS.map((w, i) => (
          <li className="work" key={w.key}>
            <a href="#contact" onClick={(e) => e.preventDefault()}>
              <span className="work__rule" />
              <span className="work__cell work__idx mono">
                <span className="work__in">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <span className="work__cell work__title">
                <span className="work__in">{w.title}</span>
              </span>
              <span className="work__cell work__type mono">
                <span className="work__in">{w.type}</span>
              </span>
              <span className="work__cell work__place mono">
                <span className="work__in">{w.place}</span>
              </span>
              <span className="work__cell work__year mono">
                <span className="work__in">{w.year}</span>
              </span>
              <span className="work__thumb" aria-hidden="true">
                <img src={srcs[w.key]} alt="" loading="lazy" />
              </span>
              <span className="work__arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M2 16L16 2M5 2h11v11" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="float" aria-hidden="true">
        {WORKS.map((w) => (
          <div className="float__item" key={w.key}>
            <img src={srcs[w.key]} alt={IMAGES[w.key].alt} />
          </div>
        ))}
        <span className="float__label mono">View project</span>
      </div>
    </section>
  )
}
