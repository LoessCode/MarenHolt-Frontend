import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP, EASE, scrollToTarget } from '../lib/motion'
import Logo from './Logo'

const LINKS = [
  { label: 'Studio', href: '#studio' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

function useClock(tz) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function Nav({ visible }) {
  const ref = useRef(null)
  const lisbon = useClock('Europe/Lisbon')

  // The bar starts fully transparent over the hero image and fades in,
  // scrubbed to scroll, across the first ~70% of the viewport.
  useGSAP(
    () => {
      gsap.to(ref.current, {
        '--nav-p': 1,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: () => window.innerHeight * 0.7,
          scrub: 0.8,
        },
      })

      // Switch to the dark theme over dark sections.
      // query the whole document — useGSAP's scope would otherwise limit selectors to the nav
      document.querySelectorAll('[data-nav="dark"]').forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          start: 'top 40px',
          end: 'bottom 40px',
          refreshPriority: -1,
          toggleClass: { targets: ref.current, className: 'is-dark' },
        })
      })
    },
    { scope: ref },
  )

  useGSAP(
    () => {
      if (!visible) return
      gsap.fromTo(
        ref.current.querySelectorAll('.nav__reveal'),
        { yPercent: -120, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 1.2, ease: EASE.out, stagger: 0.06, delay: 0.35 },
      )
    },
    { dependencies: [visible], scope: ref },
  )

  const go = (e, href) => {
    e.preventDefault()
    scrollToTarget(href === '#top' ? 0 : href)
  }

  return (
    <header className="nav" ref={ref}>
      <div className="nav__left nav__reveal">
        <Logo onClick={(e) => go(e, '#top')} />
      </div>
      <nav className="nav__links nav__reveal" aria-label="Primary">
        {LINKS.map((l, i) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="nav__link">
            <span className="nav__idx">0{i + 1}</span>
            <span className="roll" data-text={l.label}>
              <span>{l.label}</span>
            </span>
          </a>
        ))}
      </nav>
      <div className="nav__right nav__reveal">
        <span className="nav__clock mono">
          Lisbon <span className="nav__time">{lisbon}</span>
        </span>
        <a className="nav__cta" href="#contact" onClick={(e) => go(e, '#contact')}>
          <span className="roll" data-text="Start a project">
            <span>Start a project</span>
          </span>
          <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
            <path d="M1 10L10 1M3.5 1H10v6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </a>
      </div>
    </header>
  )
}
