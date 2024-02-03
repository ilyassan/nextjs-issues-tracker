import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

const protectedRoutes = ["/issues/new", "/issues/edit/"];

export default withAuth(
  function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth?.token;
    const url = request.nextUrl.clone();

    // if "/issues" ==> "/issues/list"
    if (pathname === "/issues") {
      url.pathname = "/issues/list";
      return NextResponse.redirect(url);
    }
    // if guest and try to access protected routes ==> "/auth/login"
    else if (
      !token &&
      protectedRoutes.some((route) => pathname.includes(route))
    ) {
      url.pathname = `/auth/login`;
      url.search = `callbackUrl=${pathname}`;
      return NextResponse.redirect(url);
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);
