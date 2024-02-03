import { Button } from "./ui/button";
import { Icons } from "./icons";
import Link from "next/link";
import NavBarSearch from "./navbar-search";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Icons.menu size={20} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Button asChild variant="link" className="font-mono">
              <Link href="/">Tutsy</Link>
            </Button>
            <Badge variant="secondary">Beta</Badge>
          </SheetTitle>
          <SheetDescription>
            <div className="flex">
              <NavBarSearch />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
