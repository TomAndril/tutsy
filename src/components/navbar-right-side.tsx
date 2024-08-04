import NavBarRightSideSignIn from "./navbar-right-side-sign-in";
import NavBarRightSideDropdownItems from "./navbar-right-side-dropdown-items";

import { getFirstLetter } from "@/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Session } from "next-auth";

interface Props {
  session: Session['user'] | undefined
}

export default function NavBarRightSide({ session }: Props) {
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
