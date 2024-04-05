import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  try {

    const accessToken = request.cookies.get("access_token_flower_box")?.value;
    const refreshToken = request.cookies.get("refresh_token_flower_box")?.value;

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