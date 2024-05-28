import Link from "next/link";
import { Badge } from "./ui/badge";

export default function NavBarLeftSide() {
  return (
    <Link className="font-mono text-sm" href="/">
      Tutsy
      <Badge className="ml-2">BETA</Badge>
    </Link>
  );
}
