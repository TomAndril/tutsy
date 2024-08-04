"use client";

import { Icons } from "@/components/icons";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AddVideoError({ error, reset }: Props) {
  return (
    <div className="container mt-2 flex flex-col w-full mx-auto items-center justify-center h-[calc(100vh-8rem)]">
      <div className="flex items-center">
        <Icons.info size={24} className="text-red-500 mr-2" />
        <h2 className="text-2xl font-bold">Something went wrong</h2>
      </div>
      <p className="mt-2">
        The video you were trying to add could not be found
      </p>
      <p className="mt-2">Please make sure that the video link is correct and try again</p>
    </div>
  );
}
