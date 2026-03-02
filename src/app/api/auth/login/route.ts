import ms from "ms";
import { dbConnect } from "@/app/admin/lib/database/db";
import User from "@/app/admin/lib/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessAndRefreshToken } from "@/app/admin/lib/generateRefreshAndAccessToken";

//take email and password
//check emaile and password existence
//check if password is correct or not
//check if acess or refresh token exist or not
//store token in cookies

export const POST = async (req: NextRequest) => {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are Required" },
        { status: 401 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User/email doesnt exist",
      });
    }
    const firstName = user.firstName;
    const lastName = user.lastName;
    const role = user.role;

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Incorrect Password",
      });
    }
    const userData = { firstName, lastName, role };
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id.toString()
    );
   
    // ✅ Convert env duration → ms
    const accessTokenExpiry = ms(
      (process.env.ACCESS_TOKEN_EXPIRY as ms.StringValue) || "15m"
    );

    const refreshTokenExpiry = ms(
      (process.env.REFRESH_TOKEN_EXPIRY as ms.StringValue) || "10d"
    );
    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        user: userData,
        redirectTo: user.role === "admin" ? "/admin" : "/",
      },
      { status: 200 }
    );
    // Set HTTP-only cookies
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: accessTokenExpiry / 1000,
      // expires: accessTokenExpiry,
      path: "/",
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: refreshTokenExpiry / 1000,
      // expires: refreshTokenExpiry,
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
