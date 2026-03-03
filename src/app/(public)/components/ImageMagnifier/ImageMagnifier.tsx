import { StaticImageData } from "next/image";
import React from "react";
import Magnifier from "react18-image-magnifier";
import fallback_image from '../../../../../public/placeholder.png'
import { cloudinaryUrl } from "@/app/admin/utils/cloudinaryUrl";

interface ImageMagnifierTypes {
  src: string | StaticImageData;
  className: string;
}

const ImageMagnifier: React.FC<ImageMagnifierTypes> = ({ src, className }) => {
  let imageUrl;
  if(!src){
    imageUrl = fallback_image;
  }else if(typeof src === 'string'){
    //optimize cloudinary image
    imageUrl = cloudinaryUrl(src, {
      width: 800,        // larger for zoom clarity
      height: 800,
      crop: "fit",
      quality: "auto",
      format: "avif"
    })
  }else {
    imageUrl = src.src;
  }
  return (
    <>
      <div
        className={`relative w-full aspect-sqaure object-contain rounded-2xl ${className}`}
      >
        <Magnifier
          src={imageUrl as string}
          className="h-150! w-full  object-cover magnifier-container"
          height={700}
          width='100%'
        />
      </div>
    </>
  );
};

export default ImageMagnifier;
