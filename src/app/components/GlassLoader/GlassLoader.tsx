
"use client";

import Image from "next/image";
import logo from '../../../../public/logo.png';
import { Loader } from "lucide-react";



const GlassLoader = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      {/* Glass Card */}
      <div className={`relative flex flex-col items-center justify-center gap-4
        rounded-full px-14 py-10
        bg-white/10
        backdrop-blur-xl 
       `}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-white/10 blur-2xl opacity-40 backdrop-blur-3xl" />

        {/* Logo */}
        <div className="relative animate-pulse">
          <Image src={logo} alt="Loading" width={80} height={80} priority />
        </div>

        {/* Text */}
        <p className="relative text-xl tracking-widest animate-pulse  text-logo">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default GlassLoader;
