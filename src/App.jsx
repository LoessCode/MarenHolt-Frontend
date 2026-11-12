import { useEffect, useState } from 'react'
import { IMAGES } from './data/images'
import { resolveImages } from './lib/preload'
import { ScrollTrigger, startSmoothScroll, getLenis } from './lib/motion'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Studio from './components/Studio'
import Works from './components/Works'
import Footer from './components/Footer'

export default function App() {
  const [progress, setProgress] = useState(0)
  const [srcs, setSrcs] = useState(null)
  const [intro, setIntro] = useState(false) // preloader finished → play intro

  useEffect(() => {
    let alive = true
    resolveImages(IMAGES, ['hero01'], (p) => alive && setProgress(p)).then((s) => alive && setSrcs(s))
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const lenis = startSmoothScroll()
    lenis?.stop()
    document.documentElement.classList.add('is-loading')
  }, [])

  useEffect(() => {
    if (!intro) return
    document.documentElement.classList.remove('is-loading')
    getLenis()?.start()
    // fonts/images can shift layout after the preloader; re-measure triggers
    requestAnimationFrame(() => ScrollTrigger.refresh())
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [intro])

  return (
    <>
      <Preloader progress={progress} ready={!!srcs} onDone={() => setIntro(true)} />
      {srcs && (
        <>
          <Nav visible={intro} />
          <main>
            <Hero srcs={srcs} play={intro} />
            <Studio srcs={srcs} />
            <Works srcs={srcs} />
          </main>
          <Footer />
        </>
      )}
      <div className="grain" aria-hidden="true" />
    </>
  )
}
