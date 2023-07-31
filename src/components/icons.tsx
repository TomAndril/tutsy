import { Youtube, Users, Settings, Plus } from "lucide-react";

export const Icons = {
  youtube: Youtube,
  users: Users,
  settings: Settings,
  plus: Plus,
};

export type IconName = keyof typeof Icons;
