import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/api/auth", "/_next", "/favicon.ico", "/sitemap.xml", "/robots.txt"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow cron routes with secret header
  if (pathname.startsWith("/api/cron")) {
    const secret = request.headers.get("authorization");
    if (secret === `Bearer ${process.env.CRON_SECRET}`) return NextResponse.next();
    // Vercel cron calls don't have auth header — allow from Vercel infra
    const isVercelCron = request.headers.get("x-vercel-cron") === "1";
    if (isVercelCron) return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const authCookie = request.cookies.get("auth_token");
  if (!authCookie || authCookie.value !== process.env.SITE_PASSWORD) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
