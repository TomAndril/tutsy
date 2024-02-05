import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";

import NextAuthProvider from "@/components/providers/next-auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryWrapper from "@/components/providers/react-query-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Tutsy",
  description: "YouTube learning, reinvented.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReactQueryWrapper>
              {children}
              <Analytics />
              <SpeedInsights />
              <Toaster />
            </ReactQueryWrapper>
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
