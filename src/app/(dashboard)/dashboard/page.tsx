import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import { Icons } from "@/components/icons";
import NoVideosPlaceholder from "@/components/no-videos-placeholder";
import { Button } from "@/components/ui/button";
import VideoList from "@/components/video-list";
import { getUserVideos } from "@/lib/videos";
import Link from "next/link";

export default async function Dashboard() {
  const { videos = [] } = await getUserVideos();

  const hasVideos = videos.length > 0;

  return (
    <div>
      <DashboardHeader
        title="Videos"
        subheading="Browse your videos and add new ones"
      >
        <Button size="lg" variant="secondary" asChild>
          <Link href="/dashboard/add">
            <Icons.plus size={14} className="mr-2" />
            <span>Add video</span>
          </Link>
        </Button>
      </DashboardHeader>
      <DashboardContent>
        {hasVideos ? <VideoList videos={videos} /> : <NoVideosPlaceholder />}
      </DashboardContent>
    </div>
  );
}
