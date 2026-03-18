import { useEffect } from 'react'

const STUDIO_EMAIL = 'paliphoto@hotmail.com'
const STUDIO_PHONE = '+44 7915 069154'

function Contact() {
  useEffect(() => {
    document.title = 'Contact | Pali Photography'
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)

    const fullName = form.get('fullName') || ''
    const email = form.get('email') || ''
    const phone = form.get('phone') || ''
    const sessionType = form.get('sessionType') || ''
    const eventDate = form.get('eventDate') || ''
    const message = form.get('message') || ''

    const subject = encodeURIComponent(`Photography Inquiry: ${sessionType || 'General'}`)
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nSession Type: ${sessionType}\nEvent Date: ${eventDate}\n\nMessage:\n${message}`,
    )

    window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1>Let&apos;s design your perfect photography experience.</h1>
        <p>
          Share your plans and visual preferences. We&apos;ll prepare a tailored package for your
          wedding, pre-wedding, kids session, or landscape commission.
        </p>
      </section>

      <section className="contact-grid">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input name="fullName" type="text" required placeholder="Your full name" />
          </label>
          <label>
            Email Address
            <input name="email" type="email" required placeholder="name@email.com" />
          </label>
          <label>
            Phone Number
            <input name="phone" type="tel" required placeholder="+44" />
          </label>
          <label>
            Session Type
            <select name="sessionType" defaultValue="Wedding">
              <option>Wedding</option>
              <option>Pre-Wedding</option>
              <option>Kids</option>
              <option>Landscapes</option>
            </select>
          </label>
          <label>
            Event Date
            <input name="eventDate" type="date" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" placeholder="Share your vision, venue, and must-have moments" />
          </label>
          <button className="button button-primary" type="submit">Send Email Inquiry</button>
        </form>

        <aside className="contact-card">
          <h2>Studio Information</h2>
          <p>📍 Scotland & destination bookings</p>
          <p>📞 {STUDIO_PHONE}</p>
          <p>✉️ {STUDIO_EMAIL}</p>
          <p>
            Available for Scotland weddings, UK-wide events, and curated destination storytelling.
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
