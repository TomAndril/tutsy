import "../styles/player.css";
import ReactPlayer from "react-player";
import { VideoWithChapters } from "@/types/video";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
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
import { Chapter, Config } from "@prisma/client";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
interface Props {
  video: VideoWithChapters;
  userConfig: Config;
}

// TODO: Cleanup this file as it's a mess. Maybe split it into multiple
// components or extract some logic into hooks

export default function YoutubeVideoPlayer({ video, userConfig }: Props) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterTitle, setCurrentChapterTitle] = useState<
    Chapter["title"] | null
  >();

  const { mutate, isPending, variables } = useUpdateChapterStatus(video);

  const playerRef = useRef<ReactPlayer>(null);

  const handleJumpToChapter = useCallback((ms: number) => {
    playerRef.current?.seekTo(ms);
    setIsPlaying(true);
  }, []);

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

  const handleOnReady = () => {
    if (isVideoReady) {
      return;
    }

    if (userConfig === null || userConfig.jumpToLastChapter) {
      const hasLastViewedChapter = video.chapters.some((c) => c.completedAt);

      if (hasLastViewedChapter) {
        const lastViewedChapter = video.chapters
          .filter((c) => c.completedAt)
          .toSorted((a, b) => {
            if (a.completedAt && b.completedAt) {
              return a.completedAt < b.completedAt ? 1 : -1;
            }
            return 0;
          });

        handleJumpToChapter(lastViewedChapter[0].startTime);
        setIsVideoReady(true);

        if (localStorage.getItem("jumpToLastChapterToast") !== "false") {
          toast({
            title: "Jumping to last viewed chapter",
            variant: "default",
            description: "You can disable this behavior in settings",
            action: (
              <ToastAction
                onClick={() =>
                  localStorage.setItem("jumpToLastChapterToast", "false")
                }
                className="text-xs"
                altText="Don't show this again"
              >
                Don&apos;t show <br /> this again
              </ToastAction>
            ),
          });
        }

        return;
      }
    }
    setIsVideoReady(true);
    setIsPlaying(true);
  };

  const hasChapters = video.chapters?.length > 0;

  const calculateChapterDuration = (chapter: Chapter) => {
    const nextChapter = video.chapters.find(
      (c) => c.startTime > chapter.startTime
    );

    if (!nextChapter) {
      return `${Math.round((video.duration - chapter.startTime) / 60)} min`;
    }

    const chapterDuration = Math.round(
      (nextChapter.startTime - chapter.startTime) / 60
    );

    if (chapterDuration < 1) {
      return `< 1 min`;
    }

    return `${chapterDuration} min`;
  };

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
          onReady={handleOnReady}
          id={video.id}
          width={"100%"}
          height={"100%"}
          controls
          url={`https://invidious.fdn.fr/latest_version?id=${video.youtubeId}`}
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
                  <span className="w-14 text-slate-400">
                    {calculateChapterDuration(chapter)}
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
