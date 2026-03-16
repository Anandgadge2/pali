import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import heroOne from '../assets/B/K3.JPG'
import heroTwo from '../assets/A/24.JPG'
import heroThree from '../assets/B/K39.JPG'
import heroFour from '../assets/A/36.JPG'
import sign from '../assets/B/sign.png'

const heroSlides = [heroOne, heroTwo, heroThree, heroFour]

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    document.title = 'Pali Studio | Luxury Wedding & Portrait Photography'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.content = 'Pali Studio creates luxury wedding and portrait photography with cinematic style, premium delivery and SEO-friendly high-speed galleries.'
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length)
    }, 4800)
    return () => window.clearInterval(timer)
  }, [])

  const slideNodes = useMemo(
    () =>
      heroSlides.map((slide, index) => (
        <img
          key={slide}
          src={slide}
          alt="Luxury photography cover"
          className={`hero-image ${activeSlide === index ? 'is-visible' : ''}`}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      )),
    [activeSlide],
  )

  return (
    <main>
      <section className="hero">
        <div className="hero-media">{slideNodes}</div>
        <div className="light-orbs" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content" data-parallax="0.12">
          <p className="script-line">Forever in a Frame</p>
          <h1>Every Love Story Deserves a Beautiful Frame.</h1>
          <p>
            Premium wedding, pre-wedding and portrait stories with handcrafted editing,
            timeless tones and fast-delivery galleries for modern brands and families.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="button button-primary">Explore Portfolio</Link>
            <Link to="/contact" className="button button-secondary">Book a Consultation</Link>
          </div>
        </div>
      </section>

      <section className="feature-grid">
        <article className="feature-card" data-parallax="0.04">
          <h3>Creative Direction</h3>
          <p>Unique visual concepts, mood boards, and location planning to make every series stand out.</p>
        </article>
        <article className="feature-card" data-parallax="0.06">
          <h3>Online Gallery</h3>
          <p>Fast, responsive, high-quality galleries optimized for quick previews and full-resolution delivery.</p>
        </article>
        <article className="feature-card" data-parallax="0.08">
          <h3>Professional Editing</h3>
          <p>Cinematic color grading and advanced retouching for an elegant and timeless premium finish.</p>
        </article>
      </section>

      <section className="signature-block">
        <p className="script-line">Creating Timeless Tales of Love</p>
        <h2>Most recent stories are crafted with emotion, style, and detail.</h2>
        <img src={sign} alt="Pali signature" className="signature" loading="lazy" decoding="async" />
      </section>
    </main>
  )
}

export default Home
