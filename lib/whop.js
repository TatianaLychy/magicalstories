// SERVER-ONLY. Uses the secret Company API key — never import this from a
// client component.
import Whop from "@whop/sdk";

export const whop = new Whop({
  apiKey: process.env.WHOP_API_KEY,
});

export const WHOP_COMPANY_ID = process.env.WHOP_COMPANY_ID; // biz_xxxxxxxx
export const WHOP_PRODUCT_ID = process.env.WHOP_PRODUCT_ID; // prod_xxxxxxxx
