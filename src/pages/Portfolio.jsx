import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import '../App.css'
import { logos } from '../utils/imageData'

const CATEGORIES = [
  { key: 'wedding', label: 'Wedding' },
  { key: 'prewedding', label: 'Pre-Wedding' },
  { key: 'kids', label: 'Kids' },
]

function Portfolio() {
  const [scrolled, setScrolled] = useState(false)
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const category = searchParams.get('category') || 'wedding'

  const apiBase = useMemo(() => {
    // Backend runs on 5174 by default
    return 'http://localhost:5174'
  }, [])

  // Custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + 'px'
        cursorRingRef.current.style.top = e.clientY + 'px'
      }
    }

    const handleMouseDown = () => {
      if (cursorRingRef.current) cursorRingRef.current.classList.add('expand')
    }

    const handleMouseUp = () => {
      if (cursorRingRef.current) cursorRingRef.current.classList.remove('expand')
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${apiBase}/api/images?category=${encodeURIComponent(category)}`)
        if (!res.ok) throw new Error('Failed to load images')
        const data = await res.json()
        if (cancelled) return
        setImages(Array.isArray(data.urls) ? data.urls : [])
      } catch (_e) {
        if (cancelled) return
        setImages([])
        setError('Images not available yet. Upload them from the backend first.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [apiBase, category])

  const onPickCategory = (key) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('category', key)
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>

      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <img src={logos.logo} alt="Pali Logo" style={{ height: '40px', marginRight: '8px' }} />
        </Link>
        <div className="nav-links">
          <Link to="/portfolio" className="nav-link">Portfolio</Link>
          <Link to="/wedding" className="nav-link">Wedding</Link>
          <Link to="/prewedding" className="nav-link">Pre-Wedding</Link>
          <Link to="/kids" className="nav-link">Kids</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-btn">Contact</Link>
        </div>
      </nav>

      <section className="portfolio-hero">
        <div className="portfolio-hero-bg"></div>
        <div className="portfolio-hero-content">
          <div className="portfolio-hero-kicker">Portfolio</div>
          <h1 className="portfolio-hero-title">Every Love Story Deserves a <em>Beautiful Frame</em></h1>
          <p className="portfolio-hero-subtitle">Browse our work by category. Click a category to view the full gallery.</p>
        </div>
      </section>

      <section className="portfolio-page section">
        <div className="portfolio-page-inner">
          <div className="portfolio-cats">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                className={`portfolio-cat ${category === c.key ? 'active' : ''}`}
                onClick={() => onPickCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(245,240,232,0.75)' }}>
              Loading {CATEGORIES.find((x) => x.key === category)?.label}...
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(245,240,232,0.75)' }}>
              {error}
            </div>
          ) : (
            <div className="portfolio-grid">
              {images.map((src, idx) => (
                <a
                  key={src + idx}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-tile"
                >
                  <img className="portfolio-img" src={src} alt="" loading="lazy" />
                  <div className="portfolio-tile-overlay">
                    <div className="portfolio-tile-title">
                      {CATEGORIES.find((x) => x.key === category)?.label} {idx + 1}
                    </div>
                    <div className="portfolio-tile-sub">Click to open</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <img src={logos.signature} alt="Pali Signature" className="footer-signature" />
          </div>
          <div className="footer-links">
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Portfolio
