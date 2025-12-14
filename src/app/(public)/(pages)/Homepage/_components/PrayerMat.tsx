import React from "react";
import TitleHeader from "../../../ui/TitleHeader/TitleHeader";
import AnimatePara from "../../../ui/AnimateParagraph/AnimateParagraph";
import { prayerMats } from "@/app/constant";
import ProductCard from "../../../components/ProductCard/ProductCard";
import Button from "../../../ui/Button/Button";
import { MoveRightIcon } from "lucide-react";

const PrayerMat = () => {
  return (
    <>
      <section className=" space-y-10 md:px-10 px-3">
        <h3 className="uppercase text-amber-900 text-sm tracking-wide text-center">
          spiritual elgance
        </h3>
        <div className="space-y-4 text-center">

        <TitleHeader title="Islamic  Prayer Mats"  />
        <AnimatePara
          paragraph=" Premium prayer mats crafted with reverence and traditional Islamic
               design, perfect for your spiritual practice"
        />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-8 justify-items-center place-items-center">

        {prayerMats?.map((mat)=>(
            <ProductCard  key={mat.id} id="" name={mat.name} category={""} price={mat.price} image={mat.image} isNew={!!mat.isNew}/>
        ))}
        </div>
        <div className="flex justify-center ">
            <Button title="Explore all Categories" variant="primary" secondIcon={<MoveRightIcon/>} className="flex gap-4 rounded-md"/>
        </div>
      </section>
    </>
  );
};

export default PrayerMat;
