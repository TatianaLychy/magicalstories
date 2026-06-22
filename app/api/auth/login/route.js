import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function base64url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function randomString(len) {
  return base64url(crypto.randomBytes(len));
}

function sha256base64url(input) {
  return base64url(crypto.createHash("sha256").update(input).digest());
}

export async function GET(request) {
  const codeVerifier = randomString(32);
  const state = randomString(16);
  const codeChallenge = sha256base64url(codeVerifier);

  const appId = process.env.NEXT_PUBLIC_WHOP_APP_ID;
  const redirectUri = process.env.WHOP_REDIRECT_URI;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: appId,
    redirect_uri: redirectUri,
    scope: "openid",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const response = NextResponse.redirect(
    `https://api.whop.com/oauth/authorize?${params}`
  );

  // Short-lived cookie to verify the callback (10 minutes)
  const pkcePayload = Buffer.from(
    JSON.stringify({ codeVerifier, state })
  ).toString("base64url");

  response.cookies.set("whop_oauth_pkce", pkcePayload, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return response;
}
