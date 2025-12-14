'use client';
import Image from "next/image";
import story from "../../../../../../public/story.png";
import React from "react";
import TitleHeader from "@/app/(public)/ui/TitleHeader/TitleHeader";
import {motion} from 'framer-motion';

const Story = () => {
  return (
    <>
      <article className="grid grid-cols-1 md:grid-cols-2 md:px-10 px-2 gap-24 items-center">
        <motion.div  initial={{opacity: 0, x:-100, scale: 0.8}}
        whileInView={{opacity:1, x:0, scale: 1}}
        viewport={{once: false, margin:'-100px'}}

        transition={{duration: 0.8, delay: 0.6}}>

        <Image src={story} alt="weaving carpet" loading="lazy" className="rounded-md "/>
        </motion.div>
        <motion.div 
        initial={{opacity: 0, x:100}}
        whileInView={{opacity:1, x:0}}
        viewport={{once: false, margin:'-100px'}}
        transition={{duration: 0.4, delay: 0.2}}
        
        className="flex flex-col gap-5">
          <h1 className="tracking-wide text-amber-700 uppercase">our story</h1>
          <TitleHeader title={"Where Tradition Meets Innovation"} />
          <p className="text-lg text-muted-foreground font-light leading-relaxed indent-10">
            For over three decades, we&apos;ve been curating the finest handcrafted
            carpets and rugs from master artisans around the world. Each piece
            tells a story of heritage, skill, and timeless beauty.
          </p>
          <p className="text-lg text-muted-foreground font-light leading-relaxed indent-10">
            Our commitment to authenticity means working directly with weavers
            who have perfected their craft over generations, ensuring every
            thread reflects centuries of tradition.
          </p>
        </motion.div>
      </article>
    </>
  );
};

export default Story;
