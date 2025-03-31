import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.method === "POST") return NextResponse.next();

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname.startsWith("/login");
  const isRegisterPage = pathname.startsWith("/register");
  const isPropertySearchPage = pathname.startsWith("/property-search");
  const isForgotPasswordPage = pathname.startsWith("/forgot-password");

  // Check if there is no token in the cookies
  if (!token) {
    // If the user is not logged in and tries to access protected routes,
    if (
      isLoginPage ||
      isRegisterPage ||
      isPropertySearchPage ||
      isForgotPasswordPage
    ) {
      return NextResponse.next();
    }
    // Redirect to the login page if trying to access protected routes without a token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is already logged in (has a token) and tries to access these pages,
  // redirect them to the home page.
  if (isLoginPage || isRegisterPage || isForgotPasswordPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decodedToken = decodeJwt(token);
  // Check if the token is about to expire (5 minutes before expiration)
  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    // Redirect to the refresh token API with the current path as a redirect parameter
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }

  const isAdminPage = pathname.startsWith("/admin-dashboard");
  const isAdmin = decodedToken.admin;
  // Check if the user is trying to access admin routes
  if (isAdminPage && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Check if the user is trying to access the favorites page
  const isFavoritesPage = pathname.startsWith("/account/my-favorites");
  if (isFavoritesPage && isAdmin) {
    // Redirect admin to the home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/login",
    "/register",
    "/account",
    "/account/:path*",
    "/property-search",
    "/forgot-password",
  ],
};
