"use client";

import { VideoWithChapters } from "@/types/video";
import YoutubeVideoPlayer from "./youtube-video-player";
import { useQueries } from "@tanstack/react-query";
import { getUserVideoById } from "@/lib/videos";
import { QueryKeys } from "@/constants";
import { Config } from "@prisma/client";
import { getPlayerConfig } from "@/lib/user";

interface Props {
  video: VideoWithChapters;
  userConfig: Config;
}

export default function VideoPlayerContainer({ video, userConfig }: Props) {
  const [videoData, userConfigData] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.VIDEO, video.youtubeId],
        queryFn: () => getUserVideoById(video.youtubeId),
        initialData: video,
      },
      {
        queryKey: [QueryKeys.PLAYER_CONFIG],
        queryFn: () => getPlayerConfig(),
        initialData: { config: userConfig },
      },
    ],
  });

  return (
    <YoutubeVideoPlayer
      video={videoData.data as VideoWithChapters}
      userConfig={userConfigData.data?.config as Config}
    />
  );
}
