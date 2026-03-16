import { useEffect, useMemo, useState } from 'react'
import w1 from '../assets/A/1.JPG'
import w2 from '../assets/A/10.JPG'
import w3 from '../assets/A/21.JPG'
import w4 from '../assets/A/41.JPG'
import p1 from '../assets/B/K3.JPG'
import p2 from '../assets/B/K10.JPG'
import p3 from '../assets/B/K29.JPG'
import p4 from '../assets/B/K39.JPG'
import k1 from '../assets/B/K22.jpg'
import k2 from '../assets/B/K45.jpg'
import k3 from '../assets/B/K46.jpg'
import k4 from '../assets/B/K40.jpg'

const categories = {
  wedding: { label: 'Weddings', images: [w1, w2, w3, w4] },
  prewedding: { label: 'Pre-Wedding', images: [p1, p2, p3, p4] },
  kids: { label: 'Kids', images: [k1, k2, k3, k4] },
}

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('wedding')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    document.title = 'Portfolio | Pali Studio'
  }, [])

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  const activeImages = useMemo(() => categories[activeCategory].images, [activeCategory])

  return (
    <main className="page">
      <section className="page-intro">
        <p className="script-line">Capturing your forever in every frame</p>
        <h1>Category-wise curated portfolio built for speed and premium quality.</h1>
        <p>Tap any image to open full-size viewing with an immersive lightbox.</p>
      </section>

      <section className="category-tabs" aria-label="Portfolio categories">
        {Object.entries(categories).map(([key, value]) => (
          <button
            key={key}
            type="button"
            className={`tab-btn ${activeCategory === key ? 'is-active' : ''}`}
            onClick={() => setActiveCategory(key)}
          >
            {value.label}
          </button>
        ))}
      </section>

      <section className="masonry">
        {activeImages.map((image, index) => (
          <button
            type="button"
            key={`${activeCategory}-${image}`}
            className="masonry-card fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={() => setSelected({ image, index })}
          >
            <img
              src={image}
              alt={`${categories[activeCategory].label} shoot ${index + 1}`}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </button>
        ))}
      </section>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Expanded portfolio image">
          <button type="button" className="lightbox-close" onClick={() => setSelected(null)}>✕</button>
          <img src={selected.image} alt="Expanded portfolio" className="lightbox-image" />
        </div>
      )}
    </main>
  )
}

export default Portfolio
