import { dbConnect } from "@/app/admin/lib/database/db";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { Cart } from "@/app/admin/lib/models/cart.model";
import Product from "@/app/admin/lib/models/product.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await dbConnect();
    try {
      //finding user
      const user = await getAuthenticatedUser();
      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not available" },
          { status: 401 }
        );
      }
      //find cart by userId
      const { items } = await req.json();
  
      const userId = new mongoose.Types.ObjectId(user.id); // ✅ consistent ObjectId
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = await Cart.create({ userId, items: [] });
      }
  
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const productIds = items.map((i) => i.productId);
      const products = await Product.find({
        _id: { $in: productIds },
      });
  
      const productMap = new Map(products.map((p) => [p._id.toString(), p]));
  
      for (const guestItem of items) {
        // ✅ use _id to match what you mapped with
        const product = productMap.get(guestItem.productId);
        if (!product) {
          console.log("Product not found for", guestItem.productId);
          continue;
        }
  
        const existingItem = cart.items.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => item.productId.toString() === guestItem.productId.toString() // ✅ same field
        );
  
        const safeQuantity = Math.min(guestItem.quantity, product.stock);
        const unitPrice = product.onSale
      ? product.finalPrice ?? product.price
      : product.price;
  
    const finalPriceSnapshot = unitPrice * safeQuantity;
        
  
        if (existingItem) {
          existingItem.quantity = safeQuantity;
          existingItem.finalPriceSnapshot = finalPriceSnapshot;
          
        } else {
          cart.items.push({
            productId: product._id,
            titleSnapshot: product.title,
            imageSnapshot: product.images?.[0],
            priceSnapshot: product.price,
            finalPriceSnapshot,
            quantity: safeQuantity,
          });
        }
      }
  
      await cart.save();
      return NextResponse.json({ success: true, cart });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "server error occured while adding cart items to user",
        error,
      });
    }
  };