// ============================================================
// ACCESS CHECK — verifies the visitor has an active Whop
// subscription before the server is allowed to generate a prompt.
//
// How it works:
//   1. The visitor signs in via /api/auth/login ("Sign in with Whop").
//   2. We store their Whop user id in a signed session cookie.
//   3. On every /api/generate request, we ask Whop's API (using our
//      own Company API key — never the visitor's token) whether
//      that user has an active/trialing membership for our product.
//   4. If not -> the API responds 401 (not logged in) or 403 (no
//      active subscription), and the generator gives nothing back.
// ============================================================

import { whop, WHOP_COMPANY_ID, WHOP_PRODUCT_ID } from "./whop";
import { readSessionFromRequest } from "./session";

// Statuses that count as "the subscriber is allowed to use the generator".
// past_due / canceled / expired / etc. are treated as no access.
const ACTIVE_STATUSES = ["active", "trialing"];

export async function checkAccess(request) {
  const session = readSessionFromRequest(request);

  if (!session) {
    return { hasAccess: false, reason: "not_logged_in" };
  }

  let memberships;
  try {
    memberships = await whop.memberships.list({
      company_id: WHOP_COMPANY_ID,
      user_ids: [session.whopUserId],
      product_ids: [WHOP_PRODUCT_ID],
      statuses: ACTIVE_STATUSES,
      first: 1,
    });
  } catch (err) {
    console.error("Whop access check failed:", err);
    return { hasAccess: false, reason: "check_failed" };
  }

  const hasAccess = memberships.data.length > 0;
  return { hasAccess, reason: hasAccess ? null : "no_subscription" };
}
