'use client'
import { useGetProductsQuery } from "@/app/services/product.api"
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useHomepageHooks = () => {
    const limit = 6;
    const route = useRouter();
    const [page, setPage] = useState(1);
    const {data, isLoading} = useGetProductsQuery({limit: limit, page})
    const products = data?.response;

    return {
        products,
        isLoading,
        route
    }
}