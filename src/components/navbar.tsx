import NavBarRightSide from "./navbar-right-side";
import MobileNav from "./mobile-nav";
import NavBarLeftSide from "./navbar-left-side";

import NavbarSearchVideo from "./navbar-search-video";
import { getCurrentUser } from "@/lib/session";

interface Props {
  borderBottom?: boolean
}

export default async function Navbar({ borderBottom = false }: Props) {

  const session = await getCurrentUser();

  return (
    <div
      className={`sticky top-0 backdrop-blur-xl bg-[var(--navbar-bg)] z-50 rounded ${
        borderBottom ? "border-b" : ""
      }`}
    >
      <nav className="container flex items-center justify-between h-16 text-sm">
        <div className="flex items-center justify-center md:hidden">
          <MobileNav />
        </div>
        <div className="-ml-4 hidden md:flex items-center justify-center">
          <NavBarLeftSide />
        </div>
        <NavbarSearchVideo />
        <NavBarRightSide session={session} />
      </nav>
    </div>
  );
}
