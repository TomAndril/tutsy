import {
  Youtube,
  Users,
  Settings,
  Plus,
  Search,
  CheckCircle,
  CircleOff,
  Play,
  MoreVertical,
  Loader2,
} from "lucide-react";

export const Icons = {
  youtube: Youtube,
  users: Users,
  settings: Settings,
  plus: Plus,
  search: Search,
  checkmark: CheckCircle,
  off: CircleOff,
  play: Play,
  more: MoreVertical,
  loader: Loader2,
};

export type IconName = keyof typeof Icons;
