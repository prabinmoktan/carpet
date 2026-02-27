import { cookies } from "next/headers";
import { dbConnect } from "./database/db";
import jwt from "jsonwebtoken";
import User from "./models/user.model";
import { NextResponse } from "next/server";

export const requireUser = async () => {
  await dbConnect();
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      _id: string;
    };

    const user = await User.findById(decoded._id)
      .select("-password -refreshToken -accessToken")
      .lean();
    const userData = {
      ...user,
      id: user._id.toString(),
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
    console.log("user from public=>", userData);
    return userData;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "server error ", error },
      { status: 500 }
    );
  }
};
