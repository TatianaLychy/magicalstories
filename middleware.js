import { NextResponse } from "next/server";

// === ВХОД ВЛАДЕЛЬЦА — НЕ УДАЛЯТЬ И НЕ ИЗМЕНЯТЬ ===
// Пускает владельца в /studio без подписки.
// Владелец один раз открывает /owner?key=ТОКЕН — это ставит cookie ниже.
// Токен хранится в переменной OWNER_ACCESS_TOKEN в настройках Vercel.
const OWNER_COOKIE_NAME = "studio_owner_access";
const OWNER_COOKIE_VALUE = process.env.OWNER_ACCESS_TOKEN;

// Cookie платного участника (ставится после входа через Whop).
const SESSION_COOKIE_NAME = "whop_session";

function getCookieList(cookieHeader = "") {
  return cookieHeader
    .split(";")
    .map((c) => c.trim())
    .filter(Boolean);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Защищаем только приватную зону Studio.
  if (pathname.startsWith("/studio")) {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = getCookieList(cookieHeader);

    // Платный участник: есть cookie сессии Whop.
    const hasBuyerSession = cookies.some((c) =>
      c.startsWith(`${SESSION_COOKIE_NAME}=`)
    );

    // Владелец: есть cookie с верным секретным токеном.
    const hasOwnerAccess =
      !!OWNER_COOKIE_VALUE &&
      cookies.some((c) => c === `${OWNER_COOKIE_NAME}=${OWNER_COOKIE_VALUE}`);

    // Ни тот, ни другой — отправляем на главную (там оформляют подписку).
    if (!hasBuyerSession && !hasOwnerAccess) {
      const homeUrl = new URL("/", request.url);
      homeUrl.searchParams.set("auth", "required");
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*"],
};
