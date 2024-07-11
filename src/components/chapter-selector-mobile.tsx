import { VideoWithChapters } from "@/types/video";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";

interface Props {
  hasChapters: boolean;
  video: VideoWithChapters;
  isVideoReady: boolean;
  handleJumpToChapter: (ms: Chapter["startTime"]) => void;
  calculateChapterDuration: (chapter: Chapter) => string;
  currentChapter: Chapter | undefined;
  isPending: boolean;
  variables: Chapter | undefined;
}

export default function ChapterSelectorMobile({
  hasChapters,
  currentChapter,
  handleJumpToChapter,
  calculateChapterDuration,
  isPending,
  isVideoReady,
  variables,
  video,
}: Props) {
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
