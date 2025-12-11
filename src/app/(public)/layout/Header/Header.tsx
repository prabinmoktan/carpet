"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/app/constant";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import MobileHeader from "../MobileHeader/MobileHeader";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
     
    };

   
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`  fixed top-0 z-50 left-0 right-0 transition-all duration-300 ${
          scroll ? "bg-white/95 backdrop-blur-md " : "bg-transparent"
        }`}
      >
        <div className="hidden md:flex justify-between items-center px-8 py-4">
          <div>
            <Link href="/" className="text-5xl font-light">
              LOGO
            </Link>
          </div>
          <nav className="md:flex items-center gap-10 text-gray-600">
            {navItems?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <div className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer">
                    {item.label}
                    <span className="absolute -bottom-1 text-gray-500 left-0 w-0 h-px bg-gray-500 group-hover:w-full transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div>
            <ShoppingBag size={"1.2rem"} fontWeight={'light'}/>
          </div>
        </div>
      <MobileHeader/>
      </header>

    </>
  );
};

export default Header;
