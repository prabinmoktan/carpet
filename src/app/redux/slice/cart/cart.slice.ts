import { productTypes } from "@/app/(public)/(pages)/shop/[slug]/_components/ProductData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  title: string;
  category?: string;
  images?: string[];
  description?: string;
  price: number;
  isLatest?: boolean;
  stock?: number;
  onSale?: boolean;
  sale?: {
    startsAt: Date;
    endsAt: Date;
    percentage: number;
  };
  finalPrice?: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<productTypes>) => {
      const product = action.payload;
      const priceToUse = product.finalPrice ?? product.price;
      const existingItem = state.items.find((i) => i._id === product._id);
      if (existingItem) {
        if (product.stock && existingItem.quantity >= product.stock) {
          return;
        }
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,

          finalPrice: priceToUse,
          quantity: 1, // ✅ must initialize
        });
      }
      state.totalQuantity += 1;
      state.totalAmount += priceToUse;
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find((i) => i._id === _id);

      if (item) {
        const difference = quantity - item.quantity;
        item.quantity = Math.max(1, quantity);
        state.totalQuantity += difference;
        state.totalAmount += difference * item.price;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.totalAmount -= item.price * item.quantity;
        state.items = state.items.filter((i) => i._id !== _id);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
