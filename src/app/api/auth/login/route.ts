import ms from "ms";
import { dbConnect } from "@/app/admin/lib/database/db";
import User from "@/app/admin/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessAndRefreshToken } from "../register/route";

//take email and password
//check emaile and password existence
//check if password is correct or not
//check if acess or refresh token exist or not
//store token in cookies

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    if (!(email || password)) {
      return NextResponse.json(
        { success: false, message: "All fields are Required" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email });
    if (!email) {
      return NextResponse.json({
        success: false,
        message: "User/email doesnt exist",
      });
    }
    const isPasswordValid = user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id as string
    );
    // ✅ Convert env duration → ms
    const accessTokenExpiry = ms(
      (process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue) || "15m"
    );
    const refreshTokenExpiry = ms(
      (process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue) || "10d"
    );
    const response = NextResponse.json({
      success: true,
      message: "successfullty logged in",
      email,
      user,
      accessToken,
      refreshToken,
    });
    // Set HTTP-only cookies
    response.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: accessTokenExpiry,
      path: "/",
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: refreshTokenExpiry,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "server error occured while loggin in",
        error,
      },
      { status: 500 }
    );
  }
};
