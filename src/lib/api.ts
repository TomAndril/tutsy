import ytdl from "ytdl-core";
import API from "./axios";

async function getVideoDetails(videoId: string) {
  const { data } = await API.get("details?videoId=" + videoId);
  const response = (await data) as {
    videoDetails: ytdl.videoInfo["videoDetails"];
  };

  return response.videoDetails;
}

export { getVideoDetails };
