import { VideoDetails } from "@/types/video";
import API from "./axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

async function getVideoDetails(
  videoId: string,
  cookies?: ReadonlyRequestCookies
) {
  const { data } = await API.get("video?videoId=" + videoId, {
    headers: {
      cookie: cookies as any,
    },
  });
  const response = (await data) as {
    videoDetails: VideoDetails;
  };

  return response.videoDetails;
}

export { getVideoDetails };
