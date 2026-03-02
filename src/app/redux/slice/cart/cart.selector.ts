import { RootState } from "../../store";

export const selectCart = (state: RootState) => state.cart.items;

export const selectTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectTotalAmount = (state: RootState) =>
  state.cart.items.reduce((total, item) => {
    const price = item.finalPrice ?? item.price;
    return total + price * item.quantity;
  }, 0);

export const selectCartTotalSaving = (state: RootState) =>
  state.cart.items.reduce((total, item) => {
    if (item.finalPrice === item.price) return total;
    const savingPerUnit = item.price - (item?.finalPrice ?? item.price);
    return total + savingPerUnit * item.quantity;
  }, 0);

export const selectOriginalPrice = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
