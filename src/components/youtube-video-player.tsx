import "../styles/player.css";
import ReactPlayer from "react-player";
import { VideoWithChapters } from "@/types/video";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { secondsToHoursAndMinutes, secondsToMinutes } from "@/utils";
import { useCallback, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea } from "./ui/scroll-area";
import { Icons } from "./icons";
import useUpdateChapterStatus from "@/hooks/use-update-chapter-status";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Chapter } from "@prisma/client";

interface Props {
  video: VideoWithChapters;
}

export default function YoutubeVideoPlayer({ video }: Props) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterTitle, setCurrentChapterTitle] = useState<
    Chapter["title"] | null
  >();

  const { mutate, isPending, variables } = useUpdateChapterStatus(video);

  const playerRef = useRef<ReactPlayer>(null);

  const handleJumpToChapter = (ms: number) => {
    playerRef.current?.seekTo(ms);
    setIsPlaying(true);
  };

  const handleUpdateChapter = useCallback(
    (playedSeconds: number) => {
      const currentChapterIndex =
        video.chapters.findIndex((c) => c.startTime >= playedSeconds) - 1;

      const isFinalChapter =
        playedSeconds >= video.chapters[video.chapters.length - 1].startTime;

      setCurrentChapterTitle(
        video.chapters[
          isFinalChapter ? video.chapters.length - 1 : currentChapterIndex
        ]?.title
      );

      // If the video is almost finished, mark the last chapter as completed
      if (
        video.duration - playedSeconds < 3 &&
        !isPending &&
        !video.chapters[video.chapters.length - 1]?.completed
      ) {
        return mutate(video.chapters[video.chapters.length - 1]);
      }

      const nextChapterStartTime =
        video.chapters?.[currentChapterIndex + 1]?.startTime;

      const hasToUpdateChapter =
        !video.chapters[currentChapterIndex]?.completed &&
        nextChapterStartTime - playedSeconds < 3 &&
        playedSeconds > 5;

      if (hasToUpdateChapter && !isPending) {
        mutate(video.chapters[currentChapterIndex]);
      }
    },
    [video.chapters, video.duration, isPending, mutate]
  );

  const hasChapters = video.chapters?.length > 0;
  const hasLessThanOneHour = video.duration < 3600;

  return (
    <div
      className={cn("grid grid-cols-1 border-t border-b", {
        "grid-cols-1 lg:grid-cols-[1fr_500px]": hasChapters,
      })}
    >
      <div className="max-h-[80vh] border-r relative group">
        {hasChapters && !!currentChapterTitle && (
          <div className="absolute left-8 top-4 text-sm opacity-0 group-hover:opacity-100 transition-all px-4 rounded backdrop-blur shadow py-2 border">
            {currentChapterTitle}
          </div>
        )}
        <ReactPlayer
          ref={playerRef}
          playing={isPlaying}
          onProgress={({ playedSeconds }) => handleUpdateChapter(playedSeconds)}
          onReady={() => setIsVideoReady(true)}
          id={video.id}
          width={"100%"}
          height={"100%"}
          controls
          url={`https://vid.puffyan.us/latest_version?id=${video.id}`}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      </div>
      {hasChapters && !isVideoReady && (
        <ScrollArea>
          <div className="max-h-[80vh]">
            <Skeleton className="h-[52px] my-1 mx-2" />
            <Separator />
            {video.chapters.map((chapter) => (
              <div key={chapter.id}>
                <Skeleton className="h-[44px] mx-6 my-1" />
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
      {hasChapters && isVideoReady && (
        <ScrollArea>
          <div className="max-h-[80vh]">
            <h2 className="text-sm p-2 lg:p-4 font-semibold">Chapters</h2>
            <Separator className="" />
            {video.chapters.map((chapter) => (
              <div key={chapter.id}>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-xs rounded-none w-full justify-start px-4 lg:px-8"
                  onClick={() => handleJumpToChapter(chapter.startTime)}
                >
                  <span className="w-10 text-slate-400">
                    {hasLessThanOneHour
                      ? secondsToMinutes(chapter.startTime)
                      : secondsToHoursAndMinutes(chapter.startTime)}
                  </span>
                  <span className="text-left w-full lg:w-96 lg:truncate px-4">
                    {chapter.title}
                  </span>
                  {isPending && variables?.id === chapter.id && (
                    <Icons.check
                      size={18}
                      className="text-slate-600 dark:text-slate-400"
                    />
                  )}
                  {chapter.completed && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Icons.check
                            size={18}
                            className="text-green-600 dark:text-green-400"
                          />
                        </TooltipTrigger>
                        <TooltipContent>Chapter completed</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </Button>
                <Separator />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
