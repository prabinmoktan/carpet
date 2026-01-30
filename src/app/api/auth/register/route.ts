import { dbConnect } from "@/app/admin/lib/database/db";
import { generateAccessAndRefreshToken } from "@/app/admin/lib/generateRefreshAndAccessToken";
import User from "@/app/admin/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";



export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
   
    const { firstName, lastName, email, password, role } = await req.json();
    if (
      [firstName, lastName, email, password].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 401 }
      );
    }
    const userRole = role || "user";

    const existingUser = await User.findOne({
      email,
    }).select("-password -refreshToken");
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User/Email already exists" },
        { status: 400 }
      );
    }
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      role: userRole,
    });
  
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong while registering user",
        },
        { status: 402 }
      );
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );
    
    return NextResponse.json(
      {
        success: false,
        message: "User account created successfully",
        createdUser,
        refreshToken,
        accessToken,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error occured while creating user",
        error,
      },
      { status: 500 }
    );
  }
};
