"use client";

import { AlignRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SearchBox from "./SearchBox";

type TProps = {
  navLinks: { label: string; href: string }[];
};

export default function ResponsiveNav({ navLinks }: TProps) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <>
      <button onClick={() => setNavOpen((prev) => !prev)}>
        {navOpen ? <X size={24} /> : <AlignRight size={24} />}
      </button>
      {navOpen && (
        <div className="absolute left-2/4 top-10 m-4 w-80 -translate-x-[55%] rounded-sm bg-white md:hidden">
          <ul className="space-y-2 p-4">
            {navLinks.map((navLink) => (
              <li
                onClick={() => setNavOpen((prev) => !prev)}
                key={navLink.label}
              >
                <Link
                  key={navLink.label}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                  href={navLink.href}
                >
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-3">
            <SearchBox className="w-full" />
          </div>
        </div>
      )}
    </>
  );
}
