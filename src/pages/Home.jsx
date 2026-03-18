import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import heroOne from '../assets/A/1.JPG'
import heroTwo from '../assets/A/24.JPG'
import heroThree from '../assets/B/K3.JPG'
import storyOne from '../assets/A/36.JPG'
import storyTwo from '../assets/B/K33.JPG'
import cardOne from '../assets/A/41.JPG'
import cardTwo from '../assets/B/K10.JPG'
import cardThree from '../assets/B/K29.JPG'

const heroSlides = [heroOne, heroTwo, heroThree]

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    document.title = 'Pali Photography | Luxury Wedding & Portrait Portfolio'
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
        <div className="hero-content parallax" data-speed="0.12">
          <p className="eyebrow">Fine-art wedding & portrait studio</p>
          <h1>Capturing timeless stories with editorial elegance.</h1>
          <p>
            We create cinematic and emotional photographs for weddings, families, and
            personal brands—designed to feel authentic and look premium for generations.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="button button-primary">Explore Portfolio</Link>
            <Link to="/contact" className="button button-secondary">Start Your Project</Link>
          </div>
        </div>
      </section>

      <section className="panel parallax" data-speed="0.05">
        <div>
          <p className="eyebrow">Our Signature Style</p>
          <h2>Refined direction, natural emotion, premium finish.</h2>
          <p>
            From intimate ceremonies to destination celebrations, each gallery is carefully
            directed and hand-edited to preserve color, skin tones, and emotional depth.
          </p>
          <div className="stats-grid">
            <div><strong>500+</strong><span>Sessions Delivered</span></div>
            <div><strong>10+</strong><span>Years of Experience</span></div>
            <div><strong>4.9/5</strong><span>Client Rating</span></div>
          </div>
        </div>
        <div className="split-gallery">
          <img src={storyOne} alt="Bride portrait in natural light" loading="lazy" decoding="async" />
          <img src={storyTwo} alt="Editorial portrait with dramatic lighting" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="page feature-section">
        <div className="page-intro">
          <p className="eyebrow">Featured Collections</p>
          <h2>Built around the moments that matter most.</h2>
        </div>
        <div className="feature-grid">
          <article className="feature-card">
            <img src={cardOne} alt="Wedding photography" loading="lazy" />
            <div>
              <h3>Weddings</h3>
              <p>Elegant storytelling from rituals to reception with a timeless, cinematic feel.</p>
            </div>
          </article>
          <article className="feature-card">
            <img src={cardTwo} alt="Pre wedding photography" loading="lazy" />
            <div>
              <h3>Pre-Wedding</h3>
              <p>Creative, romantic sessions designed around your unique personality and style.</p>
            </div>
          </article>
          <article className="feature-card">
            <img src={cardThree} alt="Family portraits" loading="lazy" />
            <div>
              <h3>Portraits</h3>
              <p>Individual and family portraits crafted with natural light and modern composition.</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Home
