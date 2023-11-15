import { QueryKeys } from "@/constants";
import { getVideoSearchResults } from "@/lib/videos";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useSearchVideos(query: string) {
  return useInfiniteQuery({
    initialPageParam: { results: 10 },
    queryFn: () => getVideoSearchResults(query),
    queryKey: [QueryKeys.VIDEO_SEARCH, query],
    getNextPageParam: (lastPage) => lastPage + 10,
  });
}
