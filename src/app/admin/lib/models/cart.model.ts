import mongoose, {  Schema, Types } from "mongoose";
import User from "./user.model";
import Product from "./product.model";

export interface ICartItem {
  productId: Types.ObjectId;
  titleSnapshot: string;
  imageSnapshot: string;
  priceSnapshot: number;
  quantity: number;
}

export interface ICart {
  userId: string;
  items: ICartItem[];
}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: {
      type: Types.ObjectId,
      ref: Product,
      required: true,
    },
    titleSnapshot: {
      type: String,
      required: true,
    },
    imageSnapshot: {
      type: String,
      required: true,
    },
    priceSnapshot: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      ref: User,
      unique: true,
      required: true,
    },
    items: [CartItemSchema],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
