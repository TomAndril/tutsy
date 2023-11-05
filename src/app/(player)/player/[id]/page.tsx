import Navbar from "@/components/navbar";
import VideoPlayerContainer from "@/components/video-player-container";
import { getUserVideoById } from "@/lib/videos";
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
  const initialData = await getUserVideoById(id);

  return (
    <>
      <Navbar />
      <VideoPlayerContainer video={initialData} />
    </>
  );
}
