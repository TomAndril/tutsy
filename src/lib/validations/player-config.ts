import { z } from "zod";

export const playerConfigSchema = z.object({
  jumpToLastChapter: z.boolean(),
});

export type PlayerConfig = z.infer<typeof playerConfigSchema>;
