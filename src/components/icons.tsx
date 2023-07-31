import { Youtube, Users, Settings } from "lucide-react";

export const icons = {
  youtube: Youtube,
  users: Users,
  settings: Settings,
};

export type IconName = keyof typeof icons;
