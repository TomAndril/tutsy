import { VideoSearchResult, VideoWithChapters } from "@/types/video";
import { Chapter } from "@prisma/client";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import API from "./axios";

export async function addVideoToUserAccount(videoId: string) {
  await API.post("video", {
    videoId,
  });
}

export async function getUserVideos(cookies?: ReadonlyRequestCookies) {
  const { data } = await API.get("user", {
    headers: {
      // required for next-auth to work
      cookie: cookies as any,
    },
  });
  return data as { videos: VideoWithChapters[] };
}

export async function getUserVideoById(videoId: string) {
  const { data } = await API.get("progress", {
    params: {
      videoId,
    },
  });
  return data as VideoWithChapters & { error?: string };
}

export async function deleteVideoFromUserAccount(videoId: string) {
  await API.delete("video", {
    data: {
      videoId,
    },
  });
}

export async function resetVideoProgress(videoId: string) {
  await API.put("progress", {
    videoId,
  });
}

export async function updateChapterStatus(
  chapter: Chapter,
  hasCompletedAllChapters: boolean
) {
  await API.patch("progress", {
    chapterId: chapter.id,
    hasCompletedAllChapters,
  });
}

export async function getVideoSearchResults(query: string) {
  const { data } = await API.get("search", {
    params: {
      query,
    },
  });
  return data.data as VideoSearchResult[];
}
