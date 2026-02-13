import { StaticImageData } from "next/image";
import React from "react";
import Magnifier from 'react18-image-magnifier'


interface ImageMagnifierTypes{
    
    src: string | StaticImageData;
    className: string; 
   
}

const ImageMagnifier: React.FC<ImageMagnifierTypes> = ({ src, className}) => {
  return (
    <>
     <Magnifier src={src as string} className={className}/>
    </>
  );
};

export default ImageMagnifier;
