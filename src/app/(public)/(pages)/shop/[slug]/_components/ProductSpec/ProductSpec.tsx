"use client";
import CareGuide from "@/app/(public)/components/CareGuide/CareGuide";
import ShippingInfo from "@/app/(public)/components/ShippingInfo/ShippingInfo";
import { SpecificationHeader } from "@/app/constant";
import { Activity, useState } from "react";

// ProductSpecs.tsx
interface Props {
  specs: {
    size: string;
    material: string;
    pattern: string;
    origin: string;
    weight: number;
    thickness: number;
  };
}

const ProductSpecs = ({ specs }: Props) => {
  const [active, setActive] = useState(SpecificationHeader[0].value);

  const specList = Object.entries(specs).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: String(value),
  }));

  return (
    <>
      <section className="bg-gray-100 p-4 rounded-xl">
        <div className="flex justify-between bg-gray-200 rounded-lg  px-2 py-1">
          {SpecificationHeader?.map((item) => (
            <p
              key={item.value}
              className={`w-full p-1 ${
                active === item.value
                  ? "bg-white shadow-sm rounded"
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
              } bg-gray-200 
              capitalize text-sm font-medium` }
              onClick={() => setActive(item.value)}
            >
              {item.label}
            </p>
          ))}
        </div>
        {active === "specification" && (
          //   <ul className="flex flex-col justify-between font-light w-full px-4">
          //     <li className="w-full flex justify-between">
          //       <p>Size:</p>
          //       <p>{specs.size}</p>
          //     </li>
          //     <li className="w-full flex justify-between">
          //       <p>Material:</p>
          //       <p>{specs.material}</p>
          //     </li>
          //     <li className="w-full flex justify-between">
          //       <p>Pattern:</p>
          //       <p>{specs.pattern}</p>
          //     </li>
          //     <li className="w-full flex justify-between">
          //       <p> Origin:</p>
          //       <p>{specs.origin}</p>
          //     </li>
          //     <li className="w-full flex justify-between">
          //       <p>Weight:</p>
          //       <p>{specs.weight}</p>
          //     </li>
          //     <li className="w-full flex justify-between">
          //       <p>Thickness:</p>
          //       <p>{specs.thickness ? specs.thickness : "-"}</p>
          //     </li>
          //   </ul>
          <ul className="flex flex-col justify-between font-light w-full px-4 gap-5 pt-4">
            {specList?.map((list) => (
              <li key={list.value} className="w-full flex justify-between border-b-1 border-gray-200 pb-3">
                <p>{list.label}</p>
                <p>{list.value}</p>
              </li>
            ))}
          </ul>
        )}
        
        {active === "care guide" && <CareGuide />}
        {active === "shipping info" && <ShippingInfo />}
      </section>
    </>
  );
};

export default ProductSpecs;
