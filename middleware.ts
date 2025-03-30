import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.method === "POST") return NextResponse.next();

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isRegisterPage = request.nextUrl.pathname.startsWith("/register");

  // Check if there is no token in the cookies
  if (!token) {
    // Allow access to the login or register page if no token is present
    if (isLoginPage || isRegisterPage) {
      return NextResponse.next();
    }
    // Redirect to the login page if trying to access protected routes without a token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is already logged in (has a token) and tries to access the login or register page,
  // redirect them to the home page as they don't need to log in or register again.
  if (isLoginPage || isRegisterPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const decodedToken = decodeJwt(token);
  // Check if the token is about to expire (5 minutes before expiration)
  if (decodedToken.exp && (decodedToken.exp - 300) * 1000 < Date.now()) {
    // Redirect to the refresh token API with the current path as a redirect parameter
    return NextResponse.redirect(
      new URL(
        `/api/refresh-token?redirect=${encodeURIComponent(
          request.nextUrl.pathname
        )}`,
        request.url
      )
    );
  }

  // Check if the user is not an admin
  // If the decoded token does not have the 'admin' property set to true,
  // redirect the user to the home page as they are not authorized to access admin routes.
  if (!decodedToken.admin) {
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
  ],
};
