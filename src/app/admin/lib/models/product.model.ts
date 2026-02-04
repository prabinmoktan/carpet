import { model, models, Schema } from "mongoose";
import { ISale, SaleSchema } from "./sale.model";

import { HydratedDocument } from "mongoose";

export type CarpetDocument = HydratedDocument<ICarpet>;

export interface ICarpet {
  title: string;
  category: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  images: string[];
  description: string;
  features?: string[];
  specs?: Record<string, string>;
  slug: string;
  stock: number;
  sale?: ISale;
  createdAt?: Date;
  updatedAt?: Date;
 
}

const ProductSchema = new Schema<ICarpet>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["prayer-mat"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    description: {
      type: String,
      required: true,
    },

    specs: {
      type: Map,
      of: String,
    },

    stock: {
      type: Number,
      min: 0,
      required: true,
    },

    sale: {
      type: SaleSchema,
    },
    // isNew: { type: Boolean, index: true }
  },
  {
    timestamps: true,
  }
);

ProductSchema.virtual("isNew").get(function (this) {
 
  const NEW_DAYS = 15;

  

  if (!this.createdAt) return false;

  const diff =
    Date.now() - this.createdAt.getTime();

  return diff <= NEW_DAYS * 24 * 60 * 60 * 1000;
});

ProductSchema.virtual("onSale").get(function () {
  if (!this.sale) return false;
  const now = Date.now();

  return (
    this.sale.percentage > 0 &&
    now >= this.sale.startsAt.getTime() &&
    now <= this.sale.endsAt.getTime()
  );
});

ProductSchema.virtual("finalPrice").get(function () {
  if (!this.sale
    // !this.sale?.isActive ||
    // !this.sale?.startsAt.getTime() ||
    // !this.sale?.endsAt.getTime()
  ) {
    return this.price;
  }
  return Math.round(this.price - (this.price * this.sale.percentage) / 100);
});

ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

const Product = models.Product || model<ICarpet>("Product", ProductSchema);
export default Product;
