// import jwt from 'jsonwebtoken';
//get refresh token from cookies;
//verify refresh token
//find user by id in db
//call backend for using api (generateccessandtoken)
//update user with new refresh token
//seet new cookies (access and refresh token)
//return new response

import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/app/admin/lib/database/db";
import User from "@/app/admin/lib/models/user.model";
import { generateAccessAndRefreshToken } from "@/app/admin/lib/generateRefreshAndAccessToken";

export async function POST(req: NextRequest) {
  await dbConnect();

  const refreshToken = req.cookies.get("refreshToken")?.value;
 

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  let decoded: jwt.JwtPayload;

  try {
    decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as jwt.JwtPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const user = await User.findById(decoded._id);
 
  if (!user) {
    return NextResponse.json(
      { success: false, message: "Session Expired" },
      { status: 401 }
    );
  }

  if (user.refreshToken !== refreshToken) {
   
    user.refreshToken = undefined;
    await user.save();
    const response = NextResponse.json(
      { success: false, message: "Refresh token expired or revoked. please login again" },
      { status: 401 }
    );
    // Clear cookies
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;

  }

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);

  user.refreshToken = newRefreshToken;

  await user.save();


  const response = NextResponse.json(
    { success: true, message: "Tokens refreshed successfully" },
    { status: 200 }
  );

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 15, // 15 minutes
    path: "/",
  });

  response.cookies.set("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 10, // 10 days
    path: "/",
  });
  return response
}
