import { VideoWithChapters } from "@/types/video";
import { Chapter } from "@prisma/client";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import useMediaQuery from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  DrawerOverlay,
  DrawerPortal,
} from "./ui/drawer";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";

export default function ChapterSelector({
  video,
  isVideoReady,
  handleJumpToChapter,
  currentChapter,
  isPending,
  variables,
}: {
  video: VideoWithChapters;
  handleJumpToChapter: (ms: Chapter["startTime"]) => void;
  isVideoReady: boolean;
  currentChapter: Chapter | undefined;
  isPending: boolean;
  variables: Chapter | undefined;
}) {
  const calculateChapterDuration = useCallback(
    (chapter: Chapter) => {
      const nextChapter = video.chapters.find(
        (c) => c.startTime > chapter.startTime
      );

      if (!nextChapter) {
        const finalChapterDuration = Math.round(
          (video.duration - chapter.startTime) / 60
        );

        if (finalChapterDuration < 1) {
          return `< 1 min`;
        }

        return `${finalChapterDuration} min`;
      }

      const chapterDuration = Math.round(
        (nextChapter.startTime - chapter.startTime) / 60
      );

      if (chapterDuration < 1) {
        return `< 1 min`;
      }

      return `${chapterDuration} min`;
    },
    [video.chapters, video.duration]
  );

  const hasChapters = useMemo(
    () => video.chapters?.length > 0,
    [video.chapters]
  );

  const isCollapsed = useMediaQuery("(max-width: 1024px)");

  if (!isCollapsed) {
    return (
      <>
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
                    className={cn(
                      "text-xs rounded-none w-full justify-start px-4 lg:px-8",
                      {
                        "bg-gradient-to-r from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900":
                          currentChapter?.id === chapter.id,
                      }
                    )}
                    onClick={() => handleJumpToChapter(chapter.startTime)}
                  >
                    <span className="w-14 text-slate-400">
                      {calculateChapterDuration(chapter)}
                    </span>
                    <h3 className="text-left w-full lg:w-96 lg:truncate px-4 flex items-center">
                      {chapter.title}
                    </h3>

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
      </>
    );
  }

  return (
    <div className="p-2">
      <Drawer>
        <DrawerTrigger asChild>
          <Button disabled={!isVideoReady} variant={"ghost"} className="w-full">
            Chapters
            {isVideoReady ? (
              <Icons.arrowUp className="ml-2" size={16} />
            ) : (
              <Icons.loader className="ml-2 animate-spin" size={16} />
            )}
          </Button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay className="fixed inset-0 bg-white/90 dark:bg-black/90" />
          <DrawerContent className="bg-white dark:bg-[var(--background)] flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
            {hasChapters && isVideoReady && (
              <ScrollArea className="w-full mx-auto flex flex-col overflow-auto px-0 py-4 rounded-t-[10px]">
                {video.chapters.map((chapter) => (
                  <div key={chapter.id}>
                    <DrawerClose className="w-full">
                      <Button
                        variant="ghost"
                        size="lg"
                        className={cn(
                          "text-xs rounded-none w-full justify-start px-4 lg:px-8",
                          {
                            "bg-gradient-to-r from-slate-100 to-slate-300":
                              currentChapter?.id === chapter.id,
                          }
                        )}
                        onClick={() => {
                          handleJumpToChapter(chapter.startTime);
                        }}
                      >
                        <span className="w-14 text-slate-400">
                          {calculateChapterDuration(chapter)}
                        </span>
                        <h3 className="text-left w-full lg:w-96 lg:truncate px-4 flex items-center">
                          {chapter.title}
                        </h3>

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
                    </DrawerClose>
                    <Separator />
                  </div>
                ))}
              </ScrollArea>
            )}
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    </div>
  );
}
