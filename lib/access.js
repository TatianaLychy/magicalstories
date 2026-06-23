import { readSessionFromRequest } from "./session";

const WHOP_API_KEY = process.env.WHOP_API_KEY;
const WHOP_PRODUCT_ID = process.env.WHOP_PRODUCT_ID;

const ACTIVE_STATUSES = ["active", "trialing"];

export async function checkAccess(request) {
  const session = readSessionFromRequest(request);

  if (!session || !session.whopUserId) {
    return { hasAccess: false, reason: "not_logged_in" };
  }

  if (!WHOP_API_KEY || !WHOP_PRODUCT_ID) {
    console.error("Missing WHOP_API_KEY or WHOP_PRODUCT_ID");
    return { hasAccess: false, reason: "server_config_error" };
  }

  try {
    const response = await fetch(
      `https://api.whop.com/api/v5/memberships?user_id=${encodeURIComponent(session.whopUserId)}&product_id=${encodeURIComponent(WHOP_PRODUCT_ID)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${WHOP_API_KEY}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Whop API error:", response.status, text);
      return { hasAccess: false, reason: "check_failed" };
    }

    const data = await response.json();
    const memberships = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];

    const hasAccess = memberships.some((membership) =>
      ACTIVE_STATUSES.includes(String(membership?.status || "").toLowerCase())
    );

    return { hasAccess, reason: hasAccess ? null : "no_subscription" };
  } catch (error) {
    console.error("Whop access check failed:", error);
    return { hasAccess: false, reason: "check_failed" };
  }
}
