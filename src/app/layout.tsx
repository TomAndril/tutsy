import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NextAuthProvider from "@/components/next-auth-provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tuti",
  description: "A simple app to help you learn new things.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={inter.className}>{children}</body>
      </NextAuthProvider>
    </html>
  );
}
