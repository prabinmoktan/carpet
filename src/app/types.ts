export interface CartItem {
  productId: string;
  titleSnapshot: string;
  imageSnapshot: string;
  priceSnapshot: number;
  quantity: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
}
export interface CartApiresponse {
  success: boolean;
  message: string;
  cart?: Cart;
  status: number;
  maxReached?: boolean;
  stock?: number;
}
export interface UpdateQuantityArgs {
  id: string;
  action: "increment" | "decrement";
}

export interface ServerCartItem {
    productId: string;
    titleSnapshot: string;
    imageSnapshot: string;
    priceSnapshot: number;
    quantity: number;
  }
  
  export interface NormalizedCartItem {
    _id: string;
    title: string;
    images: string[];
    price: number;
    finalPrice: number;
    stock: number;
    quantity: number;
    category?: string;
  }
