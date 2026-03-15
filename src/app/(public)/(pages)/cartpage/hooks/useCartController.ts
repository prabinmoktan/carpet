import { useDispatch } from "react-redux";
import useGuestCart from "./useGuestCart";
import useServerCart from "./useServerCart";
import {
  removeFromCart,
  updateQuantity,
} from "@/app/redux/slice/cart/cart.slice";
import { requireUser } from "@/app/admin/lib/requireUser";
import { useMeQuery } from "../../(auth)/auth.api";

const useCartController = () => {
  const { cart } = useGuestCart();

  const dispatch = useDispatch();
  const { deletecartItemById, clearCart, updateCart } = useServerCart();

  const { data, isLoading } = useMeQuery();

  const isServercart = !!data?.user;
  console.log("isServercart==>", isServercart)

  const increaseQuantity = async (
    productId: string,
    quantity: number,
    stock: number
  ) => {

    
    const newQuantity = quantity + 1;
    if (isServercart) {
      await updateCart({ id: productId, action: "increment" });
    } else {
      dispatch(updateQuantity({ _id: productId, quantity: newQuantity }));
    }
    console.log("quantity from increment=>", quantity);
  };
  const decreaseQuantity = async (productId: string, quantity: number) => {
    console.log("productId =>", productId);
    console.log("quantity =>", quantity);
    console.log("isServercart =>", isServercart);
    if(isLoading) return;
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
        console.log('newQuantity <= 0 this condition is running right now')
      if (isServercart) {
        console.log("delete by cart api id running ");
        await deletecartItemById(productId);
        // return;
        // console.log( dispatch(removeFromCart(productId)))
        // dispatch(removeFromCart(productId));
      } else {
        console.log("delete by redux running");
        dispatch(removeFromCart(productId));
      }
      return;
    }
    if (isServercart) {
        console.log('uodate card from decrement running')
      await updateCart({ id: productId, action: "decrement" });
    } else {
      dispatch(updateQuantity({ _id: productId, quantity: newQuantity }));
    }
    
  };
  return {
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useCartController;
