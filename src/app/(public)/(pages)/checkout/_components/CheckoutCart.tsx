"use client";
import React from "react";
import useServerCart from "../../cartpage/hooks/useServerCart";
import OptimizedImage from "@/app/(public)/components/OptimizedImage/OptimizedImage";

const CheckoutCart = () => {
  const { items, cartSummary } = useServerCart();

  return (
    <>
      {items.length &&
        items.map((item) => (
          <div className="flex gap-4" key={item.productId}>
            <div className="flex justify-between w-full">

           
            <div className="flex gap-4">
              <OptimizedImage publicId={item.imageSnapshot} alt={item.titleSnapshot} width={70} height={100} />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-800">
              {item.titleSnapshot}
              </p>
              <p className="text-xs text-neutral-500">{"Prayer-Mat"}</p>
             <span>

              <p className="text-sm mt-2 text-neutral-900 font-medium">
                QAR{item.finalPriceSnapshot}
              </p>
             </span>
            </div>
            </div>
            <div className="text-xs text-neutral-500">
                <p>Qty:{item.quantity}</p>
            </div>
            </div>
          </div>
        ))}
        <span className="w-full underline "/>

      

      <div className="border-t border-neutral-200 pt-4 space-y-2 text-sm">
      <div className="flex justify-between text-neutral-600">
          <span>Original Price</span>
          <span>QAR {cartSummary.originalPrice || 0}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Discount  Price</span>
          <span className="font-bold text-red-400">QAR {cartSummary.totalSaving || 0}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Subtotal</span>
          <span>QAR {cartSummary.totalAmount || 0}</span>
        </div>
        <div className="flex justify-between text-neutral-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
       
        <div className="flex justify-between font-semibold text-neutral-900 pt-2">
          <span>Total</span>
          <span>QAR {cartSummary.totalAmount || 0}</span>
        </div>
      </div>
    </>
  );
};

export default CheckoutCart;
