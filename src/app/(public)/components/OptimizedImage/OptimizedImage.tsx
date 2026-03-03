import { cloudinaryUrl } from "@/app/admin/utils/cloudinaryUrl";
import Image from "next/image";
import React from "react";
import fallback_image from "../../../../../public/placeholder.png"

interface OptimizedImageTypes {
  publicId: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageTypes> = ({
  publicId,
  alt,
  width,
  height,
  className,
}) => {
    const imageUrl = publicId ? cloudinaryUrl(publicId, {
        width, 
        height, 
        crop: "fill", 
        quality: "auto",
        format: "avif"
    }) : fallback_image.src;
  return (
    <>
      <Image
        src={imageUrl}
        alt={alt}
        height={height}
        width={width}
        className={className}
       
      />
    </>
  );
};

export default OptimizedImage;
