import { VideoWithChapters } from "@/types/video";
import VideoListCard from "./video-list-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Props {
  videos: VideoWithChapters[];
}

export default function VideoList({ videos }: Props) {
  return (
    <Tabs defaultValue="all" className="my-4">
      <TabsList>
        <TabsTrigger value="all">All Videos</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {videos.map((video) => (
            <VideoListCard video={video} key={video.id} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="in-progress">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {videos
            .filter((video) => !video.completed)
            .map((elem) => (
              <VideoListCard video={elem} key={elem.id} />
            ))}
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {videos
            .filter((video) => video.completed)
            .map((elem) => (
              <VideoListCard video={elem} key={elem.id} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
