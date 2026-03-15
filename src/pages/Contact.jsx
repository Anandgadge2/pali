import { useState } from 'react'
import { galleryCategories } from '../utils/galleryData'

function Contact() {
  const [selectedCategory, setSelectedCategory] = useState(galleryCategories[0].key)

  const activeCategory = galleryCategories.find((category) => category.key === selectedCategory)

  return (
    <section className="contact-page">
      <div className="section-title">
        <p className="eyebrow">Contact Us</p>
        <h2>Book Your Session & Browse Categories</h2>
      </div>

      <div className="contact-card">
        <p>Email: hello@paliphotographer.com</p>
        <p>Phone: +91 90000 00000</p>
        <p>Location: Pali, Rajasthan</p>
      </div>

      <div className="category-layout">
        <aside className="category-list">
          {galleryCategories.map((category) => (
            <button
              type="button"
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={selectedCategory === category.key ? 'category-btn active' : 'category-btn'}
            >
              {category.title}
            </button>
          ))}
        </aside>

        <article className="category-gallery">
          <h3>{activeCategory?.title}</h3>
          <p>{activeCategory?.description}</p>
          <div className="gallery-grid">
            {activeCategory?.images.map((image) => (
              <img key={image} src={image} alt={activeCategory.title} loading="lazy" />
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export default Contact
