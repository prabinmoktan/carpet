import SizeDetail from "@/app/(public)/components/SizeDetail/SizeDetail";
import Badge from "@/app/(public)/ui/Badge/Badge";
import Button from "@/app/(public)/ui/Button/Button";
import TitleHeader from "@/app/(public)/ui/TitleHeader/TitleHeader";
import { Check, ShoppingCart } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React from "react";

interface Props {
  product: {
    name: string;
    category?: string;
    image: StaticImageData;
    description: string;
    price: number;
    isNew?: boolean;
  };
}

const ProductDetail = ({ product }: Props) => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-10 py-10 gap-16 ">
        <div className="w-full bg-white aspect-square object-cover rounded-lg">
          <Image
            src={product?.image}
            alt={product.name}
            loading="lazy"
            className="rounded-lg mx-auto"
          />
        </div>
        <div className="space-y-8">
          
          {product?.category && (
            
            <Badge title={product.category} variant={"primary"} />
          )}
          <TitleHeader title={product.name} />
          <h1 className="text-5xl text-amber-600 font-light font-serif">
            ${product.price}
          </h1>

          <Badge
            variant="stock"
            title={"In Stock"}
            icon={<Check size={"14px"} strokeWidth={"4px"} />}
            className="font-extrabold"
          />

          <p className="font-light text-justify">{product?.description}</p>

          <SizeDetail />
          <Button
            title="add to cart"
            variant="primary"
            firstIcon={<ShoppingCart />}
            className="px-10 w-full flex justify-center gap-5"
          />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
