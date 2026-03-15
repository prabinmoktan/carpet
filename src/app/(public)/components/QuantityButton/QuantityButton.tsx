import { removeFromCart, updateQuantity } from "@/app/redux/slice/cart/cart.slice";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import useServerCart from "../../(pages)/cartpage/hooks/useServerCart";
import useCartController from "../../(pages)/cartpage/hooks/useCartController";


interface QuantityButtonTypes{
  stock: number;
  productId: string;
  quantity: number;
  // isServerCart: boolean;
}

const QuantityButton:React.FC<QuantityButtonTypes> = ({
 stock, 
 productId, 
 quantity, 

}) => {



  const {increaseQuantity, decreaseQuantity} = useCartController();


  return (
    <>
      <div className="flex gap-4  items-center border border-gray-400  px-5 py-2 rounded-full ">
        <button
          className=" p-1 disabled:opacity-50 cursor-pointer"
          onClick={() => decreaseQuantity(productId, quantity)}
          // disabled={quantity === 1}
        >
          {quantity === 1 ? <Trash2 size={"18px"} color="red"/> :  <Minus size={"18px"} />}
         
        </button>
        {quantity || 1}
        <button
          className=" p-1 disabled:opacity-50 cursor-pointer"
          onClick={() => increaseQuantity(productId, quantity, stock)}
          disabled={quantity === stock}
        >
          <Plus size={"18px"} />
        </button>
      </div>
    </>
  );
};

export default QuantityButton;
