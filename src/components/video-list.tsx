import { VideoWithChapters } from "@/types/video";
import VideoListCard from "./video-list-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Icons } from "./icons";

interface Props {
  videos: VideoWithChapters[];
}

export default function VideoList({ videos }: Props) {
  return (
    <Tabs defaultValue="all" className="my-4">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {videos.map((video) => (
            <VideoListCard video={video} key={video.id} />
          ))}

          {videos.length === 0 && <NoVideosSection name="All" />}
        </div>
      </TabsContent>
      <TabsContent value="in-progress">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {videos
            .filter((video) => !video.completed)
            .map((elem) => (
              <VideoListCard video={elem} key={elem.id} />
            ))}

          {videos.filter((video) => !video.completed).length === 0 && (
            <NoVideosSection name="In Progress" />
          )}
        </div>
      </TabsContent>
      <TabsContent value="completed">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {videos
            .filter((video) => video.completed)
            .map((elem) => (
              <VideoListCard video={elem} key={elem.id} />
            ))}

          {videos.filter((video) => video.completed).length === 0 && (
            <NoVideosSection name="Completed" />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function NoVideosSection({ name }: { name: string }) {
  return (
    <Alert>
      <Icons.info size={16} />
      <AlertTitle>Nothing Here</AlertTitle>
      <AlertDescription>You don&apos;t have any {name} videos</AlertDescription>
    </Alert>
  );
}
