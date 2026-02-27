import { StaticImageData } from "next/image";
import React from "react";
import Magnifier from "react18-image-magnifier";

interface ImageMagnifierTypes {
  src: string | StaticImageData;
  className: string;
}

const ImageMagnifier: React.FC<ImageMagnifierTypes> = ({ src, className }) => {
  return (
    <>
      <div
        className={`relative w-full aspect-sqaure object-contain rounded-2xl ${className}`}
      >
        <Magnifier
          src={src as string}
          className="h-150! w-full  object-cover magnifier-container"
          height={600}
          width='100%'
        />
      </div>
    </>
  );
};

export default ImageMagnifier;
