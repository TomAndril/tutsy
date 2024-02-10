"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";
import { dashboardNavItems } from "@/config/dashboard";
import { Button } from "./ui/button";
import { Icons } from "@/components/icons";

export default function DashboardAside() {
  const path = usePathname();
  return (
    <aside className="max-w-md hidden md:block" data-testid='dashboard-aside'>
      {dashboardNavItems.map((item) => {
        const Icon = Icons[item.icon];
        return (
          <div key={item.title} className="mb-2 flex">
            <Button
              asChild
              className={cn("w-full justify-start", {
                "bg-slate-600 text-slate-200 dark:bg-white dark:text-slate-900 font-semibold":
                  path === item.href,
              })}
              variant="ghost"
            >
              <Link href={item.href}>
                <Icon className="mr-4" />
                {item.title}
              </Link>
            </Button>
          </div>
        );
      })}
    </aside>
  );
}
