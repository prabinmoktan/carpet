"use client";
import ProductTable from "@/app/admin/AdminUi/ProductTable/ProductTable";
import { ProductTableHeader } from "@/app/constant";
import React, { useState } from "react";
import AppModal from "@/app/components/AppModal/AppModal";
import Pagination from "@/app/components/Pagination/Pagination";
import { ProductFormValues } from "@/app/admin/AdminType";
import { useProduct } from "../ProductHooks/useProduct";
import GlassLoader from "@/app/components/GlassLoader/GlassLoader";
import { useDispatch } from "react-redux";


const ProductData = () => {
  
//   const dispatch = useDispatch();
// console.log("dispatch", dispatch);

  const {data, isLoading, page, setPage, handleEdit, handleDelete, confirmDelete, open, setOpen } =useProduct();

    console.log('page', page)

  return (
    <>
      <ProductTable
        columns={ProductTableHeader}
        data={data?.response || []}
        onEdit={(product) => handleEdit(product)}
        onDelete={(product: ProductFormValues) => handleDelete(product)}
      />
      <div className="flex w-full justify-center mt-4">
        <Pagination
          page={page}
          totalPages={data?.pagination?.pages || 1}
          onPageChange={setPage}
        />
      </div>
      <AppModal
        open={open}
        title={"Delete a Product"}
        description={"Are you sure to delete this product?"}
        onCancel={() => setOpen(false)}
        onConfirm={() => confirmDelete()}
      />
    </>
  );
};

export default ProductData;
