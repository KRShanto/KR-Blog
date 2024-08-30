import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function SearchBox({ className }: { className?: string }) {
  return (
    <form
      className={cn(
        "relative sm:w-[300px] md:block md:w-[200px] lg:w-[300px]",
        className,
      )}
    >
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input className="pl-8" placeholder="Search..." type="search" />
    </form>
  );
}
