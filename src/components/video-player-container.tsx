"use client";

import { VideoWithChapters } from "@/types/video";
import YoutubeVideoPlayer from "./youtube-video-player";

interface Props {
  video: VideoWithChapters;
}

export default function VideoPlayerContainer({ video }: Props) {
  return (
    <div>
      <YoutubeVideoPlayer video={video} />
    </div>
  );
}
