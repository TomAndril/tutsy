import { VideoWithChapters } from "@/types/video";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Chapter } from "@prisma/client";

interface Props {
  hasChapters: boolean;
  isVideoReady: boolean;
  video: VideoWithChapters;
  currentChapter: Chapter | undefined;
  isPending: boolean;
  variables: Chapter | undefined;
  handleJumpToChapter: (ms: Chapter["startTime"]) => void;
  calculateChapterDuration: (chapter: Chapter) => string;
}

const Loading = ({ video }: { video: VideoWithChapters }) => {
  return (
    <div>
      <Skeleton className="h-[52px] my-1 mx-2" />
      <Separator />
      <ScrollArea>
        <div className="max-h-[80vh]">
          {video.chapters.map((chapter) => (
            <div key={chapter.id}>
              <Skeleton className="h-[44px] mx-6 my-1" />
              <Separator />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default function ChapterSelectorDesktop({
  hasChapters,
  isVideoReady,
  video,
  currentChapter,
  isPending,
  variables,
  handleJumpToChapter,
  calculateChapterDuration,
}: Props) {
  if (!hasChapters) return null;

  if (!isVideoReady) {
    return <Loading video={video} />;
  }

  const watchedCount = video.chapters.filter(
    (chapter) => chapter.completed
  ).length;

  if (isVideoReady) {
    return (
      <div>
        <h2 className="text-sm p-2 lg:p-4 font-semibold">
          Chapters{" "}
          <span className="text-xs font-normal text-slate-400 dark:text-slate-500 ml-1">
            - ({watchedCount}/{video.chapters.length}) Completed
          </span>
        </h2>
        <Separator className="" />
        <ScrollArea>
          <div className="max-h-[80vh]">
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
      </div>
    );
  }
}
