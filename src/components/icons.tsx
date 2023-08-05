import { Youtube, Users, Settings, Plus, Search } from "lucide-react";

export const Icons = {
  youtube: Youtube,
  users: Users,
  settings: Settings,
  plus: Plus,
  search: Search,
};

export type IconName = keyof typeof Icons;
