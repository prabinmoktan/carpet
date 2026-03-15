import { usePostCartItemsMutation } from "@/app/services/cart.api";
import useGuestCart from "./useGuestCart";
import React from "react";
import { useMeQuery } from "../../(auth)/auth.api";


const useCartSync = () => {
  const { cart, clearGuestCart } = useGuestCart();
  const [updateCart] = usePostCartItemsMutation();
  // const dispatch = useDispatch();

  const { data, isLoading } = useMeQuery();

  React.useEffect(() => {
    console.log("useCartSync fired — cart:", cart, "user:", data?.user?._id);
    // ...
  }, [isLoading]);
  React.useEffect(() => {
    if(isLoading)return;
    if(!data?.user) return;
    if (!cart.length) return;
    const syncCart = async () => {
      try {
        const formattedCart = {
          items: cart.map((item) => ({
            productId: item._id,
            titleSnapshot: item.title,
            imageSnapshot: item.images?.[0],
            priceSnapshot: item.finalPrice,
            quantity: item.quantity,
          })),
        };
        
        await updateCart(formattedCart).unwrap(); 
        clearGuestCart();

        console.log('cart after cart sync in redux', cart)

        
      } catch (error) {
        console.error("Cart sync failed", error);
      }
    };
    syncCart();
  }, [isLoading]);
};
export default useCartSync;

 