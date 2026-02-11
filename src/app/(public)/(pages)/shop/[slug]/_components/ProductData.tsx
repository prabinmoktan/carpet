"use client";
import SizeDetail from "@/app/(public)/components/SizeDetail/SizeDetail";
import Badge from "@/app/(public)/ui/Badge/Badge";
import Button from "@/app/(public)/ui/Button/Button";
import TitleHeader from "@/app/(public)/ui/TitleHeader/TitleHeader";
import { Check, ShoppingCart } from "lucide-react";
import Image from "next/image";
import fallback_image from "../../../../../../../public/placeholder.png";
import React from "react";

interface Props {
  product: {
    title: string;
    category?: string;
    images?: string[];
    description: string;
    price: number;
    isLatest?: boolean;
    onSale?: boolean;
    sale?: {
      startsAt: Date;
      endsAt: Date;
      percentage: number;
    };
    finalPrice?: number;
  };
}

const ProductData = ({ product }: Props) => {
  const imageSrc =
    product?.images && product.images?.length > 0
      ? product.images[0]
      : fallback_image;

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-10 py-10 gap-16 ">
        <div className="w-full relative bg-white aspect-square object-cover rounded-lg">
          <Image
            fill
            src={imageSrc}
            alt={product?.title || "image"}
            loading="lazy"
            className="rounded-lg mx-auto"
          />
        </div>
        <div className="space-y-8">
          <div className="flex justify-between">
            {product?.category && (
              <Badge title={product?.category} variant={"primary"} />
            )}
            <span>
              {product?.sale && <Badge title="On Sale" variant={"sale"} />}
            </span>
          </div>
          <TitleHeader title={product?.title} />
          <span className="flex items-baseline justify-baseline"> 
            {product?.finalPrice ? (
              <h1 className="text-5xl text-amber-600 font-light font-serif bg-red-900 flex justify-center items-start gap-4">
                QAR <span className="bg-green-900 -mt-3">
                {product?.finalPrice}
                </span>
              </h1>
            ) : (
              <h1 className="text-3xl text-amber-600 font-light font-serif">
                QAR{product?.price}
              </h1>
            )}
          </span>
          <span>
            {
              product?.finalPrice &&
              <h1 className="text-3xl text-amber-600 font-light font-serif underline">
                QAR{product?.price}
              </h1>

            }
          </span>

          {product?.sale?.percentage && (
            <h1> {product?.sale?.percentage}% Discount</h1>
          )}

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

export default ProductData;
