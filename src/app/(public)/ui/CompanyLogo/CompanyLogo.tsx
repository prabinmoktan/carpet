import Image from "next/image";
import favico from "../../../../../public/logo.png";
import React from "react";

const CompanyLogo = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Image
          src={favico}
          height={50}
          width={50}
          alt="sadaa wadawiya"
          className="object-contain shrink-0 "
        />

        <div className="font-cinzel font-light   text-logo  uppercase mt-5 hidden sm:block md:block lg:block leading-none ">
          <span className="tracking-tight text-4xl ">S</span>
          <span className="text-3xl">anaa yadawiya</span>
        </div>
      </div>
    </>
  );
};

export default CompanyLogo;
