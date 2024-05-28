import NavBarRightSideSignIn from "./navbar-right-side-sign-in";
import NavBarRightSideDropdownItems from "./navbar-right-side-dropdown-items";

import { getFirstLetter } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { auth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

async function getUserStatus() {
  const session = await auth();
  if (session) {
    return session.user;
  }
}

export default async function NavBarRightSide() {
  const session = await getUserStatus();

  if (session?.name && session?.image) {
    return (
      <div className="flex items-center ml-auto md:ml-0">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={session.image} alt={session.name} />
              <AvatarFallback>{getFirstLetter(session.name)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {session.name || session.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <NavBarRightSideDropdownItems />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div>
      <NavBarRightSideSignIn />
    </div>
  );
}
