import { z } from "zod";

const ThemeEnum = z.enum(["light", "dark", "system"]);

export const themeValues = Object.values(ThemeEnum._def.values);

export const themeSchema = z
  .object({
    theme: ThemeEnum,
  })
  .default({ theme: "system" });

export type Theme = z.infer<typeof themeSchema>;
