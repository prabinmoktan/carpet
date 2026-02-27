import { dbConnect } from "@/app/admin/lib/database/db";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import Product from "@/app/admin/lib/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) => {
  await dbConnect();
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({
        success: false,
        message: "invalid id/id is missing",
      });
    }
    const product = await Product.findById(slug);

    return NextResponse.json(
      { success: true, message: "data fetched successfully", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "server error occured while  fetching data",
        error,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  await dbConnect();

  try {
    const admin = await getAuthenticatedUser(req);

    if (!admin || admin.role !== "admin") {
      return NextResponse.json({ message: "Admin only" }, { status: 403 });
    }

    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Product Id",
        },
        { status: 400 }
      );
    }
    const product = await Product.findById(slug);
    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }
    await Product.findByIdAndDelete(slug);
    return NextResponse.json(
      {
        success: true,
        message: "Product Deleted Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while trying to delete the product",
      },
      { status: 500 }
    );
  }
};
