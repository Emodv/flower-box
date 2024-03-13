import { NextRequest, NextResponse } from "next/server";

function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (cookieHeader) {
    const items = cookieHeader.split(";");
    items.forEach((item: string) => {
      const [key, value] = item.split("=");
      cookies[key.trim()] = decodeURIComponent(value.trim());
    });
  }
  return cookies;
}

export function middleware(request: NextRequest) {
  try {
    
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies = parseCookies(cookieHeader);

    const accessToken = cookies["access_token_flower_box"];
    const refreshToken = cookies["refresh_token_flower_box"];

    console.log({accessToken,refreshToken})

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error(
      "Middleware error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: '/dashboard/:path*',
}