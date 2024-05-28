export { auth as middleware } from "@/lib/auth";

// Routes that should be protected
export const config = {
  matcher: ["/player/(.*)", "/dashboard/(.*)"],
};
