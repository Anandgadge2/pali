import { useEffect } from 'react'
import p1 from '../assets/A/10.JPG'
import p2 from '../assets/A/21.JPG'
import p3 from '../assets/A/41.JPG'
import p4 from '../assets/B/K10.JPG'
import p5 from '../assets/B/K29.JPG'
import p6 from '../assets/B/K39.JPG'

const gallery = [p1, p2, p3, p4, p5, p6]

function Portfolio() {
  useEffect(() => {
    document.title = 'Portfolio | Pali Studio Photography'
  }, [])

  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Portfolio</p>
        <h1>Work crafted for premium brands and meaningful moments.</h1>
        <p>
          A curated mix of wedding, portrait, and storytelling projects with high-end retouching
          and clean visual direction.
        </p>
      </section>

      <section className="masonry">
        {gallery.map((image, index) => (
          <figure key={image} className="masonry-card fade-in" style={{ animationDelay: `${index * 120}ms` }}>
            <img src={image} alt={`Portfolio sample ${index + 1}`} loading="lazy" decoding="async" />
          </figure>
        ))}
      </section>
    </main>
  )
}

export default Portfolio
