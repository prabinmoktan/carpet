"use client";
import SizeDetail from "@/app/(public)/components/SizeDetail/SizeDetail";
import Badge from "@/app/(public)/ui/Badge/Badge";
import Button from "@/app/(public)/ui/Button/Button";
import TitleHeader from "@/app/(public)/ui/TitleHeader/TitleHeader";
import { Check, ShoppingCart } from "lucide-react";

import fallback_image from "../../../../../../../public/placeholder.png";
import React from "react";
import QuantityButton from "@/app/(public)/ui/QuantityButton/QuantityButton";
import ImageMagnifier from "@/app/(public)/components/ImageMagnifier/ImageMagnifier";

interface Props {
  product: {
    title: string;
    category?: string;
    images?: string[];
    description: string;
    price: number;
    isLatest?: boolean;
    stock?: number;
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
        <div className=" aspect-4/5 object-contain rounded-lg w-full  flex justify-center ">
          <div className="max-w-125 relative">
            <ImageMagnifier src={imageSrc} className="bg-contain absolute" />
            {product?.sale?.percentage && (
              <Badge
                title={`${product.sale?.percentage}%`}
                variant={"sale"}
                className="z-10 absolute top-2 left-2"
              />
            )}
            <span></span>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex justify-between ">
            {product?.category && (
              <Badge title={product?.category} variant={"primary"} />
            )}
            <span>
              {product?.sale && <Badge title="On Sale" variant={"sale"} />}
            </span>
          </div>
          <TitleHeader title={product?.title} />
          <div className="flex  items-center gap-6 ">
            <span className="flex ">
              {product?.finalPrice ? (
                <h1 className="text-4xl text-amber-600 font-light font-cinzel flex justify-center items-start gap-2">
                  QAR
                  {product?.finalPrice}
                </h1>
              ) : (
                <h1 className="text-3xl text-amber-600 font-light font-cinzel">
                  QAR{product?.price}
                </h1>
              )}
            </span>
            <span>
              {!(product?.finalPrice === product?.price) && (
                <div>
                  <h1 className="text-3xl text-amber-600 font-thin font-cinzel line-through flex justify-center ">
                    QAR
                    {product?.price}
                  </h1>
                </div>
              )}
            </span>

            {product?.sale?.percentage && (
              <h1 className="bg-red-500 px-5  rounded-2xl text-white">
                {" "}
                -{product?.sale?.percentage}%
              </h1>
            )}
          </div>
          <Badge
            variant="stock"
            title={"In Stock"}
            icon={<Check size={"14px"} strokeWidth={"4px"} />}
            className="font-extrabold"
          />

          <p>{product?.stock} stocks available</p>

          <p className="font-light text-justify">{product?.description}</p>

          <SizeDetail />
          <QuantityButton stock={product?.stock || 6} />
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
