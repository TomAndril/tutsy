"use client";

import useAddVideoToAccount from "@/hooks/use-add-video-to-account";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";

interface Props {
  videoId: string;
}

export default function AddVideoToAccount({ videoId }: Props) {
  const mutation = useAddVideoToAccount();

  const router = useRouter();

  const handleAddVideoToAccount = () => {
    mutation.mutate(videoId, {
      onSuccess: () => {
        router.refresh();
        router.push("/dashboard");
      },
    });
  };

  return (
    <Button
      size="lg"
      onClick={handleAddVideoToAccount}
      disabled={mutation.isLoading}
    >
      <div className="flex">
        {mutation.isLoading && <Icons.loader className="animate-spin mr-2" />}{" "}
        Add
      </div>
    </Button>
  );
}
