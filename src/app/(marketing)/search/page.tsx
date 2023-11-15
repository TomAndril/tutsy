"use client";

import useSearchVideos from "@/hooks/use-search-videos";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  const results = useSearchVideos(query as string);

  return (
    <div className="container my-4">
      <h1 className="text-xl">Showing results for &quot;{query}&quot;</h1>
    </div>
  );
}
