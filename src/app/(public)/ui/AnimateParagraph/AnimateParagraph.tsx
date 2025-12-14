"use client";
import React from "react";
import { motion } from "framer-motion";

interface animateParaTypes {
  paragraph: string;
}

const AnimateParagraph: React.FC<animateParaTypes> = ({ paragraph }) => {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
      
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, margin: "-100px" }}
        className="tracking-wider font-light text-center"
      >
        {paragraph}
      </motion.p>
    </>
  );
};

export default AnimateParagraph;
