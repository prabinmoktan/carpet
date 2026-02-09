"use client";
import { useMemo, useState } from "react";
import { useGetProductsQuery, useDeleteProductMutation } from "../product.api";
import { toast } from "sonner";
import { ProductFormValues } from "@/app/admin/AdminType";


export const useProduct = () => {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const queryArgs = useMemo(() => ({ limit, page }), [limit, page]);
  
  const { data, isLoading, } = useGetProductsQuery({limit: limit, page},{refetchOnMountOrArgChange: true});
  

  const [deleteProduct] = useDeleteProductMutation();

  const handleEdit = (product: ProductFormValues) => {
    console.log(product.title);
  };

  const handleDelete = (product: ProductFormValues) => {
    setSelectedId(product._id ?? null) ;
    setOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    const res = await deleteProduct(selectedId).unwrap();
    toast.success(res.message);
    setOpen(false);
  };

  return {
    data,
    isLoading,
    page,
    setPage,
    open,
    setOpen,
    handleEdit,
    handleDelete,
    confirmDelete,
  };
};
