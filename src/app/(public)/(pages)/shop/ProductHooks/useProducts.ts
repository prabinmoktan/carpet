import { useGetProductsQuery } from "@/app/services/product.api";
import {  useSearchParams } from "next/navigation";
import { useState } from "react";

export const useProducts = () => {
    const searchParams = useSearchParams();
    const [page, setPage] = useState(1);

    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined;
      const rawSort = searchParams.get("sort");

      const sort: "price_asc" | "price_desc" | undefined =
        rawSort === "price_asc" || rawSort === "price_desc"
          ? rawSort
          : undefined;
    
    const { data, isLoading } = useGetProductsQuery({
      page,
      limit: 10,
      minPrice,
      maxPrice,
      sort,
    });
  const products = data?.response || [];

  return {
    products,
    isLoading,
    setPage,
    // updateParams
  };
};




