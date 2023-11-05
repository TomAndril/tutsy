"use client";

import { getUserVideos } from "@/lib/videos";
import { VideoWithChapters } from "@/types/video";
import { useQuery } from "@tanstack/react-query";
import VideoList from "./video-list";
import NoVideosPlaceholder from "./no-videos-placeholder";

interface Props {
  videos: VideoWithChapters[];
}

export default function DashboardVideosContainer({ videos }: Props) {
  const { data } = useQuery({
    queryKey: ["user-videos"],
    queryFn: getUserVideos,
    initialData: { videos },
  });

  const hasVideos = data.videos.length > 0;

  if (hasVideos) {
    return <VideoList videos={data.videos} />;
  }

  return <NoVideosPlaceholder />;
}
