"use client";
import React, { useState } from "react";
import TitleHeader from "../../ui/TitleHeader/TitleHeader";
import AnimateParagraph from "../../ui/AnimateParagraph/AnimateParagraph";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useRouter } from "next/navigation";
import { useProducts } from "./ProductHooks/useProducts";
import ProductFilter from "./_components/ProductFilter";
import { ListFilterPlus, X } from "lucide-react";
import ProductCardSkeleton from "../../components/CardSkeleton/CardSkeleton";
import FilterSkeleton from "./_components/FilterSkeleton";

const Shop = () => {
  const router = useRouter();
  const { products, isLoading, setPage } = useProducts();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <section className="md:mt-16 mt-4 md:flex   gap-10 px-1">
        {/* Sidebar */}
        <div className="pt-16 ">
          {showFilter ? (
            <X
              className="text-amber-500"
              onClick={() => setShowFilter(!showFilter)}
            />
          ) : (
            <ListFilterPlus
              className="text-amber-500 sm:hidden block"
              onClick={() => setShowFilter(!showFilter)}
            />
          )}
        </div>
        {showFilter && (
          <div className="w-full absolute z-50">
            <ProductFilter />
          </div>
        )}
        <div className="w-56 md:w-70  space-y-6 mt-20 hidden md:block">
          {isLoading ? <FilterSkeleton /> : <ProductFilter />}
        </div>

        {/* Content */}
        <div className="flex-1  space-y-6">
          <TitleHeader title="Shop Our Collection" />
          <AnimateParagraph paragraph="Discover handcrafted rugs from artisans around the world" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 transition-opacity duration-300">
            {isLoading ? (
              Array.from({ length: 6 })?.map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : products?.length === 0 ? (
              <p className="text-center font-light tracking-wide">
                No Products Available
              </p>
            ) : (
              products?.map((product) => (
                <ProductCard
                  key={product._id}
                  _id={product._id as string}
                  images={product.images?.[0] as string}
                  isNew={!!product.isLatest}
                  name={product.title}
                  category={product.category}
                  price={product.price}
                  finalPrice={product.finalPrice}
                  onClick={() => router.push(`/shop/${product._id}`)}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
