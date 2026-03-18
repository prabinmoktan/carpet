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
    const { productId, quantity } = await req.json();

    const userId = new mongoose.Types.ObjectId(user.id); // ✅ consistent ObjectId

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { success: false, message: "Invalid productId" },
        { status: 400 }
      );
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid quantity" },
        { status: 400 }
      );
    }

    // ✅ use _id to match what you mapped with
    const product = await Product.findById(productId);
    // productMap.get(guestItem.productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

   
    

   
    let cart = await Cart.findOne({userId})
    if(!cart){
      cart = await Cart.create({userId, items: []})
    }
    const existingItem = cart.items.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any) => item.productId.toString() === productId // ✅ same field
    );
    if (product.stock <= 0) {
      return NextResponse.json(
        { success: false, message: "Product out of stock" },
        { status: 400 }
      );
    }
    const safeQuantity = Math.min(quantity, product.stock);
    const unitPrice = product.onSale
      ? product.finalPrice ?? product.price
      : product.price;

      if (!Number.isFinite(unitPrice)) {
        return NextResponse.json(
          { success: false, message: "Invalid product price" },
          { status: 500 }
        );
      }

    const finalPriceSnapshot = unitPrice * safeQuantity;

    if (existingItem) {

      const newQuantity = Math.min(existingItem.quantity + safeQuantity, product.stock);
      //merge quantity
      existingItem.quantity = newQuantity;
      existingItem.finalPriceSnapshot = unitPrice * newQuantity;
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

    await cart.save();
    return NextResponse.json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "server error occured while adding cart items to user",
        error,
      },
      { status: 500 }
    );
  }
};
