
'use client'
import React from 'react'
import useCartHooks from '../../useCartHooks/useCartHooks'
import CartCard from '@/app/(public)/components/CartCard/CartCard';


const CartItems = () => {
  const {cart} = useCartHooks();
  
  return (
    <>
    <div className="  bg-white p-4 md:p-6 flex flex-col gap-3">
                {cart?.map((item) => (
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
  )
}

export default CartItems