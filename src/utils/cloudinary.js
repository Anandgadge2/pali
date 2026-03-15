import { Cloudinary } from 'cloudinary-core';

const cld = new Cloudinary({
  cloud_name: 'dgacmjfbp',
  secure: true
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Use default preset
  formData.append('folder', 'pali');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgacmjfbp/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const getImageUrl = (publicId, options = {}) => {
  let transformations = '';
  
  if (options.width) transformations += `w_${options.width},`;
  if (options.height) transformations += `h_${options.height},`;
  if (options.crop) transformations += `c_${options.crop},`;
  if (options.quality) transformations += `q_${options.quality},`;
  
  // Remove trailing comma
  transformations = transformations.replace(/,$/, '');
  
  const baseUrl = `https://res.cloudinary.com/dgacmjfbp/image/upload`;
  return transformations ? `${baseUrl}/${transformations}/${publicId}` : `${baseUrl}/${publicId}`;
};

export const getPublicIdFromUrl = (url) => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1];
  return filename.split('.')[0];
};

export default cld;
