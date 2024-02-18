import "../styles/player.css";
import ReactPlayer from "react-player";
import { VideoWithChapters } from "@/types/video";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Config } from "@prisma/client";
import ChapterSelector from "./chapter-selector";
import useYoutubeVideoPlayer from "@/hooks/use-youtube-video-player";
interface Props {
  video: VideoWithChapters;
  userConfig: Config;
}

const chapterSelectorVariables = {
  id: "",
  title: "",
  startTime: 0,
  videoId: null,
  completed: false,
  completedAt: null,
};

const REACT_PLAYER_CONFIG = {
  file: {
    attributes: {
      controlsList: "nodownload",
    },
  },
};

export default function YoutubeVideoPlayer({ video, userConfig }: Props) {
  const playerRef = useRef<ReactPlayer>(null);

  const {
    currentChapter,
    hasChapters,
    isPlaying,
    isVideoReady,
    isPending,
    handleUpdateChapter,
    handleOnReady,
    handleJumpToChapter,
  } = useYoutubeVideoPlayer(video, userConfig, playerRef);

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
          config={REACT_PLAYER_CONFIG}
          playsinline
        />
      </div>
      <ChapterSelector
        video={video}
        variables={chapterSelectorVariables}
        currentChapter={currentChapter}
        handleJumpToChapter={handleJumpToChapter}
        isPending={isPending}
        isVideoReady={isVideoReady}
      />
    </div>
  );
}
