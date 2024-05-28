"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Icons } from "./icons";
import { usePathname, useRouter } from "next/navigation";

export default function NavBarRightSideDropdownItems() {
  const router = useRouter();
  const pathName = usePathname();

  function handleNavigate() {
    if (pathName === "/dashboard") return;
    router.push("/dashboard");
  }

  return (
    <>
      <DropdownMenuItem onClick={handleNavigate} >
        <Icons.dashboard size={16} className="mr-2" /> Dashboard
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut()}>
        <Icons.logOut size={16} className="mr-2" /> Log out
      </DropdownMenuItem>
    </>
  );
}
