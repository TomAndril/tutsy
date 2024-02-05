"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useTheme } from "next-themes";
import Image from "next/image";

import logo from "@/assets/app-icon.svg";
import logoDark from "@/assets/app-icon-dark.svg";
import { useEffect, useState } from "react";

export default function NavBarLeftSide() {
  const { resolvedTheme } = useTheme();

  const [theme, setTheme] = useState<null | string>(resolvedTheme ?? "light");

  useEffect(() => {
    setTheme(resolvedTheme ?? "light");
  }, [resolvedTheme]);

  return (
    <>
      <Button asChild variant="link" className="font-mono">
        <Link href="/">
          <Image
            src={theme === "dark" ? logoDark : logo}
            alt="Tutsy"
            width={18}
            height={18}
            layout="fixed"
            className="mr-2"
          />
          Tutsy
        </Link>
      </Button>
      <Badge>BETA</Badge>
    </>
  );
}
