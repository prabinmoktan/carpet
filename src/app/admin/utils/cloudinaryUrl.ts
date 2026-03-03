interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: "fit" | "fill" | "thumb" | "scale";
  quality: "auto" | number;
  format?: "auto" | "webp" | "avif" | "png" | "jpg";
}

export const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
console.log("CLOUD_NAME==>", CLOUD_NAME);

export function cloudinaryUrl(publicId: string, options: CloudinaryOptions) {
  const { width, height, crop, quality = "auto", format = "avif" } = options;

  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  const transformationStr = transformations.join(",");

  const finalUrl = transformationStr
    ? `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformationStr}/${publicId}`
    : `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${publicId}`;

 console.log('finalUrl=>', finalUrl)
 
  return finalUrl;
}
