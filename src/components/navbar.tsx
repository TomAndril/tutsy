import NavBarRightSide from "./navbar-right-side";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  borderBottom?: boolean;
}

export default function Navbar({ borderBottom = false }: Props) {
  return (
    <div
      className={`sticky top-0 backdrop-blur-sm z-50 rounded ${
        borderBottom ? "border-b" : ""
      }`}
    >
      <nav className="container flex items-center justify-between h-16 text-sm">
        <div className="-ml-4">
          <Button asChild variant="link" className="font-mono">
            <Link href="/">Tuti</Link>
          </Button>
        </div>
        <NavBarRightSide />
      </nav>
    </div>
  );
}
