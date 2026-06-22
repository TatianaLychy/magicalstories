// ============================================================
// ACCESS CHECK — verifies the visitor has an active subscription
// before the server is allowed to generate a prompt.
//
// RIGHT NOW this is a placeholder that always allows access, so
// you can see the whole pipeline working end-to-end before Whop
// is connected. Once you have a Whop account + product, this is
// the ONLY file that needs to change.
//
// What will happen here later:
//   1. Whop sends a short-lived user token with each request
//      (via the iframe embed, header "x-whop-user-token").
//   2. We call the Whop API with WHOP_API_KEY to confirm that
//      token belongs to an active paying member.
//   3. If not active -> return false -> API responds 403 and the
//      generator gives nothing back (no prompt, no data).
// ============================================================

async function checkAccess(request) {
  // TODO (after Whop account is created):
  // const userToken = request.headers.get('x-whop-user-token');
  // if (!userToken) return false;
  // const res = await fetch('https://api.whop.com/api/v5/me/access-passes', {
  //   headers: {
  //     Authorization: `Bearer ${process.env.WHOP_API_KEY}`,
  //     'x-whop-user-token': userToken,
  //   },
  // });
  // const data = await res.json();
  // return data.some((p) => p.valid === true);

  return true; // pilot mode — open access until Whop is wired in
}

module.exports = { checkAccess };
