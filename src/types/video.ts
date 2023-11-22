import ytdl from "ytdl-core";
import { Chapter, Video } from "@prisma/client";

export type VideoDetails = ytdl.videoInfo["videoDetails"];

export type VideoWithChapters = Video & { chapters: Chapter[] };

export type VideoSearchResult = Pick<
  VideoDetails,
  | "videoId"
  | "author"
  | "description"
  | "chapters"
  | "title"
  | "thumbnails"
  | "lengthSeconds"
  | "viewCount"
  | "video_url"
  | "category"
  | 'publishDate'
>;
