// SERVER-ONLY. Signs a small session cookie containing the visitor's Whop
// user id, so it can't be forged by editing the cookie in the browser.
import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET;
const COOKIE_NAME = "whop_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function sign(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createSessionCookie(whopUserId) {
  const payload = JSON.stringify({
    uid: whopUserId,
    exp: Date.now() + MAX_AGE_SECONDS * 1000,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);
  const value = `${encoded}.${signature}`;
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; Secure; SameSite=Lax`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

export function readSessionFromRequest(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  if (!match) return null;

  const value = match.slice(COOKIE_NAME.length + 1);
  const [encoded, signature] = value.split(".");
  if (!encoded || !signature) return null;

  const expectedSignature = sign(encoded);
  const validSignature =
    expectedSignature.length === signature.length &&
    crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(signature)
    );
  if (!validSignature) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString());
    if (!payload.uid || !payload.exp || payload.exp < Date.now()) return null;
    return { whopUserId: payload.uid };
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
