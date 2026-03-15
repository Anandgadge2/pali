import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { logos } from '../utils/imageData'

function Contact() {
  const [scrolled, setScrolled] = useState(false)
  const cursorRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitMessage('Thank you for your inquiry! We will get back to you within 24 hours.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: ''
      })
    } catch (error) {
      setSubmitMessage('Sorry, there was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <div className="hero-eyebrow">Get In Touch</div>
          <h1 className="hero-title">
            Let's Create
            <em>Beautiful Memories</em>
          </h1>
          <p className="hero-subtitle">
            Ready to capture your special moments? Contact us today to discuss your photography needs and let us help you create timeless memories.
          </p>
          <div className="hero-cta">
            <a href="#contact-form" className="btn-primary"><span>Book Now</span></a>
            <a href="tel:+1234567890" className="btn-secondary">Call Us</a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="about-section section">
        <div className="about-visual">
          <div className="about-frame">
            <div className="about-img-bg" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '30px'
            }}>
              <div style={{ fontSize: '4rem', color: 'var(--gold)' }}>📸</div>
              <div style={{ 
                fontFamily: 'Playfair Display, serif', 
                fontSize: '1.5rem', 
                color: 'var(--cream)',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                Contact Pali Photography
              </div>
            </div>
            <div className="about-frame-border"></div>
          </div>
          <div className="about-accent"></div>
          <div className="about-number">01</div>
        </div>
        <div className="about-text">
          <h2 className="about-heading">
            Let's Discuss
            <em>Your Vision</em>
          </h2>
          <p className="about-body">
            Whether you're planning a wedding, looking for pre-wedding photography, or want to capture beautiful moments with your children, we're here to help. Fill out the form below and we'll get back to you within 24 hours.
          </p>
          
          <form onSubmit={handleSubmit} style={{ marginTop: '40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: 'var(--gold)', 
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(245,240,232,0.05)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: '4px',
                    color: 'var(--cream)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--gold)'
                    e.target.style.background = 'rgba(245,240,232,0.08)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(201,169,110,0.3)'
                    e.target.style.background = 'rgba(245,240,232,0.05)'
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: 'var(--gold)', 
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(245,240,232,0.05)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: '4px',
                    color: 'var(--cream)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--gold)'
                    e.target.style.background = 'rgba(245,240,232,0.08)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(201,169,110,0.3)'
                    e.target.style.background = 'rgba(245,240,232,0.05)'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: 'var(--gold)', 
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(245,240,232,0.05)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: '4px',
                    color: 'var(--cream)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--gold)'
                    e.target.style.background = 'rgba(245,240,232,0.08)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(201,169,110,0.3)'
                    e.target.style.background = 'rgba(245,240,232,0.05)'
                  }}
                />
              </div>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: 'var(--gold)', 
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}>
                  Service Type *
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    background: 'rgba(245,240,232,0.05)',
                    border: '1px solid rgba(201,169,110,0.3)',
                    borderRadius: '4px',
                    color: 'var(--cream)',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--gold)'
                    e.target.style.background = 'rgba(245,240,232,0.08)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(201,169,110,0.3)'
                    e.target.style.background = 'rgba(245,240,232,0.05)'
                  }}
                >
                  <option value="">Select a service</option>
                  <option value="wedding">Wedding Photography</option>
                  <option value="prewedding">Pre-Wedding Shoot</option>
                  <option value="kids">Kids Photography</option>
                  <option value="portrait">Portrait Session</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: 'var(--gold)', 
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(245,240,232,0.05)',
                  border: '1px solid rgba(201,169,110,0.3)',
                  borderRadius: '4px',
                  color: 'var(--cream)',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--gold)'
                  e.target.style.background = 'rgba(245,240,232,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(201,169,110,0.3)'
                  e.target.style.background = 'rgba(245,240,232,0.05)'
                }}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: 'var(--gold)', 
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: 'rgba(245,240,232,0.05)',
                  border: '1px solid rgba(201,169,110,0.3)',
                  borderRadius: '4px',
                  color: 'var(--cream)',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '1rem',
                  resize: 'vertical',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--gold)'
                  e.target.style.background = 'rgba(245,240,232,0.08)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(201,169,110,0.3)'
                  e.target.style.background = 'rgba(245,240,232,0.05)'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'none',
                opacity: isSubmitting ? 0.7 : 1,
                textAlign: 'center'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitMessage && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: submitMessage.includes('Thank you') ? 'rgba(201,169,110,0.1)' : 'rgba(220, 38, 38, 0.1)',
                border: `1px solid ${submitMessage.includes('Thank you') ? 'var(--gold)' : 'rgba(220, 38, 38, 0.3)'}`,
                borderRadius: '4px',
                color: submitMessage.includes('Thank you') ? 'var(--gold)' : 'rgba(220, 38, 38, 0.8)',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1rem',
                textAlign: 'center'
              }}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="services-section section">
        <div className="section-header">
          <div className="section-eyebrow">Contact Information</div>
          <h2 className="section-title">
            Get In
            <em>Touch</em>
          </h2>
          <p className="section-desc">
            Multiple ways to reach us for your photography needs
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-bg svc-1"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">📞</div>
            <div className="service-content">
              <div className="service-number">01</div>
              <h3 className="service-name">Phone</h3>
              <p className="service-desc">
                Call us directly for immediate assistance and inquiries.
              </p>
              <a href="tel:+1234567890" className="service-link">
                +1 (234) 567-890 <span className="service-arrow">→</span>
              </a>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-2"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">✉️</div>
            <div className="service-content">
              <div className="service-number">02</div>
              <h3 className="service-name">Email</h3>
              <p className="service-desc">
                Send us an email for detailed inquiries and quotes.
              </p>
              <a href="mailto:info@paliphotography.com" className="service-link">
                info@paliphotography.com <span className="service-arrow">→</span>
              </a>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-3"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">📍</div>
            <div className="service-content">
              <div className="service-number">03</div>
              <h3 className="service-name">Studio</h3>
              <p className="service-desc">
                Visit our studio for in-person consultations.
              </p>
              <a href="#" className="service-link">
                123 Photography Street <span className="service-arrow">→</span>
              </a>
            </div>
          </div>
          <div className="service-card">
            <div className="service-bg svc-4"></div>
            <div className="service-overlay"></div>
            <div className="svc-icon">⏰</div>
            <div className="service-content">
              <div className="service-number">04</div>
              <h3 className="service-name">Hours</h3>
              <p className="service-desc">
                Monday to Saturday: 9AM - 7PM, Sunday: 10AM - 5PM
              </p>
              <a href="#" className="service-link">
                Book Appointment <span className="service-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
