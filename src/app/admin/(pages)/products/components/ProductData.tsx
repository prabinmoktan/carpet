"use client";
import ProductTable from "@/app/admin/AdminUi/ProductTable/ProductTable";
import { ProductTableHeader } from "@/app/constant";
import React from "react";
import { useGetProductsQuery } from "../product.api";

const ProductData = () => {
  const { data, isLoading } = useGetProductsQuery();
  console.log(isLoading);
  console.log(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (product:any) => {
    // console.log(product);
    
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (product: any) => {};

  return (
    <>
      <ProductTable
        columns={ProductTableHeader}
        data={data?.response || []}
        onEdit={(product) => handleEdit(product)}
        onDelete={(product) => handleDelete(product)}
      />
    </>
  );
};

export default ProductData;
