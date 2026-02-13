import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const QuantityButton = ({stock}: {stock: number}) => {
    const [quantity, setQuantity] = useState(1);
    const updateQuantity = (change: number)=> {
        setQuantity(prev => Math.max(1, prev + change));
    }
  return (
    <>
      <div className="flex gap-4  items-center">
      <button className="border p-1 disabled:opacity-50 bg-amber-500" onClick={()=>updateQuantity(-1)} disabled={quantity === 1} >
        <Minus size={'13px'}/>
      </button>
      {quantity}
      <button className="border p-1 bg-amber-500 disabled:opacity-50" onClick={()=>updateQuantity(+1)} disabled={quantity === stock}>
        <Plus size={'13px'}/>
      </button>
      </div>
    </>
  );
};

export default QuantityButton;
