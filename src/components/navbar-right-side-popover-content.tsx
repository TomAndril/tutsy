"use client";

import { PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function NavBarRightSidePopoverContent() {
  return (
    <PopoverContent>
      <div className="flex flex-col p-2">
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </PopoverContent>
  );
}
