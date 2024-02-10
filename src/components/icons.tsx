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
  Check,
  Info,
  Menu,
  ArrowUpNarrowWide,
  History,
  ExternalLink
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
  check: Check,
  info: Info,
  menu: Menu,
  arrowUp: ArrowUpNarrowWide,
  history: History,
  extenalLink: ExternalLink
};

export type IconName = keyof typeof Icons;
