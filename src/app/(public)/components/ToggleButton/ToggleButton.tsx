"use client";
import { Sun, SunDim } from "lucide-react";
import React, { useEffect, useState } from "react";

const ToggleButton = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // if(savedTheme){}
    const preferableTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(savedTheme === "dark" || (!isDark && preferableTheme));
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <>
      {/* <div className="flex items-center relative w-[100px]">
        <Sun
          className="z-10 cursor-pointer"
          onClick={!isDark ? undefined : () => setIsDark(false)}
          disabled={isDark}
        />

        <div className="relative mx-3 w-9 h-5 bg-neutral-quaternary rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft">
          <input
            type="checkbox"
            className="sr-only peer border"
            checked={isDark}
            onChange={() => setIsDark(!isDark)}
          />
          <div
            className={`absolute top-[2px] start-[2px] bg-white rounded-full h-4 w-4 transition-all duration-300  ${
              isDark ? "translate-x-full" : "translate-x-0"
            }`}
          />
        </div>



        <SunDim
          className="z-10 cursor-pointer"
          color="white"
          onClick={isDark ? undefined : () => setIsDark(true)}
          disabled={!isDark}
        />

      </div> */}

<div className="flex items-center relative w-[100px]">
  <Sun className={`z-10 cursor-pointer transition-all ${!isDark ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
       onClick={() => setIsDark(false)  } />
  
  <div className="relative mx-3 w-9 h-5 bg-neutral-quaternary rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-soft border-2 dark:peer-focus:ring-brand-soft">
    <input type="checkbox" 
           className="sr-only peer" 
           checked={isDark}
           onChange={() => setIsDark(!isDark)} />
    <div className={`absolute   bg-white rounded-full h-4 w-4 transition-all duration-300 ${isDark ? 'translate-x-full' : 'translate-x-0'}`} />
  </div>
  
  <SunDim className={`z-10 cursor-pointer transition-all ${!isDark ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
          color="gray" 
          onClick={() => setIsDark(true)} />
</div>

    </>
  );
};

export default ToggleButton;
