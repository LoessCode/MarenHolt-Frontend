import { useEffect, useRef } from 'react'
import { gsap, EASE, prefersReducedMotion } from '../lib/motion'
import { LogoMark } from './Logo'

const MIN_DURATION = 1.7 // seconds — long enough to read as intentional, short enough to not annoy

export default function Preloader({ progress, ready, onDone }) {
  const root = useRef(null)
  const counter = useRef(null)
  const bar = useRef(null)
  const state = useRef({ shown: 0, start: performance.now(), loaded: 0, ready: false, exiting: false })
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  state.current.loaded = progress
  state.current.ready = ready

  useEffect(() => {
    const el = root.current
    const s = state.current
    const reduced = prefersReducedMotion()
    const mark = el.querySelectorAll('.logo-mark path')

    gsap.set(mark, { strokeDashoffset: 1, strokeDasharray: (i) => (i === 2 ? '0.04 0.04' : '1 1') })
    gsap.from(el.querySelectorAll('.pre__line > span'), {
      yPercent: 110,
      duration: 1.1,
      ease: EASE.out,
      stagger: 0.08,
      delay: 0.1,
    })

    const tick = () => {
      const t = Math.min(1, (performance.now() - s.start) / 1000 / MIN_DURATION)
      // Time drives the count; it holds at 88 until the first image has landed.
      const timePct = (reduced ? 1 : t) * 100
      const target = s.ready ? timePct : Math.min(timePct, 60 + s.loaded * 28)
      s.shown += (target - s.shown) * (1 - Math.pow(0.88, gsap.ticker.deltaRatio(60))) // frame-rate independent
      if (target - s.shown < 0.4) s.shown = target
      const v = Math.round(s.shown)
      counter.current.textContent = String(v).padStart(3, '0')
      bar.current.style.transform = `scaleX(${s.shown / 100})`
      gsap.set(mark[0], { strokeDashoffset: 1 - Math.min(1, s.shown / 70) })
      gsap.set(mark[1], { strokeDashoffset: 1 - gsap.utils.clamp(0, 1, (s.shown - 60) / 20) })
      gsap.set(mark[2], { opacity: gsap.utils.clamp(0, 1, (s.shown - 78) / 20) })
      if (v >= 100 && s.ready && !s.exiting) exit()
    }

    const exit = () => {
      s.exiting = true
      gsap.ticker.remove(tick)
      const tl = gsap.timeline({ onComplete: () => el.remove() })
      tl.to(el.querySelectorAll('.pre__line > span, .pre__count'), {
        yPercent: -110,
        duration: 0.7,
        ease: 'power3.in',
        stagger: 0.04,
      })
        .to(el.querySelector('.logo-mark'), { scale: 0.6, autoAlpha: 0, duration: 0.6, ease: 'power3.in' }, 0)
        .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.25, ease: EASE.inOut }, 0.45)
        .call(() => doneRef.current?.(), null, 0.75)
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__center">
        <LogoMark size={64} />
      </div>
      <div className="pre__foot">
        <div className="pre__meta mono">
          <div className="pre__line">
            <span>Maren Holt Studio</span>
          </div>
          <div className="pre__line">
            <span>Lisbon — Copenhagen</span>
          </div>
          <div className="pre__line">
            <span>Est. 2009</span>
          </div>
        </div>
        <div className="pre__countwrap">
          <span className="pre__count" ref={counter}>
            000
          </span>
        </div>
      </div>
      <div className="pre__bar">
        <span ref={bar} />
      </div>
    </div>
  )
}
