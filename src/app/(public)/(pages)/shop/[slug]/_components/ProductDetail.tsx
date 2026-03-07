"use client";
import { useGetProductByIdQuery } from "@/app/services/product.api";
import React from "react";
import ProductData from "./ProductData";
import ProductSpecs from "./ProductSpec";
import ProductDataSkeleton from "./ProductDataskeleton";
import ProductSpecsSkeleton from "./ProductSpecSkeleton";

const ProductDetail = ({ slug }: { slug: string }) => {
  const { data, isLoading } = useGetProductByIdQuery(slug);
  const product = data?.product;
  

  return (
    <>
      {isLoading ? (
       <>
        <ProductDataSkeleton />
        <ProductSpecsSkeleton/>
       </>
      ) : (
        <>
          <ProductData product={product} />
          <ProductSpecs specs={product?.specs} />
        </>
      )}
    </>
  );
};

export default ProductDetail;
