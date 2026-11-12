import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, EASE, scrollToTarget } from '../lib/motion'
import { STUDIO } from '../data/content'
import { LogoMark } from './Logo'

function Clock({ tz }) {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz }).format(
      new Date(),
    )
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span className="clock">{t}</span>
}

export default function Footer() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(root.current.querySelectorAll('.cta .reveal-up'), {
          yPercent: 110,
          duration: 1.4,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: { trigger: '.cta', start: 'top 80%' },
        })
        gsap.from(root.current.querySelectorAll('.wordmark span'), {
          yPercent: 100,
          duration: 1.6,
          ease: EASE.out,
          stagger: 0.045,
          scrollTrigger: { trigger: '.wordmark', start: 'top 95%' },
        })
        gsap.from(root.current.querySelector('.cta__mark'), {
          rotate: -90,
          scale: 0.6,
          autoAlpha: 0,
          duration: 1.8,
          ease: EASE.out,
          scrollTrigger: { trigger: '.cta', start: 'top 75%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <footer className="footer" id="contact" ref={root} data-nav="dark">
      <div className="cta">
        <span className="mono cta__idx">(03) — Begin</span>
        <h2 className="cta__title">
          <span className="mask">
            <span className="reveal-up">Every project starts</span>
          </span>
          <span className="mask">
            <span className="reveal-up">
              with <em>a walk on the site.</em>
            </span>
          </span>
        </h2>
        <div className="cta__row">
          <a className="cta__mail" href={`mailto:${STUDIO.email}`}>
            <span className="roll" data-text={STUDIO.email}>
              <span>{STUDIO.email}</span>
            </span>
          </a>
          <LogoMark className="cta__mark" size={88} />
        </div>
      </div>

      <div className="footer__cols">
        {STUDIO.offices.map((o) => (
          <div className="footer__col" key={o.city}>
            <span className="mono footer__lbl">{o.city}</span>
            {o.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <span className="mono footer__time">
              Local <Clock tz={o.tz} />
            </span>
          </div>
        ))}
        <div className="footer__col">
          <span className="mono footer__lbl">Follow</span>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Instagram
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            LinkedIn
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Journal
          </a>
        </div>
        <div className="footer__col">
          <span className="mono footer__lbl">Enquiries</span>
          <span>New commissions</span>
          <span>Press &amp; publications</span>
          <span>Careers — two openings</span>
        </div>
      </div>

      <div className="wordmark" aria-hidden="true">
        {'Maren Holt'.split('').map((c, i) => (
          <span key={i}>{c === ' ' ? ' ' : c}</span>
        ))}
      </div>

      <div className="footer__base mono">
        <span>© {new Date().getFullYear()} Maren Holt Studio ApS</span>
        <span>Concept preview — imagery for illustration only</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToTarget(0)
          }}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
