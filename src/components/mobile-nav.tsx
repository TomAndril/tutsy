"use client";

import { Button } from "./ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { dashboardNavItems } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function MobileNav() {
  const path = usePathname();
  const { status } = useSession();

  const [open, setOpen] = useState(false);

  const { push } = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Icons.menu size={20} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Button asChild variant="link" className="font-mono">
              <Link href="/">Tutsy</Link>
            </Button>
            <Badge variant="secondary">Beta</Badge>
          </SheetTitle>
          <SheetDescription>
            <Separator className="my-4" />
            {status === "authenticated" &&
              dashboardNavItems.map((item) => {
                const Icon = Icons[item.icon];
                return (
                  <div key={item.title} className="mb-2 flex">
                    <Button
                      onClick={() => {
                        push(item.href);
                        setOpen(false);
                      }}
                      className={cn("w-full justify-start", {
                        "bg-slate-600 text-slate-200 dark:bg-white dark:text-slate-900 font-semibold":
                          path === item.href,
                      })}
                      variant="ghost"
                    >
                      <Icon className="mr-4" />
                      {item.title}
                    </Button>
                  </div>
                );
              })}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
