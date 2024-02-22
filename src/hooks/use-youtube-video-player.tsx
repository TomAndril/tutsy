import { VideoWithChapters } from "@/types/video";
import { Chapter, Config } from "@prisma/client";
import { useCallback, useState } from "react";
import ReactPlayer from "react-player";
import useUpdateChapterStatus from "./use-update-chapter-status";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const hasCompletedAllChapters = (
  chapters: Chapter[],
  currentChapterIndex: number
) => {
  chapters[currentChapterIndex].completed = true;
  return chapters.every((c) => c.completed);
};

export default function useYoutubeVideoPlayer(
  video: VideoWithChapters,
  userConfig: Config,
  playerRef: React.RefObject<ReactPlayer>
) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter>();

  const { mutate, isPending } = useUpdateChapterStatus(video);

  const hasChapters = video.chapters?.length > 0;

  const handleJumpToChapter = useCallback(
    (ms: number) => {
      playerRef.current?.seekTo(ms);
      setIsPlaying(true);
    },
    [playerRef]
  );

  const handleUpdateChapter = useCallback(
    (playedSeconds: number) => {
      const currentChapterIndex =
        video.chapters.findIndex((c) => c.startTime >= playedSeconds) - 1;

      const isFinalChapter = hasChapters
        ? playedSeconds >= video.chapters[video.chapters.length - 1].startTime
        : false;

      setCurrentChapter(
        video.chapters[
          isFinalChapter ? video.chapters.length - 1 : currentChapterIndex
        ]
      );

      // If the video is almost finished, mark the last chapter as completed
      if (
        video.duration - playedSeconds < 3 &&
        !isPending &&
        !video.chapters[video.chapters.length - 1]?.completed
      ) {
        return mutate({
          chapter: video.chapters[video.chapters.length - 1],
          hasCompletedAllChapters: hasCompletedAllChapters(
            video.chapters,
            video.chapters.length - 1
          ),
        });
      }

      const nextChapterStartTime =
        video.chapters?.[currentChapterIndex + 1]?.startTime;

      const hasToUpdateChapter =
        !video.chapters[currentChapterIndex]?.completed &&
        nextChapterStartTime - playedSeconds < 3 &&
        playedSeconds > 5;

      if (hasToUpdateChapter && !isPending) {
        mutate({
          chapter: video.chapters[currentChapterIndex],
          hasCompletedAllChapters: hasCompletedAllChapters(
            video.chapters,
            currentChapterIndex
          ),
        });
      }
    },
    [video.chapters, video.duration, isPending, mutate, hasChapters]
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
          .sort((a, b) => {
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

  return {
    isVideoReady,
    isPlaying,
    isPending,
    currentChapter,
    hasChapters,
    handleJumpToChapter,
    handleUpdateChapter,
    handleOnReady,
  };
}
