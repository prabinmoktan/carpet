'use client';
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import Badge from "../../ui/Badge/Badge";
import {motion } from 'framer-motion';

interface ProductCardTypes {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string | StaticImageData;
  isNew: boolean;
  onClick?: React.MouseEventHandler;
}

const ProductCard: React.FC<ProductCardTypes> = ({
  id,
  name,
  category,
  price,
  image,
  onClick,
  isNew=false,
}) => {
    const [isHover, setIsHover] = useState(false);
  return (
    <>
      <div className=" relative h-full  rounded-xl overflow-hidden bg-gray-100 w-full  border-gray-100 border "
      onMouseEnter={()=> setIsHover(true)}
      onMouseLeave={()=>setIsHover(false)}
      onClick={onClick}>
       
        <div className={`overflow-hidden aspect-square `}>

        <Image
          src={image}
          loading="lazy"
          alt={name}
          className={`object-cover duration-500 transition-transform ${isHover ? 'scale-125' : 'scale-100'}`}
        />
        {
        isNew && 
        <Badge title="NEW" variant={"primary"} className="absolute top-2 left-2"/>
    }
        </div>
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: isHover ? 1 : 0}} className={`absolute inset-0 bg-black/20 cursor-pointer`}>

        </motion.div>
        <div className="p-6 space-y-2">
          <p className="text-gray-500 text-sm text-muted-foreground  tracking-widest">{category}</p>
          <h1 className="font-light font-serif text-2xl">{name}</h1>
          <p className="font-light  text-lg">${price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
