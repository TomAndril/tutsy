import ytdl from "ytdl-core";
import API from "./axios";

/**
 * Fetches the details of a video from the API.
 *
 * @param {string} videoId - The ID of the video to fetch details for.
 * @returns {Promise<ytdl.videoInfo["videoDetails"]>} The video details.
 */
export async function fetchVideoDetails(
  videoId: string
): Promise<ytdl.videoInfo["videoDetails"]> {
  const response = await API.get<{
    videoDetails: ytdl.videoInfo["videoDetails"];
  }>(`video?videoId=${videoId}`);

  return response.data.videoDetails;
}
