import { Moon, MountainIcon, SearchIcon, Sun } from "lucide-react";
import { Input } from "./ui/input";
import React from "react";
import { Button } from "./ui/button";
import NavbarThemeSwitch from "./NavbarThemeSwitch";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex h-14 items-center border-b px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/contact"
        >
          Contact
        </Link>
      </nav>
      <div className="ml-4 flex items-center gap-2">
        <form className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            placeholder="Search..."
            type="search"
          />
        </form>

        <NavbarThemeSwitch />
      </div>
    </header>
  );
}
