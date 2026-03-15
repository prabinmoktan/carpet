import { NormalizedCartItem, ServerCartItem } from "@/app/types";

export const normalizeServerCart = (
  items: ServerCartItem[]
): NormalizedCartItem[] => {
  return items.map((item) => ({
    _id: item.productId,
    title: item.titleSnapshot,
    images: item.imageSnapshot ? [item.imageSnapshot] : [],
    price: item.priceSnapshot,
    finalPrice: item.priceSnapshot,
    stock: 0,
    quantity: item.quantity,
  }))
};
