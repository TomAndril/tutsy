import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db";

import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as NextAuthOptions["adapter"],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub ?? "";
      return session;
    },

    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
      }

      if (user) {
        token.sub = user.id;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
};
