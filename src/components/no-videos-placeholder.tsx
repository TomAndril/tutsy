"use client";

import useMediaQuery from "@/hooks/use-media-query";
import { Icons } from "./icons";
import NavbarSearchVideo from "./navbar-search-video";

export default function NoVideosPlaceholder() {

  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className="border border-dashed flex items-center flex-col py-24 rounded mt-4 p-2">
      <div className="bg-slate-200 dark:bg-slate-700 p-4 rounded-full flex items-center justify-center">
        <Icons.youtube size={48} />
      </div>
      <div className="px-4 text-center">
        <h2 className="mt-4 text-base font-semibold">No videos added</h2>
        <p className="mt-2 text-sm">
          You don&apos;t have any videos yet. Add a new one
        </p>
      </div>
      <div className="mt-4">
        <NavbarSearchVideo isMobileSearch={isMobile} />
      </div>
    </div>
  );
}
