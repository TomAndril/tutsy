import Link from "next/link";
import DashboardHeader from "@/components/dashboard-header";
import DashboardVideosContainer from "@/components/dashboard-videos-container";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getUserVideos } from "@/lib/videos";
import { cookies } from "next/headers";

export default async function Dashboard() {
  // cookies required for auth to get user tokens on first request. May change in future
  const { videos = [] } = await getUserVideos(cookies());

  return (
    <div data-testid="dashboard-videos">
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
