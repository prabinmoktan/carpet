import { dbConnect } from "@/app/admin/lib/database/db";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { Cart } from "@/app/admin/lib/models/cart.model";
import Product from "@/app/admin/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const { items } = await req.json();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    let cart = await Cart.findOne({ userId: user.id });
    if (!cart) {
      cart = await Cart.create({
        userId: user.id,
        items: [],
      });
    }
    for (const guestItem of items) {
      const product = await Product.findById(guestItem.productId);
      if (!product) continue;
      const safeQuantity = Math.min(guestItem.quantity, product.stock);
      const unitPrice = product.onSale
        ? product.finalPrice ?? product.price
        : product.price;

      const finalPriceSnapshot = unitPrice * safeQuantity;
      const existingItem = cart.items.find(
        (item: { productId: { productId: string } }) =>
          item.productId.toString() === guestItem._id
      );
      if (existingItem) {
        const newQuantity = existingItem.quantity + guestItem.quantity;

        if (newQuantity > product.stock) {
          existingItem.quantity = product.stock;
        } else {
          existingItem.quantity = newQuantity;
        }
      } else {
        cart.items.push({
          productId: product._id,
          titleSnapshot: product.title,
          imageSnapshot: product.images?.[0],
          priceSnapshot: product.price,
          finalPriceSnapshot,
          quantity: Math.min(guestItem.quantity, product.stock),
        });
      }
      
    }
    await cart.save();
   return NextResponse.json({success: true, cart})
  } catch (error) {
    return NextResponse.json({success: false, message: "Server error while merging cart items "}, {status: 500})
  }
};
