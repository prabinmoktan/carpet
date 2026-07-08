
import mongoose from "mongoose";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";

import { dbConnect } from "@/app/admin/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/app/admin/lib/models/checkout.model";
import Product from "@/app/admin/lib/models/product.model";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not available" },
        { status: 404 }
      );
    }
    const { items, shippingAddress: rawShipping, payment: rawPayment } = await req.json();
    const shippingAddress = {
      firstName: rawShipping.firstName?.trim(),
      lastName: rawShipping.lastName?.trim(),
      email: rawShipping.email?.trim(),
      phone: rawShipping.phone?.trim(),
      street: rawShipping.street?.trim(),
      state: rawShipping.state?.trim(),
      city: rawShipping.city?.trim(),
      addressLine1: rawShipping.addressLine1?.trim(),
      addressLine2: rawShipping.addressLine2?.trim() || "",
      zip: rawShipping.zip?.trim(),
      country: rawShipping.country?.trim() || "Qatar", // override your default
    };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "No items available" },
        { status: 400 }
      );
    }
    if (
        !shippingAddress.firstName ||
        !shippingAddress.lastName ||
        !shippingAddress.email ||
        !shippingAddress.phone ||
        !shippingAddress.street ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.addressLine1 ||
        !shippingAddress.zip ||
        !shippingAddress.country
      ) {
        return NextResponse.json(
          { success: false, message: "Incomplete shipping address" },
          { status: 400 }
        );
      }

      const allowedPayment = ["cash_on_delivery" , "stripe" , "card" , "paypal"];

if (!allowedPayment.includes(rawPayment.method)) {
    return NextResponse.json(
      { success: false, message: "Invalid payment method" },
      { status: 400 }
    );
  }
  const productIds = items.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => new mongoose.Types.ObjectId(item.productId)
    );

    const products = await Product.find({ _id: { $in: productIds } });
    let subtotal = 0;
  
    const orderItem = items.map((item: { productId: string; quantity: number; }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const product = products.find((p: { _id: { toString: () => any; }; }) => p._id.toString() === item.productId);
      if (!product) {
        throw new Error("Product not found");
      }
      const price = product.price;
      const discountPercent = product.discountPercent || 0;
      const discountAmount = (price * discountPercent) / 100;
      const finalPrice = price - discountAmount;

      const subTotal = finalPrice * item.quantity;
      subtotal += subTotal;

      return {
        productId: product._id,
        titleSnapshot: product.title,
        imageSnapshot: product.images?.[0] || "",
        priceSnapshot: price,
        finalPriceSnapshot: finalPrice,
        discountAmount,
        discountPercent,
        subTotal,
      };
    });

    let payment;
    if(rawPayment.method === "cash_on_delivery"){
        payment ={
            method: "cash_on_delivery",
            status: "pending",
            transactionId: "COD-" + Date.now(),
            paidAt: null,
        }
    }else {
        if (!rawPayment.transactionId) {
          return NextResponse.json(
            { success: false, message: "Transaction ID required" },
            { status: 400 }
          );
        }
      
        payment = {
          method: rawPayment.method,
          status: "paid", // assuming success
          transactionId: rawPayment.transactionId,
          paidAt: new Date(),
        };
      }
    const shippingCharge = 0; //customizable
    const tax = 0;
    const discount = 0;
    const total = subtotal + shippingCharge + tax - discount;

    //create order
    const order = await Order.create({
      userId: user.id,

      items: orderItem,
      shippingAddress,
      payment, 
      pricing:{
        subtotal,
        shippingCharge, 
        tax,
        discount,
        total
      },
      status:"pending"
    });
    return NextResponse.json({
        success: true, 
        message: "Order created successfully",
        order
    },{
        status: 201
    })

    // const {ShippingAddress} = await req.json()
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:  "Server error while creating order",
      },
      { status: 500 }
    );
  }
};
