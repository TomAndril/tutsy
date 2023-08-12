import {
  Youtube,
  Users,
  Settings,
  Plus,
  Search,
  CheckCircle,
  CircleOff,
} from "lucide-react";

export const Icons = {
  youtube: Youtube,
  users: Users,
  settings: Settings,
  plus: Plus,
  search: Search,
  checkmark: CheckCircle,
  off: CircleOff,
};

export type IconName = keyof typeof Icons;
