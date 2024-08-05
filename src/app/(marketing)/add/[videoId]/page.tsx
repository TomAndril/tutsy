import FetchVideoDetailsData from "@/components/fetch-video-details-data";
import { getVideoDetails } from "@/lib/api";
import { cookies } from "next/headers";

interface Params {
  params: {
    videoId: string;
  };
}

export default async function AddPage({ params }: Params) {
  const videoDetails = await getVideoDetails(params.videoId, cookies());

  return (
    <div className="container my-4">
      <FetchVideoDetailsData videoDetails={videoDetails} />
    </div>
  );
}
