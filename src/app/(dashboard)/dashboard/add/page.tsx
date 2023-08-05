import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import FetchVideoDetailsForm from "@/components/fetch-video-details-form";

export default function Add() {
  return (
    <div>
      <DashboardHeader title="Add" subheading="Add a new video to your account" />
      <DashboardContent>
        <FetchVideoDetailsForm />
      </DashboardContent>
    </div>
  );
}
