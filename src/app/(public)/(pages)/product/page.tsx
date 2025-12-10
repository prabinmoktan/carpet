// 'use client'
// import React, { useEffect, useState } from 'react'

// const Page = () => {
//     const [dark, setDark] = useState(false);
//     useEffect(()=>{
//         const saved = localStorage.getItem('theme');
//         console.log('saved==>', saved)

//         //falback to system priority
//         const preferable = window.matchMedia('(prefers-color-scheme: dark)').matches;
//         console.log(preferable)
//         // eslint-disable-next-line react-hooks/set-state-in-effect
//         setDark(saved === 'dark' || (!saved && preferable));

//     },[])
//     useEffect(()=>{
//         if(dark){

//             document.documentElement.classList.add('dark');
//             localStorage.setItem( 'theme' , 'dark' );
//         }else{
//             document.documentElement.classList.remove('dark')
//             localStorage.setItem('theme','light')
//         }
//         //applying theme
//     },[dark])

//     const toggleButton = ()=> {
//         setDark(prev => !prev)
//     }
//   return (
//     <div className='bg-red-900 w-screen  dark:bg-green-700 h-screen'>

//         <p>Page</p>
//         <button     className='bg-amber-600 rounded-2xl px-4 py-1 cursor-pointer' onClick={toggleButton}>toggle {dark ? 'dark' : 'light'}</button>

//     </div>
//   )
// }

// export default Page

"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDark(saved === "dark" || (!saved && systemPrefersDark));
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleButton = () => {
    setDark((prev) => !prev);
  };

  return (
    <div className="bg-red-900 w-screen dark:bg-green-700 h-screen">
      <p>Page</p>
      <button
        className="bg-amber-600 rounded-2xl px-4 py-1 cursor-pointer dark:text-white"
        onClick={toggleButton}
      >
        toggle {dark ? "dark" : "light"}
      </button>
    </div>
  );
};

export default Page;
