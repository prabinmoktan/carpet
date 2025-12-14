
import React from "react";
import HeroSection from "./_components/HeroSection";
import Collection from "./_components/Collection";
import PrayerMat from "./_components/PrayerMat";
import Story from "./_components/Story";
import Craftmanship from "./_components/Craftmanship";
import ContactForm from "./_components/ContactForm";

const Homepage = () => {
  return (
    <>
      <section className="space-y-20">

      <HeroSection />
      <Collection/>
      <PrayerMat/>
      <Story/>
      <Craftmanship/>
      <ContactForm/>
      </section>
    </>
  );
};

export default Homepage;
