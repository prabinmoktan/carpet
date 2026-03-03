import { model, models, Schema } from "mongoose";

export interface IOrderItem {
  product: Schema.Types.ObjectId;
  name: string;
  images: string;
  price: number;
  finalPrice: number;
  discountPercent: number;
  discountAmount: number;
  quantity: number;
  subTotal: number;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IPayment {
  method: "cash_on_delivery" | "stripe" | "card";
  status: "pending" | "paid" | "failed" | "refunded";
  transactionId: string;
  paidAt: Date;
}

export interface IStatusHistory {
  status: string;
  changedAt: Date;
  note?: string;
}

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  orderNumber: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  payment: IPayment;
  pricing: {
    subtotal: number;
    shippingCharge: number;
    discount: number;
    tax: number;
    total: number;
  };
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "refunded";
  statusHistory: IStatusHistory[];
  notes?: string;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  
  images: { type: String, required: true },
  price: { type: Number, required: true },
  finalPrice: {type: Number, required: true},
  discountAmount: {type: Number,  default: 0},
  discountPercent:{type:Number,default:0, min:0, max: 100},
  quantity: { type: Number, required: true, min: 1 },
  subTotal: { type: Number, required: true },
});

const ShippingAddressSchema = new Schema<IShippingAddress>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true, default: "QATAR" },
});

const PaymentSchema = new Schema<IPayment>({
  method: {
    type: String,
    required: true,
    enum: ["cash_on_delivery", "stripe", "card"],
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "paid", "failed", "refunded"],
    default: "pending",
  },
  transactionId: { type: String, required: true },
  paidAt: { type: Date },
});

const OrderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  orderNumber: { type: String, unique: true },
  items: { type: [OrderItemSchema], required: true },
  shippingAddress: { type: ShippingAddressSchema, required: true },
  payment: { type: PaymentSchema, required: true },
  pricing: {
    subtotal: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
      "refunded",
    ],
    default: "pending",
  },

  // ✅ Track every status change for admin audit
  statusHistory: [
    {
      status: { type: String, required: true },
      changedAt: { type: Date, default: Date.now },
      note: { type: String },
    },
  ],
  notes: { type: String },
  deliveredAt: { type: Date },
  cancelledAt: { type: Date },
  cancelReason: { type: String },
});

//auto generate order number before saving 
OrderSchema.pre("save", async function () {
    if(!this.orderNumber){
        const count = await Order.countDocuments();
        const year = new Date().getFullYear();
        this.orderNumber = `ORD-${year}-${String(count + 1).padStart(5,"0")}`
    }
    //auto push  to statusHistory when status changes
if(this.isModified("status")){
    this.statusHistory.push({
        status: this.status,
        changedAt: new Date()
    })
}
})

const Order = models.Order || model<IOrder>("Order", OrderSchema)