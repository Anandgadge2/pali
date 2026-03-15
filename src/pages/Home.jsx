import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { logos } from '../utils/imageData'

function Home() {
  const [scrolled, setScrolled] = useState(false)
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const particlesRef = useRef(null)
  const parallaxTrackRef = useRef(null)
  const parallaxWrapRef = useRef(null)
  const [heroImages, setHeroImages] = useState([])
  const [heroIndex, setHeroIndex] = useState(0)

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

  // Load hero images from backend (fallbacks to empty list)
  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch('http://localhost:5174/api/images?category=wedding')
        if (!res.ok) return
        const data = await res.json()
        const urls = Array.isArray(data.urls) ? data.urls.slice(0, 8) : []
        if (!cancelled) setHeroImages(urls)
      } catch {
        // ignore
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Hero slideshow index
  useEffect(() => {
    if (!heroImages.length) return
    const id = window.setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [heroImages.length])

  // Horizontal parallax on scroll
  useEffect(() => {
    const wrap = parallaxWrapRef.current
    const track = parallaxTrackRef.current
    if (!wrap || !track) return

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect()
      const viewH = window.innerHeight || 1
      const progress = clamp(1 - rect.top / viewH, 0, 1)
      const maxShift = Math.max(0, track.scrollWidth - wrap.clientWidth)
      const x = -maxShift * progress
      track.style.transform = `translate3d(${x}px, 0, 0)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [heroImages])

  // Particles animation
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 50

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>

      {/* Particles Canvas */}
      <canvas className="particles-canvas" ref={particlesRef}></canvas>

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
        <div className="hero-slideshow" aria-hidden="true">
          {heroImages.map((src, idx) => (
            <div
              key={src}
              className={`hero-slide ${idx === heroIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="hero-slideshow-overlay" />
        </div>
        <div className="hero-bg-pattern"></div>
        <div className="hero-grid"></div>
        
        <div className="hero-content">
          <div className="hero-eyebrow">Welcome to Pali Photography</div>
          <h1 className="hero-title">
            Capturing Life's
            <em>Precious Moments</em>
          </h1>
          <p className="hero-subtitle">
            Professional photography services specializing in weddings, pre-wedding shoots, and children's photography. We create timeless memories that last forever.
          </p>
          <div className="hero-cta">
            <Link to="/portfolio" className="btn-primary"><span>View Our Work</span></Link>
            <Link to="/contact" className="btn-secondary">Get Started</Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Photoshoots</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">200+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>

        <div className="hero-image-strip">
          <div className="hero-mosaic">
            <div className="mosaic-placeholder">Wedding</div>
            <div className="mosaic-placeholder">Pre-Wedding</div>
            <div className="mosaic-placeholder">Kids</div>
            <div className="mosaic-placeholder">Portrait</div>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line"></div>
          <div className="scroll-text">Scroll</div>
        </div>
      </section>

      <section className="parallax-band" ref={parallaxWrapRef}>
        <div className="parallax-band-inner">
          <div className="parallax-kicker">Featured Frames</div>
          <h2 className="parallax-title">
            A horizontal journey
            <em>while you scroll</em>
          </h2>
        </div>

        <div className="parallax-rail">
          <div className="parallax-track" ref={parallaxTrackRef}>
            {(heroImages.length ? heroImages : [null, null, null, null, null, null]).map((src, i) => (
              <div key={src ? src : i} className="parallax-card">
                {src ? (
                  <img className="parallax-img" src={src} alt="" loading="lazy" />
                ) : (
                  <div className="parallax-placeholder">Upload images to see preview</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="marquee-section">
        <div className="marquee-track">
          <span className="marquee-item">Wedding Photography</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Pre-Wedding Shoots</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Kids Photography</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Portrait Sessions</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Event Coverage</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Wedding Photography</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Pre-Wedding Shoots</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Kids Photography</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Portrait Sessions</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">Event Coverage</span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section section">
        <div className="about-visual">
          <div className="about-frame">
            <div className="about-img-bg">
              <img src={logos.signature} alt="Pali Signature" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
            </div>
            <div className="about-frame-border"></div>
          </div>
          <div className="about-accent"></div>
          <div className="about-number">01</div>
        </div>
        <div className="about-text">
          <h2 className="about-heading">
            We Capture
            <em>Timeless Memories</em>
          </h2>
          <p className="about-body">
            With a passion for photography and an eye for detail, we transform special moments into beautiful memories. Our expertise spans weddings, pre-wedding shoots, and children's photography.
          </p>
          <p className="about-body">
            Every photoshoot is carefully planned and executed to ensure we capture the essence of your special moments with creativity and professionalism.
          </p>
          <div className="about-signature">Pali Photography</div>
          <div className="about-pills">
            <span className="pill">Professional</span>
            <span className="pill">Creative</span>
            <span className="pill">Experienced</span>
            <span className="pill">Dedicated</span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section section">
        <div className="section-header">
          <div className="section-eyebrow">Our Services</div>
          <h2 className="section-title">
            What We
            <em>Offer</em>
          </h2>
          <p className="section-desc">
            Comprehensive photography services tailored to capture your most precious moments
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-bg svc-1"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">💒</div>
            <div className="service-content">
              <div className="service-number">01</div>
              <h3 className="service-name">Wedding Photography</h3>
              <p className="service-desc">
                Complete wedding coverage from pre-ceremony to reception, capturing every precious moment of your special day.
              </p>
              <Link to="/wedding" className="service-link">
                View Gallery <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-2"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">💑</div>
            <div className="service-content">
              <div className="service-number">02</div>
              <h3 className="service-name">Pre-Wedding Shoots</h3>
              <p className="service-desc">
                Romantic and creative pre-wedding photography sessions that celebrate your love story.
              </p>
              <Link to="/prewedding" className="service-link">
                View Gallery <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-3"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">👶</div>
            <div className="service-content">
              <div className="service-number">03</div>
              <h3 className="service-name">Kids Photography</h3>
              <p className="service-desc">
                Fun and engaging photography sessions that capture the innocence and joy of childhood.
              </p>
              <Link to="/kids" className="service-link">
                View Gallery <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-4"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">📸</div>
            <div className="service-content">
              <div className="service-number">04</div>
              <h3 className="service-name">Portrait Sessions</h3>
              <p className="service-desc">
                Professional portrait photography for individuals, families, and special occasions.
              </p>
              <Link to="/contact" className="service-link">
                Book Now <span className="service-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
