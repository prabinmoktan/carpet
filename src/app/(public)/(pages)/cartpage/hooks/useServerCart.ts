import {
  useDeleteCartItemMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/app/services/cart.api";

const useServerCart = () => {
  const { data, isLoading } = useGetCartQuery(undefined);
  const [deleteItem] = useDeleteCartItemMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [updateItem] = useUpdateCartMutation();

 

  const items = data?.cart?.items || [];
  const deletecartItemById = async (id: string) => {
    await deleteItem(id).unwrap();
  };
  const clearCart = async () => {
    await deleteCart().unwrap();
  };

  const updateCart = async (payload: {
    id: string;
    action: "increment" | "decrement";
  }) => {
    await updateItem(payload).unwrap();
  };

  return {
    items,
    isLoading,
    deletecartItemById,
    clearCart,
    updateCart,
  };
};

export default useServerCart;
