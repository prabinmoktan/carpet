"use client";
import CartCard from "@/app/(public)/components/CartCard/CartCard";
import { selectCart } from "@/app/redux/slice/cart.selector";
import { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

interface CheckoutAuthgateTypes {
  cartItems?: {
    title: string;
    images: string | StaticImageData;
    _id: string;
    quantity: number;
  };
}

const CheckoutAuthgate: React.FC<CheckoutAuthgateTypes> = ({ cartItems }) => {
  const cart = useSelector(selectCart);
  console.log(cart);
  return (
    <section>
      <div>
        <h1>Login Required</h1>
        <p>You need to login to complete your checkout</p>
      </div>
      <div>
        <Link
          href="/login?redirect=/checkout"
          className="bg-amber-500 px-10 py-2 rounded-2xl"
        >
          Login
        </Link>
      </div>
      <div className="flex ">
      <div className="flex-2">
        {cart
          ? cart?.map((item) => {
              return (
                <CartCard
                  key={item._id}
                  title={item.title}
                  category={item.category as string}
                  images={item.images?.[0] as string}
                  productId={item._id}
                  price={item.price}
                  stock={item.price}
                  quantity={item.quantity}
                  finalPrice={item.finalPrice as number}
                />
              );
            })
          : "No cart Items available"}
      </div>
      <div className="flex-1">

      </div>
      <div>

      </div>
      </div>
      
    </section>
  );
};

export default CheckoutAuthgate;
