"use client";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import NavbarSearchVideo from "./navbar-search-video";
import { Icons } from "./icons";
import { useState } from "react";

interface Props {
  session: Session["user"] | undefined;
}

export default function NavBarRightSide({ session }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center">
      <div className="block md:hidden">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="p-2 mr-4">
            <Icons.search size={18} />
          </DialogTrigger>
          <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>Paste Youtube Link</DialogTitle>
              <DialogDescription>
                Paste the link of the video you want to add
              </DialogDescription>
            </DialogHeader>
            <NavbarSearchVideo
              isMobileSearch
              closeDialog={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      {session?.name && session?.image ? (
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
      ) : (
        <div>
          <NavBarRightSideSignIn />
        </div>
      )}
    </div>
  );
}
