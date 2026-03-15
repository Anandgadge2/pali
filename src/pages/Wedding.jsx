import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { weddingImages, logos } from '../utils/imageData'

function Wedding() {
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
          <div className="hero-eyebrow">Wedding Photography</div>
          <h1 className="hero-title">
            Capturing Your
            <em>Special Day</em>
          </h1>
          <p className="hero-subtitle">
            Professional wedding photography that preserves the magic, emotion, and beauty of your wedding day for a lifetime.
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
          <div className="section-eyebrow">Wedding Gallery</div>
          <h2 className="section-title">
            Recent
            <em>Weddings</em>
          </h2>
          <p className="section-desc">
            Explore our collection of beautiful wedding moments captured with love and creativity
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--gold)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Loading wedding gallery...</div>
            <div style={{ fontSize: '0.9rem', opacity: '0.7' }}>Preparing your beautiful memories...</div>
          </div>
        ) : (
          <div className="wedding-gallery" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            padding: '0 80px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {weddingImages.map((image, index) => (
              <div key={index} className="gallery-item" style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                aspectRatio: '3/4',
                cursor: 'none',
                transition: 'transform 0.3s ease'
              }}>
                <img 
                  src={image} 
                  alt={`Wedding photo ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(13,13,13,0.8), transparent)',
                  padding: '20px',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.3s ease'
                }}>
                  <div style={{
                    color: 'var(--cream)',
                    fontSize: '0.9rem',
                    fontStyle: 'italic'
                  }}>
                    Wedding Moment {index + 1}
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
          <div className="section-eyebrow">Wedding Services</div>
          <h2 className="section-title">
            What We
            <em>Offer</em>
          </h2>
          <p className="section-desc">
            Comprehensive wedding photography packages to suit your needs
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-bg svc-1"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">💒</div>
            <div className="service-content">
              <div className="service-number">01</div>
              <h3 className="service-name">Full Day Coverage</h3>
              <p className="service-desc">
                Complete wedding day coverage from preparation to reception, capturing every precious moment.
              </p>
              <Link to="/contact" className="service-link">
                Enquire Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-2"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">📸</div>
            <div className="service-content">
              <div className="service-number">02</div>
              <h3 className="service-name">Ceremony Only</h3>
              <p className="service-desc">
                Focused coverage of your wedding ceremony and immediate family portraits.
              </p>
              <Link to="/contact" className="service-link">
                Enquire Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-3"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">🎥</div>
            <div className="service-content">
              <div className="service-number">03</div>
              <h3 className="service-name">Video & Photo Combo</h3>
              <p className="service-desc">
                Professional photography and videography package for complete wedding coverage.
              </p>
              <Link to="/contact" className="service-link">
                Enquire Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-4"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">✨</div>
            <div className="service-content">
              <div className="service-number">04</div>
              <h3 className="service-name">Premium Package</h3>
              <p className="service-desc">
                All-inclusive package with pre-wedding shoot, wedding coverage, and post-wedding session.
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

export default Wedding
