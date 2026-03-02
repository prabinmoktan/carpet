import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "Access token not found", code: "ACCESS_TOKEN_MISSING" },
      { status: 401 }
    );
  }

  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as jwt.JwtPayload;
    return NextResponse.json(
      { success: true, message: "Authenticated successfully", user },
      { status: 200 }
    );
  } catch  {
    return NextResponse.json(
      { success: false, message: "Invalid or expired access token", code: "ACCESS_TOKEN_INVALID" },
      { status: 401 }
    );
  }
}