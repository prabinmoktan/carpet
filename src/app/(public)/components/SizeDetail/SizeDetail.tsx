"use client";
import { carpetSize } from "@/app/constant";
import React, { useState } from "react";

const SizeDetail = () => {
  const [selectedSize, setSelectedSize] = useState<string | null>();
  const handleSize = (item: string) => {

    setSelectedSize((prev)=> (prev === item ? null : item))

  };
  return (
    <>
      <div className="space-y-5">
        <h1 className="uppercase font-light ">size</h1>
        <div className="flex gap-4">
          {carpetSize?.map((carpet) => (
            <div
              key={carpet}
              className={`border  px-4 py-2 rounded-md hover:border-amber-600 ${
                selectedSize === carpet ? "border-amber-600" : "border-gray-300"
              }`}
              onClick={()=>handleSize(carpet)}
            >
              <p>{carpet}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SizeDetail;
