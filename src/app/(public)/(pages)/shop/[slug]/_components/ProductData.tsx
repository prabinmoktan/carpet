"use client";
import SizeDetail from "@/app/(public)/components/SizeDetail/SizeDetail";
import Badge from "@/app/(public)/ui/Badge/Badge";
import Button from "@/app/(public)/ui/Button/Button";
import TitleHeader from "@/app/(public)/ui/TitleHeader/TitleHeader";
import { Check, ShoppingCart } from "lucide-react";

import fallback_image from "../../../../../../../public/placeholder.png";
import React, { useState } from "react";
import QuantityButton from "@/app/(public)/ui/QuantityButton/QuantityButton";
import ImageMagnifier from "@/app/(public)/components/ImageMagnifier/ImageMagnifier";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/slice/cart/cart.slice";
import OptimizedImage from "@/app/(public)/components/OptimizedImage/OptimizedImage";

export interface productTypes {
  quantity: number;
  _id: string;
  title: string;
  category?: string;
  images?: string[];
  description?: string;
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
  // quantity?: number;
}

export interface Props {
  product: productTypes;
}

const ProductData = ({ product }: Props) => {
  const images = product.images ?? [];
  const [selectedImage, setSelectedImage] = useState<string | undefined>(images[0]);
  // const imageSrc =
  //   product?.images && product.images?.length > 0
  //     ? product.images[0]
  //     : fallback_image ;

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 mt-10 py-10 gap-16 mb-10 ">
        <div className=" aspect-square object-contain rounded-lg w-full  flex justify-center ">
          <div className="max-w-125 relative">
            <ImageMagnifier
              src={selectedImage ?? fallback_image} 
              className=" absolute"
            />
            {product?.sale?.percentage && (
              <Badge
                title={`${product.sale?.percentage}%`}
                variant={"sale"}
                className="z-10 absolute top-2 left-2"
              />
            )}
            <div className="flex flex-wrap gap-3">
              {product.images &&
                product.images.length > 1 &&
                product.images?.map((item, index) => (
                  <div key={index} onClick={()=>setSelectedImage(item)}>
                    <OptimizedImage
                      publicId={item}
                      alt={product.title}
                      width={100}
                      height={150}
                      className={`border cursor-pointer p-1 ${
                        selectedImage === item ? "border-amber-500 border-2" : "border-gray-700"
                      }`}
                    />
                  </div>
                ))}
            </div>
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

          <Button
            title="add to cart"
            variant="primary"
            firstIcon={<ShoppingCart />}
            className="px-10 w-full flex justify-center gap-5"
            onClick={handleAddToCart}
          />
        </div>
      </section>
    </>
  );
};

export default ProductData;
