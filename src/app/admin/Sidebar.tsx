"use client";

import { Button } from "@/components/ui/button";
import { FileText, Mail, Menu, Tag, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const paths = [
  { href: "/admin/blog", icon: FileText, label: "Posts" },
  { href: "/admin/category", icon: Tag, label: "Categories" },
  { href: "/admin/user", icon: Users, label: "Users" },
  { href: "/admin/newsletter", icon: Mail, label: "Newsletter" },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="p-4 shadow-md md:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full shadow-md md:w-64 ${isMobileMenuOpen ? "block" : "hidden"} md:block`}
      >
        <nav className="mt-5">
          {paths.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={`block rounded-md px-4 py-2 ${
                pathname.includes(href)
                  ? "bg-gray-200 dark:bg-gray-800"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="mr-2 inline-block" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
