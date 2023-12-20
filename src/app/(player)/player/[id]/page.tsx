import Navbar from "@/components/navbar";
import VideoPlayerContainer from "@/components/video-player-container";
import { getUserConfiguration } from "@/lib/user";
import { getUserVideoById } from "@/lib/videos";
import { cookies } from "next/headers";
interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const video = await getUserVideoById(id);

  return {
    title: `${video.title} | tuti`,
    description: "A simple app to help you learn new things.",
  };
}

export default async function PlayerPage({ params: { id } }: PageProps) {
  const [initialData, userConfig] = await Promise.all([
    getUserVideoById(id),
    getUserConfiguration(cookies()),
  ]);

  return (
    <>
      <Navbar />
      <VideoPlayerContainer
        video={initialData}
        userConfig={userConfig.config}
      />
    </>
  );
}
