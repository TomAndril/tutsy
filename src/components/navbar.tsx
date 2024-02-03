import NavBarRightSide from "./navbar-right-side";
import Link from "next/link";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import NavBarSearch from "./navbar-search";

import MobileNav from "./mobile-nav";

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
          <Button asChild variant="link" className="font-mono">
            <Link href="/">Tutsy</Link>
          </Button>
          <Badge variant="secondary">BETA</Badge>
        </div>
        <div className="hidden md:flex w-2/5">
          <NavBarSearch />
        </div>
        <NavBarRightSide />
      </nav>
    </div>
  );
}
