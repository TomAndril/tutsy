import "../styles/player.css";
import ReactPlayer from "react-player";
import { VideoWithChapters } from "@/types/video";
import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";
import useUpdateChapterStatus from "@/hooks/use-update-chapter-status";
import { Chapter, Config } from "@prisma/client";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import ChapterSelector from "./chapter-selector";
interface Props {
  video: VideoWithChapters;
  userConfig: Config;
}

// TODO: Cleanup this file as it's a mess. Maybe split it into multiple
// components or extract some logic into hooks

export default function YoutubeVideoPlayer({ video, userConfig }: Props) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<Chapter>();

  const { mutate, isPending, variables } = useUpdateChapterStatus(video);

  const playerRef = useRef<ReactPlayer>(null);

  const hasChapters = video.chapters?.length > 0;

  const handleJumpToChapter = useCallback((ms: number) => {
    playerRef.current?.seekTo(ms);
    setIsPlaying(true);
  }, []);

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

  return (
    <div
      className={cn("grid grid-cols-1 border-t border-b", {
        "grid-cols-1 lg:grid-cols-[1fr_500px]": hasChapters,
      })}
    >
      <div className="max-h-[80vh] border-r relative group">
        {hasChapters && !!currentChapter && (
          <div className="absolute left-8 top-4 text-xs opacity-0 group-hover:opacity-100 transition-all px-4 rounded backdrop-blur shadow py-2 border bg-white text:black dark:bg-black dark:text-white">
            {currentChapter.title}
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
          playsinline
        />
      </div>
      <ChapterSelector
        video={video}
        variables={variables}
        currentChapter={currentChapter}
        handleJumpToChapter={handleJumpToChapter}
        isPending={isPending}
        isVideoReady={isVideoReady}
      />
    </div>
  );
}
