import { NextRequest, NextResponse } from "next/server";

const protectedPrefixes = ["/dashboard", "/api-keys", "/logs", "/billing", "/routing"];

export function proxy(request: NextRequest) {
  const authenticated = request.cookies.get("bjg_session")?.value === "demo";
  const { pathname } = request.nextUrl;

  if (pathname === "/login" && authenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix)) && !authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/api-keys/:path*", "/logs/:path*", "/billing/:path*", "/routing/:path*"],
};
