//findthe user by id
//update it by clearing its both cookies

import { dbConnect } from "@/app/admin/lib/database/db";
import User from "@/app/admin/lib/models/user.model";
import  jwt  from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await dbConnect();
  const cookieStore = await cookies();
  const refreshToken =
    cookieStore.get("refreshToken")?.value ||
    req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;
  const userId = decoded.userId || decoded._id

  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: '',
      },
    },
    { new: true }
  );
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  NextResponse.json({ success: true, message: "User Logged out Successfully" });
};
