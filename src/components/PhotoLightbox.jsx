import { useEffect } from 'react'

function PhotoLightbox({ photos, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev()
      if (event.key === 'ArrowRight') onNext()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, onNext, onPrev])

  const current = photos[activeIndex]

  if (!current) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo preview">
      <button className="lightbox-close" type="button" onClick={onClose} aria-label="Close">×</button>
      <button className="lightbox-nav left" type="button" onClick={onPrev} aria-label="Previous photo">‹</button>
      <figure className="lightbox-figure">
        <img src={current.src} alt={current.title} fetchPriority="high" />
        <figcaption>
          <strong>{current.title}</strong>
          <span>{current.categoryLabel}</span>
        </figcaption>
      </figure>
      <button className="lightbox-nav right" type="button" onClick={onNext} aria-label="Next photo">›</button>
      <div className="lightbox-backdrop" onClick={onClose} aria-hidden="true" />
    </div>
  )
}

export default PhotoLightbox
