import { z } from "zod";

const youtubeVideoRegex =
/^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

export const addVideoSchema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: "Video URL is required" })
    .regex(youtubeVideoRegex, { message: "Invalid YouTube URL" }),
});

export type AddVideoSchema = z.infer<typeof addVideoSchema>;
