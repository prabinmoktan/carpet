"use client";
import { useMemo, useState } from "react";
import { useGetProductsQuery, useDeleteProductMutation } from "../product.api";
import { toast } from "sonner";
import { ProductFormValues } from "@/app/admin/AdminType";
import { is } from "zod/v4/locales";

export const GetProductHooks = () => {
  const limit = 8;
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const queryArgs = useMemo(() => ({ limit, page }), [limit, page]);
  console.log(page, limit)
  const { data, isLoading, isFetching, error, refetch } = useGetProductsQuery(queryArgs,{refetchOnMountOrArgChange: true});
  console.log('error', error)
  console.log('data==>', data)
  console.log('isLoading==>', isLoading)
  console.log('isFetching==>', isFetching)

  const [deleteProduct] = useDeleteProductMutation();

  const handleEdit = (product: ProductFormValues) => {
    console.log(product.title);
  };

  const handleDelete = (product: ProductFormValues) => {
    setSelectedId(product._id);
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
