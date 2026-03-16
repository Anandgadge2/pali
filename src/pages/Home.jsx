import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import heroOne from '../assets/A/1.JPG'
import heroTwo from '../assets/A/24.JPG'
import heroThree from '../assets/B/K3.JPG'
import storyOne from '../assets/A/36.JPG'
import storyTwo from '../assets/B/K33.JPG'

const heroSlides = [heroOne, heroTwo, heroThree]

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    document.title = 'Pali Studio | Premium Wedding & Portrait Photography'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.content = 'Pali Studio is a premium photography brand for weddings, portraits and events. Explore cinematic storytelling, polished galleries and easy bookings.'
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((index) => (index + 1) % heroSlides.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [])

  const slideNodes = useMemo(
    () =>
      heroSlides.map((slide, index) => (
        <img
          key={slide}
          src={slide}
          alt="Featured photographer cover"
          className={`hero-image ${activeSlide === index ? 'is-visible' : ''}`}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
        />
      )),
    [activeSlide],
  )

  return (
    <main>
      <section className="hero">
        <div className="hero-media">{slideNodes}</div>
        <div className="hero-overlay" />
        <div className="hero-content parallax" data-speed="0.18">
          <p className="eyebrow">Industry-standard visual storytelling</p>
          <h1>Premium imagery that grows your brand and preserves emotion.</h1>
          <p>
            We design every frame for timeless impact: cinematic composition, clean editing,
            and publication-ready output for families, couples, and businesses.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="button button-primary">View Portfolio</Link>
            <Link to="/contact" className="button button-secondary">Book a Session</Link>
          </div>
        </div>
      </section>

      <section className="panel parallax" data-speed="0.08">
        <div>
          <p className="eyebrow">Why clients choose us</p>
          <h2>Luxury look. Fast delivery. SEO-ready visuals.</h2>
          <p>
            Every gallery is curated for quality and speed using optimized loading, lazy assets,
            and responsive presentation. Your website and social channels stay fast while images
            remain crisp.
          </p>
        </div>
        <div className="split-gallery">
          <img src={storyOne} alt="Bride portrait in natural light" loading="lazy" decoding="async" />
          <img src={storyTwo} alt="Editorial portrait with dramatic lighting" loading="lazy" decoding="async" />
        </div>
      </section>
    </main>
  )
}

export default Home
