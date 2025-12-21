'use client'
import React from 'react'
import {motion} from 'framer-motion';
import Image from 'next/image';
import craft from '../../../../../../public/craft.png'
import TitleHeader from '@/app/(public)/ui/TitleHeader/TitleHeader';
import Stamp from '@/app/(public)/ui/Stamp/Stamp';

const Craftmanship = () => {
  return (
   <>
    <article className=" grid grid-cols-1 md:grid-cols-2 md:px-10 px-2 gap-x-24   items-center overflow-x-hidden">
        <motion.div  initial={{opacity: 0, x:-30, scale: 0.8}}
        whileInView={{opacity:1, x:0, scale: 1}}
        viewport={{once: false, margin:'-100px'}}

        transition={{duration: 0.8, delay: 0.6}}>

        <Image src={craft} alt="weaving carpet" loading="lazy" className="rounded-md "/>
        </motion.div>
        <motion.div 
        initial={{opacity: 0, x:40}}
        whileInView={{opacity:1, x:0}}
        viewport={{once: false, margin:'-50px'}}
        transition={{duration: 0.4, delay: 0.2}}
        
        className="flex flex-col gap-5 max-w-full">
          <h1 className="tracking-wide text-amber-700 uppercase text-sm md:text-md">craftmanship</h1>
          <TitleHeader title={"Uncompromising Quality"} />
          <p className="text-lg text-muted-foreground font-light leading-relaxed text-justify">
          Every rug in our collection undergoes rigorous quality inspection. We examine each knot, every color blend, and the overall integrity to ensure it meets our exacting standards.
          </p>
          <div className='flex justify-around'>
            <Stamp header='100%' description='Hand-knotted'/>
            <Stamp header='30+' description='Years Experience'/>

          </div>
        
        </motion.div>
      </article></>
  )
}

export default Craftmanship