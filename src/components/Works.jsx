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

      // Cursor-follow preview (fine pointers only).
      //
      // Which row is "hovered" is worked out from geometry — the last known
      // cursor position against the row rects — on every pointer move AND every
      // scroll. Browsers don't fire enter/leave events while content scrolls
      // under a still cursor, so relying on them leaves the card stranded on
      // screen and makes it swap in bursts during fast scrolling.
      mm.add('(hover: hover) and (pointer: fine)', () => {
        const list = el.querySelector('.works__list')
        const label = float.querySelector('.float__label')
        const imgs = items.map((it) => it.querySelector('img'))
        const HIDDEN = 'inset(100% 0% 0% 0%)'
        const FAST_SCROLL = 22 // px per 60fps frame — above this the card steps aside

        gsap.set(float, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 })
        gsap.set(items, { clipPath: HIDDEN, zIndex: 1 })
        const qx = gsap.quickTo(float, 'x', { duration: 0.75, ease: 'power3.out' })
        const qy = gsap.quickTo(float, 'y', { duration: 0.75, ease: 'power3.out' })
        const qr = gsap.quickTo(float, 'rotation', { duration: 0.9, ease: 'power3.out' })

        const pointer = { x: 0, y: 0, known: false }
        let lastX = null
        let vel = 0
        let current = -1
        let visible = false

        const reveal = () => {
          if (visible) return
          visible = true
          list.classList.add('is-hovering')
          // Appear at the cursor rather than flying in from where it last was.
          qx(pointer.x, pointer.x)
          qy(pointer.y, pointer.y)
          gsap.to(float, { autoAlpha: 1, scale: 1, duration: 0.7, ease: EASE.out, overwrite: 'auto' })
          gsap.to(label, { autoAlpha: 1, duration: 0.3, overwrite: 'auto' })
        }

        const conceal = () => {
          if (!visible) return
          visible = false
          current = -1
          list.classList.remove('is-hovering')
          rows.forEach((r) => r.classList.remove('is-active'))
          gsap.to(float, {
            autoAlpha: 0,
            scale: 0.6,
            duration: 0.45,
            ease: 'power3.in',
            overwrite: 'auto',
            // Reset the stack only if we're still hidden once the fade is done.
            onComplete: () => {
              if (visible) return
              gsap.killTweensOf(items)
              gsap.set(items, { clipPath: HIDDEN, zIndex: 1 })
            },
          })
        }

        const show = (i) => {
          if (i === current) return
          const prev = current
          current = i
          rows.forEach((r, k) => r.classList.toggle('is-active', k === i))
          // Stack: everything else at the bottom, the outgoing image in the
          // middle (stays fully drawn underneath), the incoming one on top.
          items.forEach((it, k) => gsap.set(it, { zIndex: k === i ? 3 : k === prev ? 2 : 1 }))
          gsap.killTweensOf([items[i], imgs[i]])
          gsap.fromTo(
            items[i],
            { clipPath: prev < 0 || prev < i ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.75,
              ease: EASE.out,
              // Once covered, clear the images underneath so none linger.
              onComplete: () => {
                if (current !== i) return
                items.forEach((it, k) => k !== i && gsap.set(it, { clipPath: HIDDEN }))
              },
            },
          )
          gsap.fromTo(imgs[i], { scale: 1.35 }, { scale: 1, duration: 1.1, ease: EASE.out })
        }

        // Hit-test the cursor against the list and its rows.
        const sync = (fast = false) => {
          if (!pointer.known) return
          const box = list.getBoundingClientRect()
          const inside =
            pointer.x >= box.left && pointer.x <= box.right && pointer.y >= box.top && pointer.y <= box.bottom
          if (!inside || fast) return conceal()
          const i = rows.findIndex((r) => {
            const b = r.getBoundingClientRect()
            return pointer.y >= b.top && pointer.y < b.bottom
          })
          if (i < 0) return // on a hairline between rows: keep what's showing
          reveal()
          show(i)
        }

        const onMove = (e) => {
          if (e.pointerType === 'touch') return
          pointer.x = e.clientX
          pointer.y = e.clientY
          pointer.known = true
          if (visible) {
            qx(e.clientX)
            qy(e.clientY)
          }
          if (lastX !== null) vel += e.clientX - lastX
          lastX = e.clientX
          sync()
        }
        // Scroll events stop once the page settles — re-check then, so a card
        // hidden for a fast scroll comes back if the cursor ends up on a row.
        const settle = gsap.delayedCall(0.12, () => sync()).pause()
        let lastScrollY = window.scrollY
        let lastScrollT = performance.now()
        const onScroll = () => {
          const now = performance.now()
          const speed = (Math.abs(window.scrollY - lastScrollY) / Math.max(now - lastScrollT, 1)) * 16.67
          lastScrollY = window.scrollY
          lastScrollT = now
          sync(speed > FAST_SCROLL)
          settle.restart(true)
        }
        const onResize = () => sync()
        const onLeaveWindow = () => {
          pointer.known = false
          lastX = null
          conceal()
        }

        // Lean follows horizontal velocity and settles back to upright.
        const lean = () => {
          vel *= Math.pow(0.82, gsap.ticker.deltaRatio(60))
          qr(gsap.utils.clamp(-10, 10, vel * 0.3))
        }

        gsap.ticker.add(lean)
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        window.addEventListener('blur', onLeaveWindow)
        document.documentElement.addEventListener('pointerleave', onLeaveWindow)
        return () => {
          gsap.ticker.remove(lean)
          window.removeEventListener('pointermove', onMove)
          window.removeEventListener('scroll', onScroll)
          settle.kill()
          window.removeEventListener('resize', onResize)
          window.removeEventListener('blur', onLeaveWindow)
          document.documentElement.removeEventListener('pointerleave', onLeaveWindow)
          list.classList.remove('is-hovering')
          rows.forEach((r) => r.classList.remove('is-active'))
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
