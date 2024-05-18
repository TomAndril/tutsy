import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { addVideoToUserAccount } from "@/lib/videos";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function useAddVideoToAccount() {
  const { toast } = useToast();

  const router = useRouter();

  return useMutation({
    mutationFn: (videoId: string) => addVideoToUserAccount(videoId),
    onError: (err, id) => {
      const error = err as AxiosError;

      if (error.response?.status === 409) {
        return toast({
          variant: "default",
          title: "You already have this video",
          description: "This video already exists in your account",
          action: (
            <ToastAction
              altText="Go to Video"
              onClick={() => {
                router.push(`/player/${id}`);
              }}
            >
              View
            </ToastAction>
          ),
        });
      }

      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    },
    onSuccess: () => {
      router.push("/dashboard");
    },
  });
}
