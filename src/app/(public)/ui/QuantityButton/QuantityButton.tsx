import { removeFromCart, updateQuantity } from "@/app/redux/slice/cart/cart.slice";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const QuantityButton = ({
  stock,
  productId,
  quantity,
}: {
  stock: number;
  productId: string;
  quantity: number;
}) => {
  // const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const handleUpdateQuantity = (change: number) => {
    const newQuantity = quantity + change;
    console.log(quantity)
    console.log(change)
    console.log(newQuantity)
    if(newQuantity){
      console.log('its running remove from cart')
      dispatch(updateQuantity({_id: productId, quantity: newQuantity}))
      return;
    }
    if(newQuantity > stock) return;
    if(quantity === 1){
      console.log('its not clicked ')
      dispatch(removeFromCart(productId));

    }

  };

  return (
    <>
      <div className="flex gap-4  items-center border border-gray-400  px-5 py-2 rounded-full ">
        <button
          className=" p-1 disabled:opacity-50 cursor-pointer"
          onClick={() => handleUpdateQuantity(-1)}
          // disabled={quantity === 1}
        >
          {quantity === 1 ? <Trash2 size={"18px"} color="red"/> :  <Minus size={"18px"} />}
         
        </button>
        {quantity || 1}
        <button
          className=" p-1 disabled:opacity-50 cursor-pointer"
          onClick={() => handleUpdateQuantity(+1)}
          disabled={quantity === stock}
        >
          <Plus size={"18px"} />
        </button>
      </div>
    </>
  );
};

export default QuantityButton;
