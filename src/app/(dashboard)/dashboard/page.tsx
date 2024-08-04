import DashboardHeader from "@/components/dashboard-header";
import DashboardVideosContainer from "@/components/dashboard-videos-container";
import { getUserVideos } from "@/lib/videos";
import { cookies } from "next/headers";

export default async function Dashboard() {
  // cookies required for auth to get user tokens on first request. May change in future
  const { videos = [] } = await getUserVideos(cookies());

  return (
    <div data-testid="dashboard-videos">
      <DashboardHeader title="Videos" subheading="Browse your videos" />
      <DashboardVideosContainer videos={videos} />
    </div>
  );
}
