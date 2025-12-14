'use client'
import React from 'react'
import { motion } from "framer-motion";
interface titleHeaderTypes{
    title: string;
}


const TitleHeader: React.FC<titleHeaderTypes> = ({title}) => {
  return (
    <>
    <motion.h1 
    initial={{opacity:0, y:10}}
    whileInView={{opacity: 1, y:0}}
    transition={{duration: 0.6}}
    viewport={{once:false,margin: '-100px'}}
className=' text-4xl md:text-5xl font-light font-serif text-center capitalize'>
        {title}
    </motion.h1>
    </>
  )
}

export default TitleHeader