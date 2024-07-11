import { VideoWithChapters } from "@/types/video";
import { Chapter } from "@prisma/client";
import useMediaQuery from "@/hooks/use-media-query";
import { useCallback, useMemo } from "react";
import ChapterSelectorMobile from "./chapter-selector-mobile";
import ChapterSelectorDesktop from "./chapter-selector-desktop";

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

  if (isCollapsed) {
    return (
      <ChapterSelectorMobile
        calculateChapterDuration={calculateChapterDuration}
        currentChapter={currentChapter}
        hasChapters={hasChapters}
        handleJumpToChapter={handleJumpToChapter}
        isPending={isPending}
        isVideoReady={isVideoReady}
        variables={variables}
        video={video}
      />
    );
  }

  return (
    <ChapterSelectorDesktop
      calculateChapterDuration={calculateChapterDuration}
      currentChapter={currentChapter}
      hasChapters={hasChapters}
      handleJumpToChapter={handleJumpToChapter}
      isPending={isPending}
      isVideoReady={isVideoReady}
      variables={variables}
      video={video}
    />
  );
}
