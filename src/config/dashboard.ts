import { IconName } from "@/components/icons";

interface DashboardNavItem {
  title: string;
  icon: IconName;
}

const dashboard: DashboardNavItem[] = [
  {
    title: "Videos",
    icon: "youtube",
  },
  {
    title: "People",
    icon: "users",
  },
  {
    title: "Settings",
    icon: "settings",
  },
];

export { dashboard };
