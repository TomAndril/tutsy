import { toast } from "@/components/ui/use-toast";
import { resetVideoProgress } from "@/lib/videos";
import { useMutation } from "@tanstack/react-query";

export default function useResetVideoProgress() {
  return useMutation({
    mutationFn: (videoId: string) =>
      resetVideoProgress(videoId).catch((e) =>
        toast({
          variant: "default",
          title: "Something went wrong",
          description: e.response?.data?.message || "Please try again later",
        })
      ),
    onError: () =>
      toast({
        variant: "destructive",
        title: "There was an error",
        description: "Please try again later",
      }),
    onSuccess: () =>
      toast({
        variant: "default",
        title: "Updated",
        description: "Video progress has been reset",
      }),
  });
}
