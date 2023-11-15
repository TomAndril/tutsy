import axios from "axios";
import { getHost } from "./env";
import { VideoWithChapters } from "@/types/video";
import { Chapter } from "@prisma/client";

export async function addVideoToUserAccount(videoId: string) {
  await axios.post(getHost() + "/api/video", {
    videoId,
  });
}

export async function getUserVideos() {
  const { data } = await axios.get(getHost() + "/api/user");
  return data as { videos: VideoWithChapters[] };
}

export async function getUserVideoById(videoId: string) {
  const { data } = await axios.get(getHost() + "/api/progress", {
    params: {
      videoId,
    },
  });
  return data as VideoWithChapters;
}

export async function deleteVideoFromUserAccount(videoId: string) {
  await axios.delete(getHost() + "/api/video", {
    data: {
      videoId,
    },
  });
}

export async function resetVideoProgress(videoId: string) {
  await axios.put(getHost() + "/api/progress", {
    videoId,
  });
}

export async function updateChapterStatus(chapter: Chapter) {
  await axios.patch(getHost() + "/api/progress", {
    chapterId: chapter.id,
  });
}

export async function getVideoSearchResults(query: string) {
  const { data } = await axios.get(getHost() + "/api/search", {
    params: {
      query,
    },
  });
  return data as any;
}
