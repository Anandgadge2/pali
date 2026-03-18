import { useEffect, useMemo, useState } from 'react'
import PhotoLightbox from '../components/PhotoLightbox'

const categoryMeta = {
  wedding: { label: 'Wedding', description: 'Ceremony, vows and reception stories.' },
  preWedding: { label: 'Pre Wedding', description: 'Romantic and cinematic couple sessions.' },
  kids: { label: 'Kids', description: 'Joyful childhood moments and portraits.' },
  landscapes: { label: 'Landscapes', description: 'Atmospheric outdoor and scenic compositions.' },
}

const sortByPath = (a, b) => a[0].localeCompare(b[0], undefined, { numeric: true })

const aAssets = Object.entries(
  import.meta.glob('../assets/A/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: true, import: 'default' }),
).sort(sortByPath)

const bAssets = Object.entries(
  import.meta.glob('../assets/B/*.{jpg,JPG,jpeg,JPEG,png,PNG}', { eager: true, import: 'default' }),
)
  .filter(([path]) => !/logo|sign/i.test(path))
  .sort(sortByPath)

const kidsOnly = bAssets.filter(([path]) => /\/K/i.test(path))

const categorySources = {
  wedding: aAssets.slice(0, 22),
  preWedding: bAssets.slice(0, 20),
  kids: kidsOnly.slice(0, 24),
  landscapes: aAssets.slice(22, 40),
}

const categories = Object.entries(categorySources).map(([key, sourceList]) => ({
  key,
  ...categoryMeta[key],
  photos: sourceList.map(([, src], index) => ({
    src,
    title: `${categoryMeta[key].label} Frame ${index + 1}`,
    category: key,
    categoryLabel: categoryMeta[key].label,
  })),
}))

function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(categories[0].key)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    document.title = 'Portfolio | Pali Photography'
  }, [])

  const currentCategory = useMemo(
    () => categories.find((category) => category.key === activeCategory) ?? categories[0],
    [activeCategory],
  )

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const goPrev = () => setLightboxIndex((index) => (index === null ? 0 : (index - 1 + currentCategory.photos.length) % currentCategory.photos.length))
  const goNext = () => setLightboxIndex((index) => (index === null ? 0 : (index + 1) % currentCategory.photos.length))

  return (
    <main className="page">
      <section className="page-intro">
        <p className="eyebrow">Portfolio</p>
        <h1>Professional photography portfolio with curated categories.</h1>
        <p>
          Choose a category to instantly load all frames in that collection. Click any photo to open
          a full-screen preview and navigate like a premium studio gallery.
        </p>
      </section>

      <section className="category-grid">
        {categories.map((category) => (
          <article
            key={category.key}
            className={`category-card ${activeCategory === category.key ? 'is-active' : ''}`}
          >
            <button type="button" onClick={() => setActiveCategory(category.key)}>
              <img
                src={category.photos[0]?.src}
                alt={`${category.label} category cover`}
                loading="lazy"
                decoding="async"
              />
              <div className="category-card-content">
                <h3>{category.label}</h3>
                <p>{category.description}</p>
                <span>{category.photos.length} Photos</span>
              </div>
            </button>
          </article>
        ))}
      </section>

      <section className="active-collection">
        <div className="active-collection-head">
          <h2>{currentCategory.label} Collection</h2>
          <p>{currentCategory.description}</p>
        </div>

        <div className="masonry">
          {currentCategory.photos.map((item, index) => (
            <button
              key={item.src}
              className="masonry-card fade-in photo-button"
              style={{ animationDelay: `${index * 35}ms` }}
              onClick={() => openLightbox(index)}
              type="button"
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                loading={index < 6 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index < 2 ? 'high' : 'auto'}
              />
              <span className="photo-overlay">View Fullscreen</span>
            </button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={currentCategory.photos}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </main>
  )
}

export default Portfolio
