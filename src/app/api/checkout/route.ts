import { dbConnect } from "@/app/admin/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/admin/lib/models/user.model";
import Product from "@/app/admin/lib/models/product.model";

export const POST = async (req: NextRequest) => {
  dbConnect();
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    const decoded = jwt.verify(
      accessToken!,
      process.env.ACCESS_TOKEN_SECRET!
    ) as jwt.JwtPayload;

    const user = await User.findById(decoded._id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not available. Login again" },
        { status: 401 }
      );
    }
    //parse body
    const body = await req.json();
    const { items, shippingAddress, paymentMethod, notes } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "No items in the cart" },
        { status: 400 }
      );
    }
    //Recalculating from db
    let subTotal = 0;
    const validateItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { message: "Product not found" },
          {
            status: 404,
          }
        );
      }
      const productPrice = product.price;
      const productFinalPrice = product.finalPrice;
      const subTotal = productFinalPrice * item.quantity;

      subTotal += subTotal;

      validateItems.push({
        product: product._id,
        name: product.name,
        images: product.images[0],
        price: product.price,
        quantity: item.quantity,
        subTotal
      })
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "server error occured while checking out the price",
        error,
      },
      {
        status: 500,
      }
    );
  }
};
