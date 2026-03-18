import { dbConnect } from "@/app/admin/lib/database/db";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import { Cart } from "@/app/admin/lib/models/cart.model";
import { NextResponse } from "next/server";




export const DELETE = async () => {
  await dbConnect();
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not available" },
        { status: 401 }
      );
    }
    // const cart =
    await Cart.findOneAndDelete({ userId: user.id });
    // if (!cart) {
    //   return NextResponse.json(
    //     { success: false, message: "Cart not found." },
    //     { status: 404 }
    //   );
    // }
    return NextResponse.json(
      { success: true, message: "Cart cleared successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  await dbConnect();
  try {
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
    const cart = await Cart.findOne({ userId: user.id }).lean();
    if (!cart) {
      return NextResponse.json({
        success: false,
        message: "Cart items not available",
      });
    }
    // await cart.save();
    return NextResponse.json(
      { success: true, message: "cart items fetched successfully", cart },
      { status: 200 }
    );
  } catch (error) {
    console.log('error from server cart', error)
    return NextResponse.json(
      {
        success: false,
        message: "server error while fetching cart items.",
        error,
      },
      { status: 500 }
    );
  }
};
