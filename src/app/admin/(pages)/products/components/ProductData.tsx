"use client";
import ProductTable from "@/app/admin/AdminUi/ProductTable/ProductTable";
import { ProductTableHeader } from "@/app/constant";
import React, { useState } from "react";
import { useGetProductsQuery } from "../product.api";
import AppModal from "@/app/components/AppModal/AppModal";
import Pagination from "@/app/components/Pagination/Pagination";
import { ProductFormValues } from "@/app/admin/AdminType";

const ProductData = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetProductsQuery({ limit: limit, page });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const [open, setOpen] = useState(false);
  console.log(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (product: any) => {
    setOpen(true);
    setSelectedProductId(product._id);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (product: any) => {};

  const confirmDelete = () => {
    console.log(selectedProductId);
  };

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
        onConfirm={()=>confirmDelete()}
      />
    </>
  );
};

export default ProductData;
