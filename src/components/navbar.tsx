import NavBarRightSide from "./navbar-right-side";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between h-16 text-sm">
        <div className="-ml-4">
          <Button asChild variant="link">
            <Link href="/">Tuti</Link>
          </Button>
        </div>
        <NavBarRightSide />
      </nav>
    </div>
  );
}
