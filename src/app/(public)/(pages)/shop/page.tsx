'use client'
import React from "react";
import TitleHeader from "../../ui/TitleHeader/TitleHeader";
import AnimateParagraph from "../../ui/AnimateParagraph/AnimateParagraph";
import { products } from "@/app/constant";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <section className=" space-y-6">
        <div className="">
          <TitleHeader title="shop our collection" />
          <AnimateParagraph
            paragraph={
              "Discover handcrafted rugs from artisans around the world"
            }
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-4 px-3 md:px-10">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={""}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              isNew={!!product.isNew}
              onClick={()=> router.push(`/shop/${product.id}`)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
