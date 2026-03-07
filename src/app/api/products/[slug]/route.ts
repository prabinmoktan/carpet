import { dbConnect } from "@/app/admin/lib/database/db";
import { getAuthenticatedUser } from "@/app/admin/lib/getAuthenticatedUser";
import Product from "@/app/admin/lib/models/product.model";
import { uploadOnCloudinary } from "@/app/admin/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

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
    const admin = await getAuthenticatedUser();

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

//patch api
//find product by slug
//take product data by req.body;

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  await dbConnect();
  const admin = await getAuthenticatedUser();

  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ message: "Admin only" }, { status: 403 });
  }
  const { slug } = await params;

  const formData = await req.formData();
  try {
    const product = await Product.findById(slug);
    if (!product) {
      return NextResponse.json({
        success: false,
        message: " ProductId not available",
      });
    }

    let existingImages: string[] = [];

    try {
      existingImages = JSON.parse(
        (formData.get("existingImages") as string) || "[]"
      );
    } catch {
      existingImages = [];
    }
    const newImageFiles = formData.getAll("images") as File[];

    const tempDir = path.join(process.cwd(), "public/temp");
    await fs.mkdir(tempDir, { recursive: true });

    const imagesUrl: string[] = [...existingImages];

    await Promise.all(
      newImageFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const filePath = path.join(tempDir, `${Date.now()}-${file.name}`);

        await fs.writeFile(filePath, buffer);

        const uploaded = await uploadOnCloudinary(filePath);

        if (!uploaded?.public_id) {
          return NextResponse.json(
            { message: "Image upload failed" },
            { status: 500 }
          );
        }
       
        imagesUrl.push(uploaded?.public_id);

        await fs.unlink(filePath);
      })
    );

    // ✅ Build body from formData
    const body = {
      title: formData.get("title"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      description: formData.get("description"),
      specs: JSON.parse(formData.get("specs") as string),
      sale: formData.get("sale")
        ? JSON.parse(formData.get("sale") as string)
        : null,
      images: imagesUrl, // ✅ merged existing + new
    };
    //preventing dangerous fields from being modified
    // delete body._id;
    // delete body.createAt;
    // delete body.updatedAt;

    //update only provided fields
    const updatedProduct = await Product.findByIdAndUpdate(
      slug,
      { $set: body },
      {
        new: true, //return updated doc
        runValidators: true, // run schema validation
      }
    );
    
    if (!updatedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not updated" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    console.error("PATCH Product Error:", error);
    return NextResponse.json(
      { message: "Server error/Something went wrong" },
      { status: 500 }
    );
  }
};
