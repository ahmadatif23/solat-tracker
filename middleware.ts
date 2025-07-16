// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("__session")?.value;
  const pathname = req.nextUrl.pathname;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/profile/:path*"], // include root path
};
