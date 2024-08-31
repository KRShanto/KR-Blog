import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import NavbarThemeSwitch from "./NavbarThemeSwitch";
import Link from "next/link";
import { auth } from "@/app/auth";
import LogoutButton from "./LogoutButton";
import Logo from "../Logo";
import ResponsiveNav from "./ResponsiveNav";
import SearchBox from "./SearchBox";

const navigationLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default async function Navbar() {
  const session = await auth();
  return (
    <header className="sticky top-0 flex h-14 items-center justify-between border-b px-4 backdrop-blur-lg lg:px-6">
      <Link className="text-2xl md:text-4xl" href="/">
        <Logo />
      </Link>
      <nav className="ml-auto hidden gap-4 sm:gap-6 md:flex">
        {navigationLinks.map((navLink) => (
          <Link
            key={navLink.label}
            className="text-sm font-medium underline-offset-4 hover:underline"
            href={navLink.href}
          >
            {navLink.label}
          </Link>
        ))}

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
        <SearchBox className="hidden" />

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
        <ResponsiveNav navLinks={navigationLinks}>
          {session && session.user.role === "ADMIN" && (
            <Link
              className="text-sm font-medium underline-offset-4 hover:underline"
              href="/admin/blog"
            >
              Admin
            </Link>
          )}
        </ResponsiveNav>
      </div>
    </header>
  );
}
