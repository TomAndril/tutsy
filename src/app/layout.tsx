import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NextAuthProvider from "@/components/providers/next-auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
    <NextAuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
