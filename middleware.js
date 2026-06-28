import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "./lib/session";

const OWNER_COOKIE_NAME = "studio_owner_access";
const OWNER_COOKIE_VALUE = process.env.OWNER_ACCESS_TOKEN;

function getCookieList(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/studio")) {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = getCookieList(cookieHeader);

    const hasBuyerSession = cookies.some((c) =>
      c.startsWith(`${SESSION_COOKIE_NAME}=`)
    );

    const hasOwnerAccess =
      !!OWNER_COOKIE_VALUE &&
      cookies.some(
        (c) => c === `${OWNER_COOKIE_NAME}=${OWNER_COOKIE_VALUE}`
      );

    if (!hasBuyerSession && !hasOwnerAccess) {
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
