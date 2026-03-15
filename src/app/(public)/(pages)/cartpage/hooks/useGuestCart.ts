"use client";
import {
  selectCart,
  selectCartTotalSaving,
  selectOriginalPrice,
  selectTotalAmount,
  selectTotalQuantity,
} from "@/app/redux/slice/cart/cart.selector";
import {  clearCart } from "@/app/redux/slice/cart/cart.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useGuestCart = () => {
 

  const dispatch = useDispatch();
  const clearGuestCart = () => {
    dispatch(clearCart());
  };
  const cart = useSelector(selectCart);
  const totalAmount = useSelector(selectTotalAmount);
  const totalSaving = useSelector(selectCartTotalSaving);
  const originalPrice = useSelector(selectOriginalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);

  
  
  

  return {
    cart,
    totalAmount,
    totalSaving,
    originalPrice,
    totalQuantity,

    clearGuestCart,
  };
};

export default useGuestCart;
