"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/app/constant";

import Link from "next/link";
import MobileHeader from "../MobileHeader/MobileHeader";
import CompanyLogo from "../../ui/CompanyLogo/CompanyLogo";
import Logout from "@/app/components/Logout/Logout";

import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/app/(public)/components/Cart/Cart"));

const Header = ({ user }: {user: {firstName: string}}) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 50;
      setScroll((prev) => (prev !== shouldScroll ? shouldScroll : prev));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`w-full max-w-375 fixed  top-0 z-50 left-0 mx-auto right-0 transition-all duration-300 
          
          ${scroll ? "bg-white/95 backdrop-blur-md " : "bg-transparent"}`}
      >
        <div className="hidden md:flex justify-between items-center px-8 py-2">
          <Link href={"/"}>
            <CompanyLogo />
          </Link>
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
          <div className="flex gap-10">
            {/* <ToggleButton/> */}
            {user && <Logout />}
            <Cart />
          </div>
        </div>

        <div className="md:hidden">
          <MobileHeader />
        </div>
      </header>
    </>
  );
};

export default Header;
