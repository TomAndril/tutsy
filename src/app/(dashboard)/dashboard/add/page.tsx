import DashboardContent from "@/components/dashboard-content";
import DashboardHeader from "@/components/dashboard-header";
import FetchVideoDetails from "@/components/fetch-video-details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Video | tuti",
  description: "A simple app to help you learn new things.",
};


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
