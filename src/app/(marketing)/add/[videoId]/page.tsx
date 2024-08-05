import FetchVideoDetailsData from "@/components/fetch-video-details-data";
import { getVideoDetails } from "@/lib/api";

interface Params {
  params: {
    videoId: string;
  };
}

export default async function AddPage({ params }: Params) {
  const videoDetails = await getVideoDetails(params.videoId);

  return (
    <div className="container my-4">
      <FetchVideoDetailsData videoDetails={videoDetails} />
    </div>
  );
}
