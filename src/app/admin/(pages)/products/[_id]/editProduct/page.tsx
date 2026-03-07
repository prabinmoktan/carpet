import React from "react";
import ProductForm from "../../components/ProductForm";
import { getProductById } from "@/app/admin/lib/actions/product.action";

interface PageProps {
  params: Promise<{
    _id: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { _id } = await params;
  const product = await getProductById(_id);
  
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <ProductForm mode="edit" productId={_id} defaultValues={product} />
    </>
  );
};

export default page;
