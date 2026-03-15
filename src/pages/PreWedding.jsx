import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { preWeddingImages, logos } from '../utils/imageData'

function PreWedding() {
  const [scrolled, setScrolled] = useState(false)
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [loading, setLoading] = useState(true)

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
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.add('expand')
      }
    }

    const handleMouseUp = () => {
      if (cursorRingRef.current) {
        cursorRingRef.current.classList.remove('expand')
      }
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>

      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-bg-pattern"></div>
        <div className="hero-grid"></div>
        
        <div className="hero-content">
          <div className="hero-eyebrow">Pre-Wedding Photography</div>
          <h1 className="hero-title">
            Celebrate Your
            <em>Love Story</em>
          </h1>
          <p className="hero-subtitle">
            Romantic and creative pre-wedding photography sessions that capture the essence of your unique love story before the big day.
          </p>
          <div className="hero-cta">
            <a href="#gallery" className="btn-primary"><span>View Gallery</span></a>
            <Link to="/contact" className="btn-secondary">Book Now</Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="portfolio-section section">
        <div className="portfolio-header">
          <div className="section-eyebrow">Pre-Wedding Gallery</div>
          <h2 className="section-title">
            Love Stories
            <em>Captured</em>
          </h2>
          <p className="section-desc">
            Browse through our collection of romantic pre-wedding photography sessions
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--gold)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Loading pre-wedding gallery...</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.7' }}>Preparing romantic moments...</div>
          </div>
        ) : (
          <div className="prewedding-gallery" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '25px',
            padding: '0 80px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {preWeddingImages.map((image, index) => (
              <div key={index} className="gallery-item" style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                aspectRatio: '4/5',
                cursor: 'none',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: 'var(--deep)'
              }}>
                <img 
                  src={image} 
                  alt={`Pre-wedding photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease, filter 0.6s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.08) rotate(1deg)'
                    e.target.style.filter = 'brightness(1.1) contrast(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)'
                    e.target.style.filter = 'brightness(1) contrast(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(13,13,13,0.9), transparent)',
                  padding: '25px',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.4s ease'
                }}>
                  <div style={{
                    color: 'var(--cream)',
                    fontSize: '1rem',
                    fontStyle: 'italic',
                    fontFamily: 'Cormorant Garamond, serif'
                  }}>
                    Love Story {index + 1}
                  </div>
                  <div style={{
                    color: 'var(--gold)',
                    fontSize: '0.75rem',
                    marginTop: '5px',
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}>
                    Pre-Wedding Session
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="services-section section">
        <div className="section-header">
          <div className="section-eyebrow">Pre-Wedding Services</div>
          <h2 className="section-title">
            What We
            <em>Offer</em>
          </h2>
          <p className="section-desc">
            Romantic pre-wedding photography packages to celebrate your love
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-bg svc-1"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">💑</div>
            <div className="service-content">
              <div className="service-number">01</div>
              <h3 className="service-name">Romantic Session</h3>
              <p className="service-desc">
                Intimate couple photography session in romantic locations with creative poses and natural lighting.
              </p>
              <Link to="/contact" className="service-link">
                Enquire Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-2"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">🌅</div>
            <div className="service-content">
              <div className="service-number">02</div>
              <h3 className="service-name">Golden Hour Shoot</h3>
              <p className="service-desc">
                Magical golden hour photography session capturing the warm, romantic light of sunset.
              </p>
              <Link to="/contact" className="service-link">
                Enquire Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-3"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">🏞️</div>
            <div className="service-content">
              <div className="service-number">03</div>
              <h3 className="service-name">Destination Shoot</h3>
              <p className="service-desc">
                Travel to beautiful destinations for stunning pre-wedding photography in breathtaking locations.
              </p>
              <Link to="/contact" className="service-link">
                Enquire Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-4"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">🎭</div>
            <div className="service-content">
              <div className="service-number">04</div>
              <h3 className="service-name">Theme-Based Shoot</h3>
              <p className="service-desc">
                Creative themed pre-wedding shoots with props, costumes, and unique storytelling concepts.
              </p>
              <Link to="/contact" className="service-link">
                Enquire Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PreWedding
