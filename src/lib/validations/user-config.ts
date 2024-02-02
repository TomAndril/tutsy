import { z } from "zod";

export const userConfigSchema = z.object({
  name: z.string().min(3),
});

export type UserConfig = z.infer<typeof userConfigSchema>;
