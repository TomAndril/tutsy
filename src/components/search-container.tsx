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

  return (
    <div className="container my-8">
      <h1 className="text-md md:text-lg">
        Showing search results for &quot;{query}&quot;
      </h1>
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((video) => {
          return <SearchItemCard video={video} key={video.videoId} />;
        })}
      </div>
    </div>
  );
}
