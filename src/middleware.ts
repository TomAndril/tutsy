import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware() {}, {
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

// Routes that should be protected
export const config = {
  matcher: ["/player/(.*)", "/dashboard/(.*)"],
};
