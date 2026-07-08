import mongoose, {  Schema, Types } from "mongoose";
import User from "./user.model";
import Product from "./product.model";

export interface ICartItem {
  productId: Types.ObjectId;
  titleSnapshot: string;
  imageSnapshot: string;
  priceSnapshot: number;
  finalPriceSnapshot: number;
  quantity: number;
}

export interface ICart {
  userId: string;
  items: ICartItem[];
  originalPrice: number;
  totalSaving: number;
  totalAmount: number, 
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
    finalPriceSnapshot: {
      type: Number,
      
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
    totalAmount: {type: Number},
    totalSaving: {type: Number}, 
    originalPrice: {type: Number}
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
