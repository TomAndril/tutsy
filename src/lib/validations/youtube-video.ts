import { z } from "zod";

const youtubeVideoRegex =
  /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gim;

export const addVideoSchema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: "Video URL is required" })
    .regex(youtubeVideoRegex, { message: "Invalid YouTube URL" }),
});

export type AddVideoSchema = z.infer<typeof addVideoSchema>;
