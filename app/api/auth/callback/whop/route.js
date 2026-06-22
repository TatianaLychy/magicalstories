import { NextResponse } from "next/server";
import { createSessionCookie } from "../../../../../lib/session";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL("/?login_error=1", request.url));
  }

  const pkceCookie = request.cookies.get("whop_oauth_pkce")?.value;
  if (!pkceCookie) {
    return NextResponse.redirect(new URL("/?login_error=expired", request.url));
  }

  let stored;
  try {
    stored = JSON.parse(Buffer.from(pkceCookie, "base64url").toString());
  } catch {
    return NextResponse.redirect(new URL("/?login_error=1", request.url));
  }

  if (!stored.state || stored.state !== state) {
    return NextResponse.redirect(new URL("/?login_error=state", request.url));
  }

  // Exchange the code for tokens
  const tokenRes = await fetch("https://api.whop.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.WHOP_REDIRECT_URI,
      client_id: process.env.NEXT_PUBLIC_WHOP_APP_ID,
      client_secret: process.env.WHOP_CLIENT_SECRET,
      code_verifier: stored.codeVerifier,
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(new URL("/?login_error=token", request.url));
  }

  const tokens = await tokenRes.json();

  // Fetch the user's Whop id
  const userInfoRes = await fetch("https://api.whop.com/oauth/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (!userInfoRes.ok) {
    return NextResponse.redirect(new URL("/?login_error=userinfo", request.url));
  }

  const userInfo = await userInfoRes.json();
  const whopUserId = userInfo.sub;

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete("whop_oauth_pkce");
  response.headers.append("Set-Cookie", createSessionCookie(whopUserId));
  return response;
}
