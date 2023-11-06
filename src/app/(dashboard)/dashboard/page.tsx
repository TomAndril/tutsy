import Link from "next/link";
import DashboardHeader from "@/components/dashboard-header";
import DashboardVideosContainer from "@/components/dashboard-videos-container";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getUserVideos } from "@/lib/videos";

export default async function Dashboard() {
  const { videos = [] } = await getUserVideos();

  return (
    <div data-testid='dashboard-videos'>
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
      <DashboardVideosContainer videos={videos} />
    </div>
  );
}
