import { dbConnect } from "@/app/admin/lib/database/db";
import User from "@/app/admin/lib/models/user.model";
import { NextResponse } from "next/server";

interface GenerateTokensResponse {
  accessToken: string;
  refreshToken: string;
}

export const generateAccessAndRefreshToken = async (
  userId: string
): Promise<GenerateTokensResponse> => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user?.save({
      validateBeforeSave: false,
    });
    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.error("Error generating tokens:", error);

    throw Error(
      "Sometin went wrong while generating access Token and Refres Token"
    );
  }
};

export const POST = async (req: Request) => {
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
    console.log("existingUser==>", existingUser);
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
    console.log("user==>", user);
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
