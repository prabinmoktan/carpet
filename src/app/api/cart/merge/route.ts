// import mongoose, { Types } from 'mongoose';
// import { dbConnect } from "@/app/admin/lib/database/db";
// import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
// import { Cart } from "@/app/admin/lib/models/cart.model";
// import Product from "@/app/admin/lib/models/product.model";
// import { NextRequest, NextResponse } from "next/server";

// export const POST = async (req: NextRequest) => {
//   await dbConnect();
//   try {
//     const user = await getAuthenticatedUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }
//     const { items } = await req.json();

//     let cart = await Cart.findOne({ userId: user.id });
//     if (!cart) {
//       cart = await Cart.create({
//         userId: user.id,
//         items: [],
//       });
//     }
//     let totalAmout = 0;
//     let totalSaving = 0;
//     let originalPrice = 0;

//     //fetch products in one query
//     const productIds = items.map((item: any)=> new mongoose.Types.ObjectId(item.productId));
//     const products = await Product.find({_id: { $in : productIds}});
//     const productMap = new Map(
//       products.map((p)=> [p._id.toString(), p])
//     );

//     for (const guestItem of items) {
//       const product = await Product.findById(guestItem.productId);
//       console.log("product in guestItem==>", product);
//       if (!product) continue;

//       const original = product.price;
//       const finalPrice = product.finalPrice;

//       originalPrice += original * guestItem.quantity;
//       totalAmout += finalPrice * guestItem.quantity;
//       totalSaving += (original -finalPrice) * guestItem.quantity;
//       const safeQuantity = Math.min(guestItem.quantity, product.stock);
//       const unitPrice = product.onSale
//         ? product.finalPrice ?? product.price
//         : product.price;

//       const finalPriceSnapshot = unitPrice * safeQuantity;
//       const existingItem = cart?.items.find(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (item: any) =>
//           item.productId.toString() === guestItem.productId.toString()
//       );
//       console.log("existingItem=>", existingItem);
//       existingItem.finalPriceSnapshot =
//       existingItem.quantity * unitPrice;

//       if (existingItem) {
//         const newQuantity = existingItem.quantity + safeQuantity;
//         console.log("exsiting item condition newQuantity==> ", newQuantity);
//         if (newQuantity > product.stock) {

//           existingItem.quantity = product.stock;
//         } else {
//           console.log(
//             "existingItem from merge api existingItem.quantity = newQuantity ==>",
//             existingItem
//           );
//           existingItem.quantity = newQuantity;
//         }
//       } else {
//         cart.items.push({
//           productId: product._id,
//           titleSnapshot: product.title,
//           imageSnapshot: product.images?.[0],
//           priceSnapshot: product.price,
//           finalPriceSnapshot,
//           quantity: Math.min(guestItem.quantity, product.stock),
//         });
//       }
//     }
//     await cart.save();
//     return NextResponse.json({ success: true, cart });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: "Server error while merging cart items " },
//       { status: 500 }
//     );
//   }
// };

import { dbConnect } from "@/app/admin/lib/database/db";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { Cart } from "@/app/admin/lib/models/cart.model";
import Product from "@/app/admin/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
  await dbConnect();

  try {
    // 1. AUTH
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { items = [] } = await req.json();

    // 2. GET OR CREATE CART
    let cart = await Cart.findOne({ userId: user.id });

    if (!cart) {
      cart = await Cart.create({
        userId: user.id,
        items: [],
      });
    }

    // 3. FETCH ALL PRODUCTS IN ONE QUERY (OPTIMIZED)
    const productIds = items.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => new mongoose.Types.ObjectId(item.productId)
    );

    const products = await Product.find({
      _id: { $in: productIds },
    });

    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    // 4. MERGE GUEST CART INTO USER CART
    for (const guestItem of items) {
      const product = productMap.get(guestItem.productId.toString());
      if (!product) continue;

      const safeQuantity = Math.min(guestItem.quantity, product.stock);

      const unitPrice = product.onSale
        ? product.finalPrice ?? product.price
        : product.price;

      const existingItem = cart.items.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) =>
          item.productId.toString() === guestItem.productId.toString()
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + safeQuantity;

        existingItem.quantity = Math.min(newQuantity, product.stock);

        // ✅ Update snapshot
        existingItem.finalPriceSnapshot = existingItem.quantity * unitPrice;

        existingItem.priceSnapshot = product.price;
      } else {
        cart.items.push({
          productId: product._id,
          titleSnapshot: product.title,
          imageSnapshot: product.images?.[0],
          priceSnapshot: product.price,
          finalPriceSnapshot: unitPrice * safeQuantity,
          quantity: safeQuantity,
        });
      }
    }

    // 5. SAVE CART AFTER MERGE
    await cart.save();

    // 6. CALCULATE TOTALS USING SNAPSHOT (FAST + SAFE)
    let totalAmount = 0;
    let totalSaving = 0;
    let originalPrice = 0;
    let totalQuantity = 0;

    for (const item of cart.items) {
      const itemOriginal = item.priceSnapshot * item.quantity;
      const itemFinal = item.finalPriceSnapshot;

      originalPrice += itemOriginal;
      totalAmount += itemFinal;
      totalSaving += itemOriginal - itemFinal;
      totalQuantity += item.quantity;
    }

    // 7. RESPONSE
    return NextResponse.json({
      success: true,
      cart,

      summary: {
        originalPrice,
        totalAmount,
        totalQuantity,
        totalSaving,
      },
    });
  } catch (error) {
    console.error("MERGE CART ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error while merging cart items",
      },
      { status: 500 }
    );
  }
};
