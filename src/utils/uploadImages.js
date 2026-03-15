import { uploadImage } from './cloudinary.js'

// Upload wedding images from A folder
const uploadWeddingImages = async () => {
  const weddingModules = import.meta.glob('../assets/A/*.{JPG,jpg,jpeg,png}')
  const uploadedUrls = []
  
  console.log('Uploading wedding images...')
  
  for (const path in weddingModules) {
    try {
      const module = await weddingModules[path]()
      const fileUrl = module.default
      
      // Convert URL to File object
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const fileName = path.split('/').pop()
      const file = new File([blob], fileName, { type: blob.type })
      
      const uploadedUrl = await uploadImage(file)
      uploadedUrls.push({
        originalPath: path,
        fileName: fileName,
        cloudinaryUrl: uploadedUrl
      })
      
      console.log(`Uploaded: ${fileName}`)
    } catch (error) {
      console.error(`Failed to upload ${path}:`, error)
    }
  }
  
  return uploadedUrls
}

// Upload kids images from B folder
const uploadKidsImages = async () => {
  const kidsModules = import.meta.glob('../assets/B/K*.{JPG,jpg,jpeg,png}')
  const uploadedUrls = []
  
  console.log('Uploading kids images...')
  
  for (const path in kidsModules) {
    try {
      const module = await kidsModules[path]()
      const fileUrl = module.default
      
      // Convert URL to File object
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const fileName = path.split('/').pop()
      const file = new File([blob], fileName, { type: blob.type })
      
      const uploadedUrl = await uploadImage(file)
      uploadedUrls.push({
        originalPath: path,
        fileName: fileName,
        cloudinaryUrl: uploadedUrl
      })
      
      console.log(`Uploaded: ${fileName}`)
    } catch (error) {
      console.error(`Failed to upload ${path}:`, error)
    }
  }
  
  return uploadedUrls
}

// Upload logo and signature
const uploadLogos = async () => {
  const logoModules = import.meta.glob('../assets/B/{logo,sign}.{png,jpg,jpeg}')
  const uploadedUrls = []
  
  console.log('Uploading logos...')
  
  for (const path in logoModules) {
    try {
      const module = await logoModules[path]()
      const fileUrl = module.default
      
      // Convert URL to File object
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const fileName = path.split('/').pop()
      const file = new File([blob], fileName, { type: blob.type })
      
      const uploadedUrl = await uploadImage(file)
      uploadedUrls.push({
        originalPath: path,
        fileName: fileName,
        cloudinaryUrl: uploadedUrl
      })
      
      console.log(`Uploaded: ${fileName}`)
    } catch (error) {
      console.error(`Failed to upload ${path}:`, error)
    }
  }
  
  return uploadedUrls
}

// Main upload function
export const uploadAllImages = async () => {
  console.log('Starting image upload to Cloudinary...')
  
  try {
    const weddingUrls = await uploadWeddingImages()
    const kidsUrls = await uploadKidsImages()
    const logoUrls = await uploadLogos()
    
    const allUrls = {
      wedding: weddingUrls,
      kids: kidsUrls,
      logos: logoUrls
    }
    
    console.log('Upload complete!', allUrls)
    
    // Save to localStorage for development
    localStorage.setItem('cloudinaryImages', JSON.stringify(allUrls))
    
    return allUrls
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}

export default uploadAllImages
