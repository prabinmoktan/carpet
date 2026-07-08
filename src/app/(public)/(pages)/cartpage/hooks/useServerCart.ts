import { selectUser } from "@/app/redux/slice/auth/auth.selector";
import { clearCart } from "@/app/redux/slice/cart/cart.slice";
import {
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/app/services/cart.api";
import { useDispatch, useSelector } from "react-redux";

const useServerCart = () => {
  const { data, isLoading } = useGetCartQuery(undefined);
  const [deleteItem] = useDeleteCartItemMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [updateItem] = useUpdateCartMutation();

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const isServercart = !!user;
  const cartSummary = data?.summary ||  {
    originalPrice: 0,
    totalAmount: 0,
    totalSaving: 0,
    totalQuantity: 0,
  };;

  const items = data?.cart?.items || [];
  const deletecartItemById = async (id: string) => {
    await deleteItem(id).unwrap();
  };
  const clearCartItems = async () => {
    if (isServercart) {
      await deleteCart().unwrap();
    } else {
      dispatch(clearCart());
    }
  };

  const updateCart = async (payload: {
    id: string;
    action: "increment" | "decrement";
  }) => {
    await updateItem(payload).unwrap();
  };

  return {
    items,
    cartSummary,
    isLoading,
    deletecartItemById,
    clearCartItems,
    updateCart,
    isServercart,
  };
};

export default useServerCart;
