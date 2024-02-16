"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

export default function PageLoaderIndicator() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { resolvedTheme } = useTheme();

  return (
    <NextTopLoader
      showSpinner={false}
      shadow={false}
      showAtBottom={isMobile}
      color={resolvedTheme === "dark" ? "white" : "black"}
    />
  );
}
