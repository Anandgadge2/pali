import { useEffect } from 'react'

function Contact() {
  useEffect(() => {
    document.title = 'Contact | Pali Studio'
  }, [])

  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Contact us</p>
        <h1>Let&apos;s build your next signature shoot.</h1>
        <p>
          Share your event date, location, and creative goals. We respond quickly with package
          options and timeline recommendations.
        </p>
      </section>

      <section className="contact-grid">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <label>
            Name
            <input type="text" required placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" required placeholder="name@email.com" />
          </label>
          <label>
            Project type
            <select defaultValue="Wedding">
              <option>Wedding</option>
              <option>Portrait</option>
              <option>Brand Photography</option>
              <option>Family Session</option>
            </select>
          </label>
          <label>
            Message
            <textarea rows="5" placeholder="Tell us about your vision" />
          </label>
          <button className="button button-primary" type="submit">Send inquiry</button>
        </form>

        <aside className="contact-card">
          <h2>Studio Details</h2>
          <p>📍 Ahmedabad, India</p>
          <p>📞 +91 99999 99999</p>
          <p>✉️ hello@palistudio.com</p>
          <p>
            Available for destination weddings and editorial projects across India and abroad.
          </p>
        </aside>
      </section>
    </main>
  )
}

export default Contact
