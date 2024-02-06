"use client";

import useAddVideoToAccount from "@/hooks/use-add-video-to-account";
import { Button } from "./ui/button";
import { Icons } from "./icons";

interface Props {
  videoId: string;
}

export default function AddVideoToAccount({ videoId }: Props) {
  const mutation = useAddVideoToAccount();

  const handleAddVideoToAccount = () => {
    mutation.mutate(videoId);
  };

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handleAddVideoToAccount}
      disabled={mutation.isPending}
      data-testid="add-video-button"
    >
      <div className="flex items-center">
        {mutation.isPending && <Icons.loader className="animate-spin mr-2" />}
        <Icons.plus className="mr-2" size={18} />
        Add
      </div>
    </Button>
  );
}
