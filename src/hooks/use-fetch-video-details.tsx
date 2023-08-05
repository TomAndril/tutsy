import { getVideoDetails } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useFetchVideoDetails(videoUrl: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getVideoDetails(videoUrl),
    queryKey: ["video-details", videoUrl],
    enabled: false,
  });

  return { data, isLoading, isError, refetch };
}
