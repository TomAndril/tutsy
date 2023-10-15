"use client";

import { VideoWithChapters } from "@/types/video";
import YoutubeVideoPlayer from "./youtube-video-player";
import { useQuery } from "@tanstack/react-query";
import { getUserVideoById } from "@/lib/videos";

interface Props {
  video: VideoWithChapters;
}

export default function VideoPlayerContainer({ video }: Props) {
  const { data } = useQuery({
    queryKey: ["user-video", video.id],
    queryFn: () => getUserVideoById(video.id),
    initialData: video,
  });

  return <YoutubeVideoPlayer video={data} />;
}
