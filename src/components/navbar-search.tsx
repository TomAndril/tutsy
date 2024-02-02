"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAnimatedPlaceholder from "@/hooks/use-animated-placeholder";

interface Props {
  isHero?: boolean;
}

export default function NavBarSearch({ isHero = false }: Props) {
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathName = usePathname();

  const placeholder = useAnimatedPlaceholder();

  function onSubmit() {
    if (query === "") {
      return;
    }

    router.push(`/search?q=${query}`);
    setQuery("");
  }

  useEffect(() => {
    return () => {
      setQuery("");
    };
  }, [pathName]);

  const getPlaceholder = () => {
    if (isHero) {
      return placeholder;
    }

    return "Search";
  };

  return (
    <>
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
        className={`rounded-r-none rounded-l-full pl-8 focus:ring-1 ring-in focus:ring-slate-100 dark:focus:ring-slate-800 ${
          isHero
            ? "h-12 md:h-16 placeholder:text-sm md:placeholder:text-lg placeholder:italic placeholder:font-semibold text-lg"
            : ""
        }`}
        placeholder={getPlaceholder()}
        type="search"
      />
      <Button
        className={`bg-slate-300 dark:bg-slate-700 rounded-r-full p-[11px] px-8 cursor-pointer text-black hover:text-white dark:text-white ${
          isHero ? " h-12 md:h-16 px-4 md:px-8" : ""
        }`}
        onClick={onSubmit}
      >
        <Icons.search size={isHero ? 20 : 16} />
      </Button>
    </>
  );
}
