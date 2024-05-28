import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (trigger === "update" && session?.user) {
        token.name = session.user.name
      }

      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
  },
} satisfies Omit<NextAuthConfig, "adapter">;
