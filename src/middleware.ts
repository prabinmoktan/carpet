import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  _id: string;
  role: "admin" | "moderator" | "user";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token =
    req.cookies.get("access_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer ", "");

  // 🚫 Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    // 🚫 Logged in but not admin/moderator
    if (!["admin", "moderator"].includes(decoded.role)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // ✅ Allowed
    return NextResponse.next();
  } catch {
    // 🚫 Invalid / expired token
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};


