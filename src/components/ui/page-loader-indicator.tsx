"use client";

import useMediaQuery from "@/hooks/use-media-query";
import NextTopLoader from "nextjs-toploader";

export default function PageLoaderIndicator() {
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <NextTopLoader showSpinner={false} shadow={false} showAtBottom={isMobile} />
  );
}
