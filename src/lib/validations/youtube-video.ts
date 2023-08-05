import { z } from "zod";

const youtubeVideoRegex =
  /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gim;

export const addVideoSchema = z.object({
  videoUrl: z.string().regex(youtubeVideoRegex),
});

export type AddVideoSchema = z.infer<typeof addVideoSchema>;
