import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;
  console.log({ pathnameData: pathname });

  const isAuthPage =
    pathname === "/auth/login" || pathname === "/auth/register";

  const isDashboard =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/dashboard" : "/auth/login", request.url),
    );
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
