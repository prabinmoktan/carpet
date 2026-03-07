
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";



export default function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const middlewareCookies = NextResponse.next().headers.get("x-middleware-set-cookie");
  if (middlewareCookies) {
    NextResponse.next().headers.set("Set-Cookie", middlewareCookies);
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (accessToken || refreshToken) {
      try {
        const decoded = jwt.decode(accessToken!) as { role?: string };
        const role = decoded.role;
        if (role === "admin") {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
        return NextResponse.redirect(new URL("/", req.url));
      } catch {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (accessToken) {
      const decoded = jwt.decode(accessToken) as { role?: string };
      const role = decoded?.role;
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } 
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/admin/:path*"],
};