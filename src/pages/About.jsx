import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { logos } from '../utils/imageData'

function About() {
  const [scrolled, setScrolled] = useState(false)
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)

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
          <div className="hero-eyebrow">About Pali Photography</div>
          <h1 className="hero-title">
            Our Story &
            <em>Passion</em>
          </h1>
          <p className="hero-subtitle">
            Discover the journey, passion, and dedication behind Pali Photography - where every moment becomes a timeless memory.
          </p>
          <div className="hero-cta">
            <a href="#story" className="btn-primary"><span>Our Story</span></a>
            <Link to="/contact" className="btn-secondary">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* About Story Section */}
      <section id="story" className="about-section section">
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
            Founded with a passion for photography and an eye for detail, Pali Photography has been capturing life's precious moments for over a decade. Our journey began with a simple mission: to transform special moments into beautiful, lasting memories.
          </p>
          <p className="about-body">
            Today, we specialize in wedding photography, pre-wedding shoots, and children's photography. Every photoshoot is carefully planned and executed to ensure we capture the essence of your special moments with creativity, professionalism, and artistic vision.
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

      {/* Stats Section */}
      <section className="services-section section">
        <div className="section-header">
          <div className="section-eyebrow">Our Achievements</div>
          <h2 className="section-title">
            Numbers That
            <em>Matter</em>
          </h2>
          <p className="section-desc">
            Our journey captured through meaningful milestones and happy clients
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-bg svc-1"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">📸</div>
            <div className="service-content">
              <div className="service-number">500+</div>
              <h3 className="service-name">Photoshoots</h3>
              <p className="service-desc">
                Successfully completed photography sessions capturing beautiful moments.
              </p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-2"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">👥</div>
            <div className="service-content">
              <div className="service-number">200+</div>
              <h3 className="service-name">Happy Clients</h3>
              <p className="service-desc">
                Satisfied clients who trust us with their precious memories.
              </p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-3"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">🏆</div>
            <div className="service-content">
              <div className="service-number">10+</div>
              <h3 className="service-name">Years Experience</h3>
              <p className="service-desc">
                A decade of professional photography expertise and artistic growth.
              </p>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-4"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">⭐</div>
            <div className="service-content">
              <div className="service-number">5.0</div>
              <h3 className="service-name">Client Rating</h3>
              <p className="service-desc">
                Consistently rated 5 stars by our valued clients for exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="testimonials-section section">
        <div className="section-header">
          <div className="section-eyebrow">Our Values</div>
          <h2 className="section-title">
            What We
            <em>Believe In</em>
          </h2>
          <p className="section-desc">
            The core principles that guide our photography and client relationships
          </p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Quality is never an accident. It is always the result of intelligent effort and creative vision. We believe every photo should be a masterpiece.
            </p>
            <div className="testimonial-author">Quality First</div>
            <div className="testimonial-role">Our Core Value</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Every client is unique, and every moment is special. We listen, understand, and personalize our approach to match your vision.
            </p>
            <div className="testimonial-author">Client-Centric</div>
            <div className="testimonial-role">Our Approach</div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">
              Photography is not just about taking pictures; it's about capturing emotions, telling stories, and creating memories that last forever.
            </p>
            <div className="testimonial-author">Creative Excellence</div>
            <div className="testimonial-role">Our Passion</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
