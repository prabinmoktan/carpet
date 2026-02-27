// getAuthenticatedUser.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "./models/user.model";
import { cookies } from "next/headers";
import { serializeUser } from "./serializeUsers";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  role?: string;
}

export async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies(); // ✅ one await, reuse everywhere

    console.log("cookieStore==>", cookieStore);
    const token =
      cookieStore.get("accessToken")?.value ||
      cookieStore.get("authorization")?.value?.replace("Bearer ", " ");
    console.log("token", token);

    if (!token) {
      return null;
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as CustomJwtPayload;

      const user = await User.findById(decoded._id)
        .select("-password -refreshToken")
        .lean();

      if (!user) return null;

      return serializeUser(user);
    } catch (error) {
      return null;
    }
  } catch {
    return null;
  }
}
