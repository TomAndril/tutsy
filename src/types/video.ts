import ytdl from "ytdl-core";
import { Chapter, Video } from "@prisma/client";

export type VideoDetails = ytdl.videoInfo["videoDetails"];

export type VideoWithChapters = Video & { chapters: Chapter[] };
