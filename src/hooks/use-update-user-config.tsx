import { toast } from "@/components/ui/use-toast";
import { QueryKeys } from "@/constants";
import { updateUserConfiguration } from "@/lib/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateUserConfig() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserConfiguration,
    onError: () => {
      return toast({
        variant: "destructive",
        title: "There was an error",
        description: "Please try again later",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.USER_CONFIG],
      });

      return toast({
        variant: "default",
        title: "Settings updated",
      });
    },
  });
}
