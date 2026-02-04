import { dbConnect } from "../../admin/lib/database/db";
import { NextRequest, NextResponse } from "next/server";
import { uploadOnCloudinary } from "@/app/admin/utils/cloudinary";
import path from "path";
import fs from "fs/promises";
import Product from "@/app/admin/lib/models/product.model";
import { generateSlug } from "../utils/slugify";
import { getSaleState } from "@/app/admin/utils/getSaleState";
import { verifyJWT } from '@/app/admin/lib/jwt';

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    
    const admin = await verifyJWT(req);

    if (!admin || admin.role !== 'admin') {
      return NextResponse.json({ message: "Admin only" }, { status: 403 });
    } 
    const formData = await req.formData();

    // text-fields
    const title = formData.get("title")?.toString();
    const category = formData.get("category")?.toString();
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description")?.toString();

    const specs = formData.get("specs")
      ? JSON.parse(formData.get("specs") as string)
      : undefined;
    const sale = formData.get("sale")
      ? JSON.parse(formData.get("sale") as string)
      : undefined;

    if (!title || !category || !description || !specs) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { success: false, message: "Price needs to be greater than 0" },
        { status: 400 }
      );
    }
    if (!stock || stock < 0) {
      return NextResponse.json(
        { success: false, message: "Stock needs to be more than 0" },
        { status: 400 }
      );
    }

    // ----- IMAGE FILES -----
    const images = formData.getAll("images") as File[];

    if (!images.length) {
      return NextResponse.json(
        { message: "At least one image is required" },
        { status: 400 }
      );
    }

    const tempDir = path.join(process.cwd(), "public/temp");
    await fs.mkdir(tempDir, { recursive: true });

    const imagesUrl: string[] = [];

    for (const file of images) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = path.join(tempDir, `${Date.now()}-${file.name}`);

      await fs.writeFile(filePath, buffer);

      const uploaded = await uploadOnCloudinary(filePath);

      if (!uploaded?.secure_url) {
        return NextResponse.json(
          { message: "Image upload failed" },
          { status: 500 }
        );
      }

      imagesUrl.push(uploaded?.secure_url);

      await fs.unlink(filePath);
    }

    const slug = await generateSlug(title);
    console.log('imagesUrl==>', imagesUrl)

    const products = await Product.create({
      title,
      description,
      price,
      stock,
      category,
      specs,
      slug,
      sale,
      images: imagesUrl,
    });

    // const freshProduct = await Product.findById(products._id);
    return NextResponse.json(
      {
        success: true,
        message: "Products created Successfully",
        Product: products,
       
      },
      { status: 201 }
    );
    // const {title, description,}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    if (error.message === "Forbidden") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: false,
        message: "Server error" },
      { status: 500 }
    );
  }
   
  
};

export const GET = async (req: Request) => {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(20, parseInt(searchParams.get("limit") || "20"));
    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    const price = searchParams.get("price");

    const category = searchParams.get("category");
    if (category) filter.category = category;

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);

      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const ALLOWED_SPECS = ["size", "material"];

    ALLOWED_SPECS.forEach((key) => {
      const value = searchParams.get(key);
      if (value) filter[`specs.${key}`] = value;
    });

    const total = await Product.countDocuments(filter);

    // const new_days = 14;
    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .lean();

    const response = products.map((product) => {
      const saleDetails = getSaleState(product);
      return {
        ...product,
        sale: {
          ...product.sale,
          isActive: saleDetails.isActive,
        },
        finalPrice: saleDetails.finalPrice,
      };
    });
    
    
    return NextResponse.json(
      {
        status: true,
        message: "products Fetched successfully",
        response,
        pagination: {
          total,
          skip,
          page,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error while fetching data", error },
      { status: 500 }
    );
  }
};
