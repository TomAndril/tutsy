import NavBarRightSide from "./navbar-right-side";

import NavBarSearch from "./navbar-search";

import MobileNav from "./mobile-nav";
import NavBarLeftSide from "./navbar-left-side";

interface Props {
  borderBottom?: boolean;
}

export default function Navbar({ borderBottom = false }: Props) {
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
        <div className="hidden md:flex w-2/5">
          <NavBarSearch />
        </div>
        <NavBarRightSide />
      </nav>
    </div>
  );
}
