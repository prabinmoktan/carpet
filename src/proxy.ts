import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  _id: string;
  role?: string;
}

const PUBLIC_ONLY_ROUTES = ["/login", "/signup", "/forgot-password"];
const PROTECTED_ROUTES = ["/checkout", "/orders", "/profile"];
const ADMIN_ROUTES = ["/admin"];

export async function proxy(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  console.log('origin==>', origin)

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  let user: CustomJwtPayload | null = null;

  // Verify access token
  if (accessToken) {
    try {
      user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as CustomJwtPayload;
    } catch {
      user = null;
    }
  }

  // If no valid access token but refresh token exists
  if (!user && refreshToken && !isPublicOnlyRoute(pathname)) {
    try {
      const res = await fetch(`${origin}/api/auth/refreshAccessToken`, {
        method: "POST",
        headers: { cookie: `refreshToken=${refreshToken}` },
        cache: "no-store",
      });
      console.log('res=>', res)

      if (res.ok) {
        const data = await res.json();
        user = data.user ?? null;

        const setCookie = res.headers.get("set-cookie");
        const response = NextResponse.next();
        if (setCookie) response.headers.append("Set-Cookie", setCookie);

        // Redirect logged-in users away from public-only routes
        if (user && isPublicOnlyRoute(pathname)) {
          const redirectRes = NextResponse.redirect(new URL(getHomeByRole(user.role), req.url));
          if (setCookie) redirectRes.headers.append("Set-Cookie", setCookie);
          return redirectRes;
        }

        // Redirect to login if refresh failed
        if (!user && isProtectedRoute(pathname)) {
          return NextResponse.redirect(new URL("/login", req.url));
        }

        return response;
      } else {
        user = null;
      }
    } catch {
      user = null;
    }
  }

  // Route protection logic
  if (isAdminRoute(pathname)) {
    if (!user) return NextResponse.redirect(new URL("/login", req.url));
    if (user.role !== "admin") return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (isProtectedRoute(pathname) && !user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && isPublicOnlyRoute(pathname)) {
    return NextResponse.redirect(new URL(getHomeByRole(user.role), req.url));
  }

  return NextResponse.next();
}

// Helpers
function isPublicOnlyRoute(pathname: string) {
  return PUBLIC_ONLY_ROUTES.some((route) => pathname.startsWith(route));
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

function isAdminRoute(pathname: string) {
  return ADMIN_ROUTES.some((route) => pathname.startsWith(route));
}

function getHomeByRole(role?: string) {
  if (role === "admin") return "/admin/dashboard";
  return "/";
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};