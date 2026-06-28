import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "./lib/session";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/studio")) {
    const cookieHeader = request.headers.get("cookie") || "";
    const hasSession = cookieHeader
      .split(";")
      .map((c) => c.trim())
      .some((c) => c.startsWith(`${SESSION_COOKIE_NAME}=`));

    if (!hasSession) {
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
