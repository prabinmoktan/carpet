"use client";
import { useState, useEffect } from "react";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../../../../../../public/herosection.png";
import Button from "../../../ui/Button/Button";
import Image from "next/image";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="relative h-[90vh] overflow-hidden  ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      >
        <Image src={heroImage} alt="her0-image" fill priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-8 z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-serif font-light text-6xl md:text-7xl lg:text-8xl text-white tracking-tight mb-6 max-w-5xl"
        >
          Timeless Elegance, <br />
          Handcrafted Excellence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-2xl"
        >
          Discover our curated collection of luxury carpets and rugs, where
          traditional craftsmanship meets contemporary design
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="inline-block"
        >
          <Button
            // size="lg"
            variant="glass"
            // className="  rounded-xl"
            data-testid="button-explore-collection"
            title=' Explore Collection'
            
          />
          

          
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-6 h-6 text-white/70 animate-bounce" />
      </motion.div>
    </section>
  );
}
