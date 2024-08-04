import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";

import NextAuthProvider from "@/components/providers/next-auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryWrapper from "@/components/providers/react-query-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageLoaderIndicator from "@/components/ui/page-loader-indicator";

export const metadata: Metadata = {
  title: "Tutsy",
  description: "YouTube learning, reinvented.",
  openGraph: {
    title: "Tutsy",
    description: "YouTube learning, reinvented.",
    type: "website",
    locale: "en_US",
    url: "https://tutsy.io",
    siteName: "Tutsy",
  },
  metadataBase: new URL("https://tutsy.io/"),
  generator: "Tutsy",
  applicationName: "Tutsy",
  referrer: "origin-when-cross-origin",
  keywords: [
    "tutsy",
    "youtube",
    "learning",
    "reinvented",
    "tutorials",
    "videos",
    "courses",
    "education",
    "programming",
    "development",
    "design",
    "web",
  ],
  authors: [
    {
      name: "Tutsy",
    },
  ],
  creator: "Tutsy",
  publisher: "Tutsy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} sr antialiased`}
    >
      <NextAuthProvider>
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReactQueryWrapper>
              {children}
              <Analytics />
              <SpeedInsights />
              <Toaster />
              <PageLoaderIndicator />
            </ReactQueryWrapper>
          </ThemeProvider>
        </body>
      </NextAuthProvider>
    </html>
  );
}
