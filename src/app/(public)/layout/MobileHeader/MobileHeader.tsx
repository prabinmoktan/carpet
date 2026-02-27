"use client";
import { navItems } from "@/app/constant";
import { Menu, ShoppingBag, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import CompanyLogo from "../../ui/CompanyLogo/CompanyLogo";
import Cart from "../../components/Cart/Cart";

const MobileHeader = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <header className="md:hidden flex justify-between px-2">
        <div>
          <Link href="/" >
            <CompanyLogo />
          </Link>
        </div>

        <div className="flex justify-between gap-2 items-center ">
       
        <Cart/>
          <Menu onClick={() => setMobileMenu(true)} />
        </div>
        {mobileMenu && (
          <div className="bg-white w-dvw absolute left-0 h-dvh">
            <div className="flex px-5 justify-between w-full items-center">
              <Link href="/" className="text-5xl font-light">
                <CompanyLogo />
              </Link>
              <div>
                <button onClick={() => setMobileMenu(false)}>
                  <X />
                </button>
              </div>
            </div>
            <div className="px-6 space-y-5 mt-4">
              {navItems?.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 }}
                >
                  <Link href={item.href}>
                    <div
                      className="text-2xl font-light font-serif uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer"
                      onClick={() => setMobileMenu(false)}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 text-gray-500 left-0 w-0 h-px bg-gray-500 group-hover:w-full transition-all duration-300" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* </AnimatePresence> */}
      </header>
    </>
  );
};

export default MobileHeader;
