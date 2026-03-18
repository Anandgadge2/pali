import { useEffect } from 'react'

function Contact() {
  useEffect(() => {
    document.title = 'Contact | Pali Photography'
  }, [])

  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1>Let&apos;s design your perfect photography experience.</h1>
        <p>
          Tell us about your event, preferred style, and location. We&apos;ll get back with package
          recommendations and a personalized timeline.
        </p>
      </section>

      <section className="contact-grid">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Full Name
            <input type="text" required placeholder="Your full name" />
          </label>
          <label>
            Email Address
            <input type="email" required placeholder="name@email.com" />
          </label>
          <label>
            Phone Number
            <input type="tel" placeholder="+91" />
          </label>
          <label>
            Session Type
            <select defaultValue="Wedding">
              <option>Wedding</option>
              <option>Pre-Wedding</option>
              <option>Portrait</option>
              <option>Family Session</option>
            </select>
          </label>
          <label>
            Event Date
            <input type="date" />
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="Share your vision, venue, and must-have moments" />
          </label>
          <button className="button button-primary" type="submit">Send Inquiry</button>
        </form>

        <aside className="contact-card">
          <h2>Studio Information</h2>
          <p>📍 Ahmedabad, India</p>
          <p>📞 +91 99999 99999</p>
          <p>✉️ hello@paliphotography.com</p>
          <p>
            Available for destination weddings, editorial portraits, and intimate family stories.
          </p>
          <hr />
          <h3>Response Time</h3>
          <p>We typically respond within 24 hours.</p>
        </aside>
      </section>
    </main>
  )
}

export default Contact
