"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBarSearch() {
  const [query, setQuery] = useState("");

  const router = useRouter();

  function onSubmit() {
    router.push(`/search?q=${query}`);
  }

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
        className="rounded-r-none rounded-l-full pl-8 focus:ring-1 ring-in focus:ring-slate-100 dark:focus:ring-slate-800"
        placeholder="Search"
        type="search"
      />
      <Button
        className="bg-slate-300 dark:bg-slate-700 rounded-r-full p-[11px] px-8 cursor-pointer"
        onClick={onSubmit}
      >
        <Icons.search size={18} className="text-black dark:text-white" />
      </Button>
    </>
  );
}
