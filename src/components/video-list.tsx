import { VideoWithChapters } from "@/types/video";
import VideoListCard from "./video-list-card";

interface Props {
  videos: VideoWithChapters[];
}

export default function VideoList({ videos }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
      {videos.map((video) => (
        <VideoListCard video={video} key={video.id} />
      ))}
    </div>
  );
}
