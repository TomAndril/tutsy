import Link from "next/link";
import NavBarRightSideSignIn from "./navbar-right-side-sign-in";
import NavBarRightSidePopoverContent from "./navbar-right-side-popover-content";

import { getFirstLetter } from "@/utils";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

async function getUserStatus() {
  const session = await getServerSession();
  if (session) {
    return session.user;
  }
}

export default async function NavBarRightSide() {
  const session = await getUserStatus();

  if (session?.name && session?.image) {
    return (
      <div className="flex items-center">
        <Button asChild variant="link">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src={session.image} alt={session.name} />
              <AvatarFallback>{getFirstLetter(session.name)}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <NavBarRightSidePopoverContent />
        </Popover>
      </div>
    );
  }

  return (
    <div>
      <NavBarRightSideSignIn />
    </div>
  );
}
