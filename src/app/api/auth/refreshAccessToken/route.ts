import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { dbConnect } from "@/app/admin/lib/database/db";
import User from "@/app/admin/lib/models/user.model";
import { generateAccessAndRefreshToken } from "@/app/admin/lib/generateRefreshAndAccessToken";


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const refreshToken = req.cookies.get("refreshToken")?.value;

    // Case 1: No refresh token provided
    if (!refreshToken) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized/refresh Token expired",
      });
    }

    // Case 2: Invalid refresh token (malformed or expired)
    let decoded: jwt.JwtPayload;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as jwt.JwtPayload;
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "  Invalid Refresh Token" },
        { status: 401 }
      );
    }

    // Case 3: User not found
    const user = await User.findById(decoded._id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Session Expired" },
        { status: 401 }
      );
    }

    // Case 4: Refresh token mismatch (token reuse detection)
    if (user.refreshToken !== refreshToken) {
      const response = NextResponse.json(
        {
          success: false,
          message: "Refresh Token expired or revoked. please login again",
        },
        { status: 401 }
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    // Case 5: Success - Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id.toString(), refreshToken);

 
    // Update user with new refresh token

    // Prepare successful response
    const response = NextResponse.json(
      {
        success: true,
        message: "Tokens refreshed successfully",
      },
      {
        status: 200,
        statusText: "OK - Tokens refreshed",
      }
    );
  

    // Set new cookies with enhanced security options
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // 15 minutes
      path: "/",
      // priority: "High",
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 10, // 10 days
      path: "/",
      // priority: "High",
    });

    return response;
  } catch (error) {
    // Case 6: Unexpected server error
    console.error("Refresh token endpoint error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        code: "SERVER_ERROR",
      },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
}
