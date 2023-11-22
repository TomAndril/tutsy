import { QueryKeys } from "@/constants";
import { getVideoSearchResults } from "@/lib/videos";
import { VideoSearchResult } from "@/types/video";
import { useQuery } from "@tanstack/react-query";

export default function useSearchVideo(
  query: string,
  initialData: VideoSearchResult[]
) {
  return useQuery({
    queryKey: [QueryKeys.VIDEO_SEARCH, query],
    queryFn: () => getVideoSearchResults(query),
    initialData,
    // to do not fetch again on the client
    staleTime: Infinity,
  });
}
