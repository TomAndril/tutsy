import Navbar from "@/components/navbar";
import VideoPlayerContainer from "@/components/video-player-container";
import { getPlayerConfig } from "@/lib/user";
import { getUserVideoById } from "@/lib/videos";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params: { id } }: PageProps) {
  const video = await getUserVideoById(id);

  if (video) {
    return {
      title: `${video.title} | tutsy`,
      description: "A simple app to help you learn new things.",
    };
  }
}

export default async function PlayerPage({ params: { id } }: PageProps) {
  const [initialData, userConfig] = await Promise.all([
    getUserVideoById(id),
    getPlayerConfig(cookies()),
  ]);

  if (initialData.error) {
    return notFound();
  }

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
