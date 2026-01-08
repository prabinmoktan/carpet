import { model, models, Schema } from "mongoose";
import { ISale, SaleSchema } from "./sale.model";

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
  stock: string;
  sale?: ISale;
  // discount?: number;
  createdAt?: Date;
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
      enum: ["carpet", "prayer-mat"],
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
      type: String,
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

ProductSchema.virtual("isNew").get(function () {
  // console.log(this.createdAt as Date)
  // const NEW_DAYS = 15;
  // // if (!this.createdAt) return console.log(this.createdAt, 'error here'); // just in case
  // const now = Date.now();
  // console.log('now==>', now)
  // const createdTime = this.createdAt instanceof Date ? this.createdAt.getTime() : new Date(this.createdAt).getTime();
  // console.log('createdTime==>', createdTime)
  // console.log( (now - createdTime) <= NEW_DAYS * 24 * 60 * 60 * 1000);
  // return (now - createdTime) <= NEW_DAYS * 24 * 60 * 60 * 1000;
  const NEW_DAYS = 15;

  // ✅ Multiple fallbacks
  let createdTime: number;
  if (this._id) {
    createdTime = this._id.getTimestamp().getTime();
    console.log("createdTime", createdTime);
  } else if (this.createdAt) {
    createdTime = new Date(this.createdAt).getTime();
    console.log("createdTime==>", createdTime);
  } else {
    return false; // Default safe value
  }

  return Date.now() - createdTime <= NEW_DAYS * 24 * 60 * 60 * 1000;
});

ProductSchema.virtual("onSale").get(function () {
  if (!this.sale) return false;
  const now = Date.now();
  console.log("startsAt==>", now >= this.sale.startsAt.getTime());
  console.log("endsAt===>", now <= this.sale.endsAt.getTime());
  return (
    this.sale.isActive &&
    now >= this.sale.startsAt.getTime() &&
    now <= this.sale.endsAt.getTime()
  );
});

ProductSchema.virtual("finalPrice").get(function () {
  if (
    !this.sale?.isActive ||
    !this.sale?.startsAt.getTime() ||
    !this.sale?.endsAt.getTime()
  ) {
    return this.price;
  }
  return Math.round(this.price - (this.price * this.sale.percentage) / 100);
});

ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

const Product = models.Product || model<ICarpet>("Product", ProductSchema);
export default Product;
