import { useMemo, useState } from 'react'
import { galleryCategories } from '../utils/galleryData'

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')

  const visibleImages = useMemo(() => {
    if (activeCategory === 'all') {
      return galleryCategories.flatMap((category) =>
        category.images.slice(0, 12).map((image) => ({ image, title: category.title })),
      )
    }

    const category = galleryCategories.find((item) => item.key === activeCategory)
    return (category?.images || []).map((image) => ({ image, title: category.title }))
  }, [activeCategory])

  return (
    <section className="portfolio-page">
      <div className="section-title">
        <p className="eyebrow">Portfolio</p>
        <h2>Animated Visual Collection</h2>
      </div>

      <div className="chip-row">
        <button
          type="button"
          className={activeCategory === 'all' ? 'chip active' : 'chip'}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {galleryCategories.map((category) => (
          <button
            type="button"
            key={category.key}
            className={activeCategory === category.key ? 'chip active' : 'chip'}
            onClick={() => setActiveCategory(category.key)}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div className="masonry-grid">
        {visibleImages.map(({ image, title }) => (
          <figure key={image} className="masonry-item">
            <img src={image} alt={title} loading="lazy" />
            <figcaption>{title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Portfolio
