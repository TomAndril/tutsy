import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import FetchVideoDetails from "@/components/fetch-video-details";

export default function Add() {
  return (
    <div>
      <DashboardHeader
        title="Add Video"
        subheading="Add a new video to your account"
      />
      <DashboardContent>
        <FetchVideoDetails />
      </DashboardContent>
    </div>
  );
}
