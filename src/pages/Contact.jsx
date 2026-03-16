import { useEffect } from 'react'

function Contact() {
  useEffect(() => {
    document.title = 'Contact | Pali Studio'
  }, [])

  return (
    <main className="page">
      <section className="page-intro">
        <p className="script-line">Let’s create timeless images together</p>
        <h1>Contact us for wedding, pre-wedding, kids and portrait sessions.</h1>
      </section>

      <section className="contact-grid">
        <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" required placeholder="Your full name" />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" required placeholder="you@example.com" />

          <label htmlFor="type">Category</label>
          <select id="type" defaultValue="Wedding">
            <option>Wedding</option>
            <option>Pre-Wedding</option>
            <option>Kids</option>
            <option>Portrait</option>
          </select>

          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Share your date and vision" />

          <button className="button button-primary" type="submit">Send Inquiry</button>
        </form>

        <aside className="contact-card">
          <h2>Studio Details</h2>
          <p>📍 Ahmedabad, Gujarat</p>
          <p>📞 +91 99999 99999</p>
          <p>✉️ hello@palistudio.com</p>
          <p>Available for destination weddings and premium storytelling projects.</p>
        </aside>
      </section>
    </main>
  )
}

export default Contact
