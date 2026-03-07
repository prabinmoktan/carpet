"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import Badge from "../../ui/Badge/Badge";
import { motion } from "framer-motion";
import fallback_image from "../../../../../public/placeholder.png";
import OptimizedImage from "../OptimizedImage/OptimizedImage";

interface ProductCardTypes {
  _id?: string;
  name: string;
  category?: string;
  price: number;
  images?: string | StaticImageData;
  finalPrice: number;
  isNew?: boolean;
  onClick?: React.MouseEventHandler;
}

const ProductCard: React.FC<ProductCardTypes> = ({
  _id,
  name,
  category,
  price,
  images,
  onClick,
  finalPrice,
  isNew = false,
}) => {
  const [isHover, setIsHover] = useState(false);
  const imageSrc =
    Array.isArray(images) && images.length > 0
      ? [0]
      : typeof images === "string"
      ? images
      : fallback_image;
 
  return (
    <>
      <div
        className="relative h-full  rounded-xl overflow-hidden bg-gray-100 w-full  border-gray-100 border "
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={onClick}
      >
        <div className={`overflow-hidden aspect-square  flex justify-center`}>
          <OptimizedImage
            // fill
            alt={name}
            // quality={85}
            className={`object-cover duration-500 transition-transform h-auto w-auto ${
              isHover ? "scale-125" : "scale-100"
            }`}
            publicId={imageSrc as string}
            width={400}
            height={550}
          />
          {isNew && (
            <Badge
              title="NEW"
              variant={"primary"}
              className="absolute top-2 left-2"
            />
          )}

         
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHover ? 1 : 0 }}
          className={`absolute inset-0 bg-black/20 cursor-pointer`}
        ></motion.div>
        <div className="p-3 ">
          <div className=" ">
            <p className="text-gray-500 text-sm text-muted-foreground  tracking-widest">
              {category}
            </p>
            <h1 className="font-light font-serif text-2xl">
              {name.length > 40 ? name.slice(0, 40) + "..." : name}
            </h1>
          </div>
          <div className=" flex flex-col ">
            <p className="font-medium  text-md text-amber-500">
              QAR {finalPrice}
            </p>
            {finalPrice < price && (
              <p className="text-gray-500 line-through text-sm">QAR{price}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
