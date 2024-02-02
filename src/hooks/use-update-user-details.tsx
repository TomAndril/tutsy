import { toast } from "@/components/ui/use-toast";
import { updateUserDetails } from "@/lib/user";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateUserDetails() {
  return useMutation({
    mutationFn: updateUserDetails,
    onError: () => {
      return toast({
        variant: "destructive",
        title: "There was an error",
        description: "Please try again later",
      });
    },
    onSettled: () => {
      return toast({
        variant: "default",
        title: "Settings updated",
      });
    },
  });
}
