"use client";
import {
  selectCart,
  selectCartTotalSaving,
  selectOriginalPrice,
  selectTotalAmount,
  selectTotalQuantity,
} from "@/app/redux/slice/cart/cart.selector";
import { clearCart } from "@/app/redux/slice/cart/cart.slice";
import { usePostCartItemsMutation } from "@/app/services/cart.api";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCartHooks = () => {
  const [mounted, setMounted] = React.useState(false);
  const [updateCart, { isLoading }] = usePostCartItemsMutation();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectTotalAmount);
  const totalSaving = useSelector(selectCartTotalSaving);
  const originalPrice = useSelector(selectOriginalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);
  console.log("cart==>", cart);

  const formattedCart = {
    items: cart.map((item)=> ({
      productId: item._id,
      titleSnapshot: item.title,
      imageSnapshot: item.images?.[0],
      priceSnapshot: item.finalPrice,
      quantity: item.quantity

    }))
  }
console.log("formattedCart==>", formattedCart)
  useEffect(() => {
    const syncCart = async () => {
      try {
        const res = await updateCart(formattedCart).unwrap();
        console.log("response from cart oage==>", res)
        return res;
        // dispatch(clearCart());
      } catch (error) {
        console.error("Cart sync failed", error);
      }
    };
    syncCart();
  }, [ mounted ]);


  return {
    cart,
    totalAmount,
    totalSaving,
    originalPrice,
    totalQuantity,
    mounted,
    handleClearCart,
    isLoading
  };
};

export default useCartHooks;
