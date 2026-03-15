"use client";
import React from "react";

import CartCard from "@/app/(public)/components/CartCard/CartCard";
import useGuestCart from "../../hooks/useGuestCart";
import useServerCart from "../../hooks/useServerCart";
import { normalizeServerCart } from "@/app/(public)/lib/normalizeServerCart";

const CartItems = () => {
  const { cart } = useGuestCart();
  const { items, isLoading } = useServerCart();
  const normalizeCartItem = normalizeServerCart(items)
  const cartItem = cart.length ? cart : normalizeCartItem;

  return (
    <>
      <div className="  bg-white p-4 md:p-6 flex flex-col gap-3">
        {cartItem?.map((item) => (
          <CartCard
            key={item._id}
            title={item.title}
            category={item?.category as string}
            images={item?.images?.[0] as string}
            productId={item._id}
            price={item.price}
            stock={item.stock as number}
            quantity={item.quantity}
            finalPrice={item.finalPrice as number}
          />
        ))}
        
      </div>
    </>
  );
};

export default CartItems;
