"use client";

import { VideoWithChapters } from "@/types/video";
import YoutubeVideoPlayer from "./youtube-video-player";
import { useQuery } from "@tanstack/react-query";
import { getUserVideoById } from "@/lib/videos";
import { QueryKeys } from "@/constants";

interface Props {
  video: VideoWithChapters;
}

export default function VideoPlayerContainer({ video }: Props) {
  const { data } = useQuery({
    queryKey: [QueryKeys.VIDEO, video.youtubeId],
    queryFn: () => getUserVideoById(video.youtubeId),
    initialData: video,
  });

  return <YoutubeVideoPlayer video={data} />;
}
