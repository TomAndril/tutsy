"use client";

import { VideoWithChapters } from "@/types/video";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import useDeleteVideoFromAccount from "@/hooks/use-delete-video-from-account";
import { useRouter } from "next/navigation";

interface Props {
  videos: VideoWithChapters[];
}

export default function VideoList({ videos }: Props) {
  const [showResetProgressDialog, setShowResetProgressDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const deleteVideoMutation = useDeleteVideoFromAccount();

  const router = useRouter();

  return (
    <>
      {videos.map((video) => (
        <div
          key={video.id}
          className="border my-2 rounded p-4 flex items-center justify-between"
        >
          <Button asChild variant="link" className="text-sm">
            <Link href={`/player/${video.id}`}>{video.title}</Link>
          </Button>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2" size="icon">
                  <Icons.more size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onSelect={() => {
                    setShowResetProgressDialog(true);
                    setSelectedVideoId(video.id);
                  }}
                >
                  Reset progress
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => {
                    setShowDeleteDialog(true);
                    setSelectedVideoId(video.id);
                  }}
                  className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
      <AlertDialog
        open={showResetProgressDialog}
        onOpenChange={setShowResetProgressDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to reset your progress?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will delete all your progress for this video. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="text-destructive">
              Reset
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this video?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the video and all your progress. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="text-destructive"
              onClick={async (e) => {
                e.preventDefault();
                await deleteVideoMutation.mutateAsync(
                  selectedVideoId as string
                );
                setShowDeleteDialog(false);
                router.refresh();
              }}
            >
              <div className="flex items-center">
                {deleteVideoMutation.isLoading && (
                  <Icons.loader className="animate-spin mr-2" />
                )}{" "}
                Delete
              </div>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
