import { preWeddingImages, weddingImages } from './imageData'

const sortByName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

const toSortedUrls = (modules) =>
  Object.entries(modules)
    .sort(([a], [b]) => sortByName(a, b))
    .map(([, url]) => url)

const landscapes = toSortedUrls(
  import.meta.glob('../assets/A/*.{jpg,JPG,jpeg,JPEG,png,PNG}', {
    eager: true,
    import: 'default',
  }),
)

const kids = toSortedUrls(
  import.meta.glob('../assets/B/K*.{jpg,JPG,jpeg,JPEG,png,PNG}', {
    eager: true,
    import: 'default',
  }),
)

const fallbackHome = [...weddingImages.slice(0, 4), ...landscapes.slice(0, 3), ...kids.slice(0, 3)]

export const galleryCategories = [
  {
    key: 'kids',
    title: 'Childhood Magic: Capturing Joy in Every Smile',
    description: 'Heartwarming portraits that preserve tiny expressions, laughter, and wonder.',
    images: kids,
  },
  {
    key: 'landscapes',
    title: 'Landscapes',
    description: 'Vibrant natural frames, timeless skies, and cinematic environments.',
    images: landscapes,
  },
  {
    key: 'wedding',
    title: 'Wedding',
    description: 'Grand celebrations, candid rituals, and emotional storytelling from your special day.',
    images: weddingImages,
  },
  {
    key: 'prewedding',
    title: 'Pre Wedding',
    description: 'Romantic moments and stylish concepts captured before the big day.',
    images: preWeddingImages,
  },
]

export const homeSlideshowImages = fallbackHome
