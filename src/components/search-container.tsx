"use client";

import { VideoSearchResult } from "@/types/video";
import SearchItemCard from "./search-item-card";
import useSearchVideo from "@/hooks/use-search-video";

interface Props {
  initialData: VideoSearchResult[];
  query: string;
}

export default function SearchContainer({ initialData, query }: Props) {
  const { data } = useSearchVideo(query, initialData);

  if (data?.length === 0) {
    return (
      <div className="container my-8">
        <h1 className="text-md md:text-lg">
          No results found for <span className="font-semibold">&quot;{query}&quot;</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="container my-8">
      <h1 className="text-md md:text-lg">
        Showing search results for <span className="font-semibold">&quot;{query}&quot;</span>
      </h1>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map((video) => (
          <SearchItemCard video={video} key={video.videoId} />
        ))}
      </div>
    </div>
  );
}
