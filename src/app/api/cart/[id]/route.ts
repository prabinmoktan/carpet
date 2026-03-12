import { dbConnect } from "@/app/admin/lib/database/db";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { Cart } from "@/app/admin/lib/models/cart.model";
import Product from "@/app/admin/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await dbConnect();
  try {
    const { id } = await params;
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not available. please login again",
        },
        { status: 401 }
      );
    }
    const cart = await Cart.findOne({ userId: user.id });
    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }
    const existingItem = cart.items.some(
      (item: { productId: string }) => item.productId.toString() === id
    );
    if (!existingItem) {
        return NextResponse.json(
          { success: false, message: "Product not found in cart." },
          { status: 404 }
        );
      }
  
    cart.items = cart.items.filter(
      (item: { productId: string }) => item.productId.toString() !== id
    );
    await cart.save();
    return NextResponse.json(
      { success: false, message: "Product removed from cart", cart },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
        { success: false, message: "Internal server error." },
        { status: 500 }
      );
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  await dbConnect();
  try {
    const { id } = await params;
    const { action } = await req.json(); //expects action as increment and decrement
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not available. please login again",
        },
        { status: 401 }
      );
    }
    const cart = await Cart.findOne({ userId: user.id });
    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }
    const items = cart.items.find(
      (item: { productId: { toString: () => string }; quantity: number }) =>
        item.productId.toString() === id
    );
    if (!items) {
      return NextResponse.json({
        success: false,
        message: "Product not found in cart",
      });
    }
    if (action === "increment") {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json(
          { success: false, message: "Product no longer exists." },
          { status: 404 }
        );
      }
      if (items.quantity >= product.stock) {
        return NextResponse.json(
          {
            success: false,
            message: `Only ${product.stock} item(s) available in stock.`,
            maxReached: true, // <-- frontend can use this flag
            stock: product.stock,
          },
          { status: 400 }
        );
      }
      items.quantity += 1;
    } else if (action === "decrement") {
      if (items.quantity <= 1) {
        cart.items = cart.items.filter(
          (i: { productId: { toString: () => string } }) =>
            i.productId.toString() !== id
        );
      } else {
        items.quantity -= 1;
      }
    }
    await cart.save();
    return NextResponse.json(
      {
        success: false,
        message: "Cart Updated",
        cart,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error.", error },
      { status: 500 }
    );
  }
};
