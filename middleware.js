import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/studio")) {
    const token = request.cookies.get("whop_token")?.value;

    if (!token) {
      const loginUrl = new URL("/", request.url);
      loginUrl.searchParams.set("auth", "required");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
