
import React from "react";
import HeroSection from "./_components/HeroSection";
import Collection from "./_components/Collection";
import PrayerMat from "./_components/PrayerMat";
import Story from "./_components/Story";
import Craftmanship from "./_components/Craftmanship";
import Contact from "./_components/Contact";

const Homepage = () => {
  return (
    <>
      <section className=" flex flex-col gap-y-16 max-w-full w-full ">

       <HeroSection />
      <Collection/>
      <PrayerMat/>
      <Story/>
      <Craftmanship/>
      <Contact/>
      </section>
    </>
  );
};

export default Homepage;
