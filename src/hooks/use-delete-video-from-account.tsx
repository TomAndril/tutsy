import { useToast } from "@/components/ui/use-toast";
import { deleteVideoFromUserAccount } from "@/lib/videos";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteVideoFromAccount() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (videoId: string) =>
      deleteVideoFromUserAccount(videoId).catch((e) =>
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
  });
}
