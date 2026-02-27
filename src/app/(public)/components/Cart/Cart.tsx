"use client"
import { ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import type { RootState } from "@/app/redux/store";
import Image from "next/image";
import Button from "../../ui/Button/Button";
import "../../../../../public/placeholder.png";
import { useRouter } from "next/navigation";


const Cart = () => {
    const route = useRouter();

 
    const [mounted, setMounted] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const totalQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );
  const product = useSelector((state: RootState) => state.cart.items);

 
    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
    }, []);

    if(!mounted){
      return(<div className="relative inline-block">
      <div className="relative flex flex-col justify-center cursor-pointer">
        <ShoppingBag size="1.2rem" />
      </div>
    </div>)
    }

  return (
    <>
      <div className="relative inline-block ">
        <div
          className="relative flex  flex-col justify-center w-full"
          onClick={() => setShowCart(!showCart)}
        >
          <span
            
            className={`text-xs bg-amber-500 rounded-full  text-white absolute -top-2  px-1 -right-2 ${
              totalQuantity > 0 ? "flex" : "hidden"
            }`}
          >
            {totalQuantity}
          </span>

          <ShoppingBag size={"1.2rem"} fontWeight={"light"} className="cursor-pointer"/>
        </div>
        {showCart && (
          <div className="md:w-70 md:max-w-87.5 w-screen  absolute top-full rounded-md  bg-white/20 px-2 py-2 md:right-0 -right-10 flex flex-col gap-2 shadow-2xl">
           
            {product?.length === 0 ? (
              <h1 className="text-center">No cart Items</h1>
            ): 
          <h1 className="text-sm font-bold">Your Cart</h1> 
            }
            {product?.map((item) => (
              <div key={item._id} className="flex gap-4 h-10 justify-between backdrop-blur-3xl">
                <Image
                  width={25}
                  height={30}
                  alt={item.title}
                  src={(item.images?.[0] as string) || "/placeholder.png"}
                />
                <p className="text-sm">
                  {item?.title.length > 20
                    ? item.title.slice(0, 30) + "..."
                    : item.title}
                </p>
                {item.quantity > 1 && (
                  <p className="text-xs">{item?.quantity}items</p>
                )}
              </div>
            ))}
            {product?.length > 0 && (
              <div className="flex flex-col gap-2">
                <Button
                  title={`view cart (${totalQuantity})`}
                  variant={"glass"}
                  className="flex justify-center"
                  onClick={()=> {route.push(`/cartpage`) 
                    setShowCart(false)}}
                />
                <Button
                  title={"checkout"}
                  variant={"primary"}
                  className="flex justify-center"
                  onClick={()=>{route.push('/checkout')
                    setShowCart(false)
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
