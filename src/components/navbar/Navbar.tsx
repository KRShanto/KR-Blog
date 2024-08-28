import { Moon, MountainIcon, SearchIcon, Sun } from "lucide-react";
import { Input } from "../ui/input";
import React from "react";
import { Button } from "../ui/button";
import NavbarThemeSwitch from "./NavbarThemeSwitch";
import Link from "next/link";
import { auth } from "@/app/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await auth();

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

        {session && session.user.role === "ADMIN" && (
          <Link
            className="text-sm font-medium underline-offset-4 hover:underline"
            href="/admin/blog"
          >
            Admin
          </Link>
        )}
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

        {session ? (
          <LogoutButton />
        ) : (
          <Link
            className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
