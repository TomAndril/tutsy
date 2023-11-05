"use client";

import { VideoWithChapters } from "@/types/video";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogAction,
} from "./ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useState } from "react";
import useDeleteVideoFromAccount from "@/hooks/use-delete-video-from-account";
import useResetVideoProgress from "@/hooks/use-reset-video-progress";
import { useRouter } from "next/navigation";
import VideoProgressBar from "./video-progress-bar";

interface Props {
  video: VideoWithChapters;
}

export default function VideoListCard({ video }: Props) {
  const [showResetProgressDialog, setShowResetProgressDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const deleteVideoMutation = useDeleteVideoFromAccount();
  const resetProgressMutation = useResetVideoProgress();

  const router = useRouter();

  return (
    <div className="relative group">
      <div
        className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all ${
          isDropdownOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <DropdownMenu onOpenChange={() => setIsDropdownOpen((prev) => !prev)}>
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
      <Link href={`/player/${video.id}`}>
        <Card className="min-w-[300px] h-full">
          <Image
            alt={video.title}
            src={video.thumbnail}
            width={360}
            height={240}
            className=" rounded-t w-full"
          />
          <CardHeader>
            <CardTitle>{video.title}</CardTitle>
            <CardDescription>{video.author}</CardDescription>
          </CardHeader>
          <CardContent>
            <VideoProgressBar chapters={video.chapters} />
          </CardContent>
        </Card>
      </Link>
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
            <AlertDialogAction
              className="text-destructive"
              onClick={async (e) => {
                e.preventDefault();
                await resetProgressMutation.mutateAsync(
                  selectedVideoId as string
                );

                setShowResetProgressDialog(false);
              }}
            >
              <div className="flex items-center">
                {resetProgressMutation.isPending && (
                  <Icons.loader className="animate-spin mr-2" />
                )}{" "}
                Reset progress
              </div>
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
                {deleteVideoMutation.isPending && (
                  <Icons.loader className="animate-spin mr-2" />
                )}{" "}
                Delete
              </div>
            </AlertDialogAction>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
