import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { v2 as cloudinary } from 'cloudinary'

const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  PORT = 5174,
} = process.env

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.warn(
    'Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in server/.env'
  )
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
})

const upload = multer({ storage: multer.memoryStorage() })

const categoryToFolder = (category) => {
  if (category === 'wedding') return 'pali/wedding'
  if (category === 'prewedding') return 'pali/prewedding'
  if (category === 'kids') return 'pali/kids'
  if (category === 'branding') return 'pali/branding'
  return 'pali/misc'
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/api/images', async (req, res) => {
  try {
    const category = String(req.query.category || '')
    const folder = categoryToFolder(category)

    const resources = []
    let next_cursor = undefined

    do {
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder + '/',
        resource_type: 'image',
        max_results: 500,
        next_cursor,
      })

      resources.push(...(result.resources || []))
      next_cursor = result.next_cursor
    } while (next_cursor)

    // Sort by public_id (gives stable ordering)
    resources.sort((a, b) => (a.public_id || '').localeCompare(b.public_id || ''))

    const urls = resources.map((r) => r.secure_url).filter(Boolean)
    res.json({ category, folder, count: urls.length, urls })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to list images' })
  }
})

// Upload single image
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const category = String(req.body.category || '')
    const folder = categoryToFolder(category)

    if (!req.file) {
      return res.status(400).json({ error: 'Missing file' })
    }

    const base64 = req.file.buffer.toString('base64')
    const dataUri = `data:${req.file.mimetype};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      resource_type: 'image',
    })

    res.json({
      category,
      folder,
      public_id: result.public_id,
      secure_url: result.secure_url,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// Batch upload local assets (runs on server, reads from filesystem)
app.post('/api/upload-batch', async (req, res) => {
  try {
    const root = path.resolve(__dirname, '..')
    const assetsA = path.join(root, 'src', 'assets', 'A')
    const assetsB = path.join(root, 'src', 'assets', 'B')

    const { category } = req.body || {}

    if (!category) return res.status(400).json({ error: 'Missing category' })

    const folder = categoryToFolder(category)

    let dir = assetsA
    let filterFn = (name) => /\.(png|jpg|jpeg)$/i.test(name)

    if (category === 'kids') {
      dir = assetsB
      filterFn = (name) => /^K.*\.(png|jpg|jpeg)$/i.test(name)
    }

    if (category === 'branding') {
      dir = assetsB
      filterFn = (name) => /^(logo|sign)\.(png|jpg|jpeg)$/i.test(name)
    }

    const fs = await import('fs/promises')
    const names = (await fs.readdir(dir)).filter(filterFn)

    const uploaded = []

    for (const name of names) {
      const filePath = path.join(dir, name)
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: 'image',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      })
      uploaded.push({ name, public_id: result.public_id, secure_url: result.secure_url })
    }

    res.json({ category, folder, count: uploaded.length, uploaded })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Batch upload failed' })
  }
})

app.listen(Number(PORT), () => {
  console.log(`Cloudinary server running on http://localhost:${PORT}`)
})
