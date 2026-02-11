import { useGetProductsQuery } from "@/app/services/product.api";
import { useState } from "react";

export const useProducts = () => {
    const [page, setPage] = useState(1);
    const {data , isLoading}  = useGetProductsQuery({limit: 10, page})
    const products = data?.response || [];

    return {
        products, isLoading, setPage
    }

}