import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryCategories, homeSlideshowImages } from '../utils/galleryData'

function Home() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (!homeSlideshowImages.length) return undefined
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % homeSlideshowImages.length)
    }, 2000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const layers = Array.from(document.querySelectorAll('[data-parallax-speed]'))

    const onScroll = () => {
      const y = window.scrollY
      layers.forEach((layer) => {
        const speed = Number(layer.getAttribute('data-parallax-speed') || 0.2)
        layer.style.transform = `translate3d(0, ${y * speed}px, 0)`
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <section className="hero-section">
        <div className="hero-slides">
          {homeSlideshowImages.map((image, index) => (
            <div
              key={image}
              className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">Pali Photographer</p>
          <h1>Artistic Frames. Elegant Motion. Unforgettable Memories.</h1>
          <p>
            A premium visual story experience with cinematic captures, living parallax sections,
            and beautifully animated galleries.
          </p>
          <div className="hero-cta">
            <Link to="/portfolio" className="btn btn-primary">Explore Portfolio</Link>
            <Link to="/contact" className="btn btn-ghost">View Categories</Link>
          </div>
        </div>
      </section>

      <section className="parallax-ribbon">
        <div className="parallax-image" data-parallax-speed="0.1" />
        <div className="parallax-copy" data-parallax-speed="0.22">
          <h2>Unique Parallax Storytelling</h2>
          <p>
            We designed every scroll to feel immersive, smooth, and elegant so each scene reveals
            itself with motion and mood.
          </p>
        </div>
      </section>

      <section className="categories-preview">
        {galleryCategories.map((category) => (
          <article key={category.key} className="category-card">
            <img src={category.images[0]} alt={category.title} loading="lazy" />
            <div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default Home
