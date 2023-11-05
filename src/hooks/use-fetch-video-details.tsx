import { useToast } from "@/components/ui/use-toast";
import { QueryKeys } from "@/constants";
import { getVideoDetails } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useFetchVideoDetails(videoUrl: string) {
  const { toast } = useToast();
  return useQuery({
    queryFn: () =>
      getVideoDetails(videoUrl).catch(() => {
        toast({
          variant: "destructive",
          title: "There was an error",
          description: "Please try again later",
        });
      }),
    queryKey: [QueryKeys.VIDEO_DETAILS, videoUrl],
    enabled: false,
  });
}
