// getAuthenticatedUser.ts
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "./models/user.model";
import { cookies } from "next/headers";
import { serializeUser } from "./serializeUsers";
import { dbConnect } from "./database/db";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  role?: string;
}

/**
 * Server-side helper to get the currently authenticated user.
 *
 * Flow:
 * 1. Read `accessToken` from cookies.
 * 2. If valid → look up user in DB, return serialized user.
 * 3. If expired/missing → attempt silent refresh using `refreshToken`.
 * 4. On successful refresh → verify new token, look up + return user.
 * 5. On any failure → return null.
 */
export async function getAuthenticatedUser() {
  try {
    await dbConnect();
    const cookieStore = await cookies();

    const accessToken =
      cookieStore.get("accessToken")?.value ||
      cookieStore.get("authorization")?.value?.replace("Bearer ", " ");

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error("ACCESS_TOKEN_SECRET not defined");
    }

    // ── 1. Try the current access token ──────────────────────────────────────
    if (accessToken) {
      const decoded = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as jwt.JwtPayload;
      const user = await User.findById(decoded._id)
        .select("-password -refreshToken")
        .lean();
      if (!user) {
        return null;
      }
      return serializeUser(user);
    }
    // ── 2. Silent refresh using refresh token ────────────────────────────────
  } catch {
    return null;
  }
}
