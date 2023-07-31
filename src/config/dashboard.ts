import { IconName } from "@/components/icons";

interface DashboardNavItem {
  title: string;
  icon: IconName;
  href: string;
}

const dashboardNavItems: DashboardNavItem[] = [
  {
    title: "Videos",
    icon: "youtube",
    href: "/dashboard",
  },
  {
    title: "People",
    icon: "users",
    href: "/dashboard/people",
  },
  {
    title: "Settings",
    icon: "settings",
    href: "/dashboard/settings",
  },
];

export { dashboardNavItems };
