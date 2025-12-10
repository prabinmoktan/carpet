// import { useState, useEffect } from 'react';
// import { Link } from 'wouter';
// import { ShoppingCart, Menu, X } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { navItems } from '@/app/constant';
// import Badge from '@/app/(public)/ui/Badge/Badge';

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [cartCount] = useState(0); //todo: remove mock functionality

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-8 py-4">
//           <div className="flex items-center justify-between">
//             <Link href="/">
//               <div className="font-serif text-2xl md:text-3xl font-light tracking-tight text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md -ml-2 cursor-pointer"
//                 data-testid="link-home">
//                 LUXE RUGS
//               </div>
//             </Link>

//             <nav className="hidden md:flex items-center gap-8">
//               {navItems?.map((item, index) => (
//                 <motion.div
//                   key={item.label}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.3, delay: index * 0.1 }}
//                 >
//                   <Link href={item.href}>
//                     <div
//                       className="text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer"
//                       data-testid={`link-${item.label.toLowerCase()}`}
//                     >
//                       {item.label}
//                       <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
//                     </div>
//                   </Link>
//                 </motion.div>
//               ))}
//             </nav>

//             <div className="flex items-center gap-4">
//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="relative"
//                 data-testid="button-cart"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 {cartCount > 0 && (
//                   <Badge title={cartCount} variant='default' />
//                 )}
//               </Button>

//               <Button
//                 size="icon"
//                 variant="ghost"
//                 className="md:hidden"
//                 onClick={() => setMobileMenuOpen(true)}
//                 data-testid="button-menu"
//               >
//                 <Menu className="w-5 h-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* <AnimatePresence>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-background z-50 md:hidden"
//           >
//             <div className="flex flex-col h-full p-8">
//               <div className="flex justify-between items-center mb-12">
//                 <span className="font-serif text-2xl font-light">LUXE RUGS</span>
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   onClick={() => setMobileMenuOpen(false)}
//                   data-testid="button-close-menu"
//                 >
//                   <X className="w-5 h-5" />
//                 </Button>
//               </div>

//               <nav className="flex flex-col gap-6">
//                 {navItems.map((item, index) => (
//                   <motion.div key={item.label} initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.3, delay: index * 0.1 }}>
//                     <Link href={item.href}>
//                       <div
//                         onClick={() => setMobileMenuOpen(false)}
//                         className="text-2xl font-serif font-light text-foreground hover:text-primary transition-colors cursor-pointer"
//                         data-testid={`link-mobile-${item.label.toLowerCase()}`}
//                       >
//                         {item.label}
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </nav>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence> */}
//     </>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/app/constant";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
      console.log(scroll);
    };

    console.log(scroll);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 left-0 right-0 transition-all duration-300 ${
          scroll ? "bg-white/95 backdrop-blur-md " : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-8 py-4">
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
      </header>
    </>
  );
};

export default Header;
