import { useEffect } from 'react'
import p1 from '../assets/A/10.JPG'
import p2 from '../assets/A/21.JPG'
import p3 from '../assets/A/41.JPG'
import p4 from '../assets/B/K10.JPG'
import p5 from '../assets/B/K29.JPG'
import p6 from '../assets/B/K39.JPG'
import p7 from '../assets/A/24.JPG'
import p8 from '../assets/B/K33.JPG'

const gallery = [
  { image: p1, title: 'Golden Hour Vows', tag: 'Wedding' },
  { image: p2, title: 'Temple Ceremony', tag: 'Wedding' },
  { image: p3, title: 'Classic Bridal Portrait', tag: 'Portrait' },
  { image: p4, title: 'Romantic Walk', tag: 'Pre-Wedding' },
  { image: p5, title: 'Couple Editorial', tag: 'Pre-Wedding' },
  { image: p6, title: 'Family Warmth', tag: 'Portrait' },
  { image: p7, title: 'Reception Lights', tag: 'Wedding' },
  { image: p8, title: 'Candid Happiness', tag: 'Portrait' },
]

function Portfolio() {
  useEffect(() => {
    document.title = 'Portfolio | Pali Photography'
  }, [])

  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Portfolio</p>
        <h1>Curated galleries with a premium editorial tone.</h1>
        <p>
          A blend of weddings, portraits, and pre-wedding stories crafted with elegant color,
          natural expressions, and thoughtful composition.
        </p>
      </section>

      <section className="masonry">
        {gallery.map((item, index) => (
          <figure key={item.title} className="masonry-card fade-in" style={{ animationDelay: `${index * 90}ms` }}>
            <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.tag}</span>
            </figcaption>
          </figure>
        ))}
      </section>
    </main>
  )
}

export default Portfolio
