import NavBarRightSide from "./navbar-right-side";
import Link from "next/link";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import NavBarSearch from "./navbar-search";

interface Props {
  borderBottom?: boolean;
}

export default async function Navbar({ borderBottom = false }: Props) {
  return (
    <div
      className={`sticky top-0 backdrop-blur-sm z-50 rounded ${
        borderBottom ? "border-b" : ""
      }`}
    >
      <nav className="container flex items-center justify-between h-16 text-sm">
        <div className="-ml-4 flex items-center justify-center">
          <Button asChild variant="link" className="font-mono">
            <Link href="/">Tuti</Link>
          </Button>
          <Badge variant="secondary">BETA</Badge>
        </div>
        <div className="hidden md:flex w-3/6">
          {/* <Button asChild variant="link" className="font-mono mr-6">
            <Link href="/">Discover</Link>
          </Button> */}
          <NavBarSearch />
        </div>
        <NavBarRightSide />
      </nav>
    </div>
  );
}
