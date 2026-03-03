import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});



export const uploadOnCloudinary = async (localFilePath: string) => {
  
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "carpet",
    });
    
    return response;
  } catch (error) {
    // fs.unlinkSync(localFilePath);
    throw error;
  }
};
