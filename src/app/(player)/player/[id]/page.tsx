import Navbar from "@/components/navbar";
import VideoPlayerContainer from "@/components/video-player-container";
import { getUserVideoById } from "@/lib/videos";
import { Metadata } from "next";
interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Player | tuti",
  description: "A simple app to help you learn new things.",
};

export default async function PlayerPage({ params: { id } }: PageProps) {
  const video = await getUserVideoById(id);

  return (
    <>
      <div className="container">
        <Navbar />
      </div>
      <VideoPlayerContainer video={video} />
    </>
  );
}
