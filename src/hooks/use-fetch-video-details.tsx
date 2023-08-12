import { useToast } from "@/components/ui/use-toast";
import { getVideoDetails } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useFetchVideoDetails(videoUrl: string) {
  const { toast } = useToast();
  const { data, isError, refetch, isFetching } = useQuery({
    queryFn: () =>
      getVideoDetails(videoUrl).catch(() => {
        toast({
          variant: "destructive",
          title: "There was an error",
          description: "Please try again later",
        });
      }),
    queryKey: ["video-details", videoUrl],
    enabled: false,
  });

  return { data, isFetching, isError, refetch };
}
