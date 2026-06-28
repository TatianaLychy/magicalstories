import { NextResponse } from "next/server";

const OWNER_COOKIE_NAME = "studio_owner_access";

export function GET(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const token = process.env.OWNER_ACCESS_TOKEN;

  if (!token || key !== token) {
    return new NextResponse("Access denied", { status: 401 });
  }

  const res = NextResponse.redirect(new URL("/studio", request.url));
  res.cookies.set(OWNER_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
