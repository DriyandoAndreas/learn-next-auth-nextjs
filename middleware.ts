import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("next-auth.session-token") || req.cookies.get("__Secure-next-auth.session-token");

  const isAuthPage = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  if (token) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
    
  return NextResponse.next();
  },
  
  {
    pages: {
      signIn: '/auth/login',      
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/((?!auth/login|auth/register|api|_next/static|_next/image|favicon.ico).*)"], 
};
