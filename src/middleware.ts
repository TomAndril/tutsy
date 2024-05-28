import NextAuth from "next-auth";
import authConfig from "../auth.config";

export const { auth: middleware } = NextAuth(authConfig);

// Routes that should be protected
export const config = {
  matcher: [
    "/player/(.*)",
    "/dashboard/(.*)",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
