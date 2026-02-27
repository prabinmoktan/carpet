import React from "react";
import QuantityButton from "../../ui/QuantityButton/QuantityButton";
import Image from "next/image";


interface CartCardTypes {
  title: string;
  category: string;
  images: string;
  productId: string;
  price: number;
  stock: number;
  quantity: number;
  finalPrice: number;
}

const CartCard: React.FC<CartCardTypes> = ({
  productId,
  title,
  images,
  price,
  stock,
  quantity,
  category,
  finalPrice
}) => {
  return (
    <>
      <div className="space-y-4   md:flex md:items-center md:justify-between md:gap-6 md:space-y-0  px-3 py-1">
        <a href="#" className=" shrink-0 md:order-1 flex-1">
          <Image
            src={images}
            alt={title}
            width={150}
            height={250}
            className=" aspect-3/4"
          />
        </a>
        <div className="w-full min-w-0 flex-2 space-y-4 md:order-2 md:max-w-md flex flex-col items-start">
            <span>

          <a
            href="#"
            className="text-base font-medium text-gray-900 hover:underline dark:text-white uppercase"
          >
            {title}
          </a>
          <p className="text-sm capitalize text-gray-500">{category}</p>
        
            </span>

          <QuantityButton
              stock={stock}
              productId={productId}
              quantity={quantity}
              />
            
          
        </div>

      
        <div className="flex items-center justify-between md:order-3 md:justify-end flex-1">
         
          <div className="text-end md:order-4 md:w-36 flex gap-3">
            {
                price > finalPrice && (

                    <p className="line-through text-gray-500">QAR{price}</p>
                )
            }
            <p className="text-base font-bold text-gray-900 dark:text-white">
              QAR{finalPrice}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
