import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "./models/user.model";


interface CustomJwtPayload extends JwtPayload {
  _id: string;
}

export async function verifyJWT(req: NextRequest) {
  try {
    const token =
      req.cookies.get("accessToken")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) return null;

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    ) as CustomJwtPayload;

    const user = await User.findById(decoded._id).select(
      "-password -refreshToken"
    );

    return user || null;
  } catch {
    return null;
  }
}
