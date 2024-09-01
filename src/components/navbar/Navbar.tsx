import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import NavbarThemeSwitch from "./NavbarThemeSwitch";
import Link from "next/link";
import { auth } from "@/app/auth";
import LogoutButton from "./LogoutButton";
import Logo from "../Logo";
import ResponsiveNav from "./ResponsiveNav";
import SearchBox from "./SearchBox";
import AdminLink from "./AdminLink";
import AuthButton from "./AuthButton";
import { Suspense } from "react";

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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b px-4 backdrop-blur-lg lg:px-6">
      <Link className="min-w-[100px] text-2xl lg:text-4xl" href="/">
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

        <Suspense>
          <AdminLink />
        </Suspense>
      </nav>
      <div className="ml-4 flex items-center gap-2">
        <SearchBox className="hidden" />

        <NavbarThemeSwitch />

        <Suspense>
          <AuthButton />
        </Suspense>

        <ResponsiveNav navLinks={navigationLinks}>
          <Suspense>
            <AdminLink />
          </Suspense>
        </ResponsiveNav>
      </div>
    </header>
  );
}
