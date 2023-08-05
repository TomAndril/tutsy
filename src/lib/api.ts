import axios from "axios";
import { getHost } from "./env";
import ytdl from "ytdl-core";

async function getVideoDetails(videoId: string) {
  const { data } = await axios.get(getHost() + "/api/video?videoId=" + videoId);
  const response = (await data) as {
    videoDetails: ytdl.videoInfo["videoDetails"];
  };

  return response.videoDetails;
}

export { getVideoDetails };
