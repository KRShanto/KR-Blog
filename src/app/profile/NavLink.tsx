"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export default function NavLink({
  item,
  isMobile = false,
}: {
  item: {
    id: string;
    label: string;
    icon: React.ReactNode;
  };
  isMobile?: boolean;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={item.id}
      className={cn(
        `w-full justify-start ${isMobile ? "flex" : "hidden sm:flex"}`,
        buttonVariants({
          variant: pathname === item.id ? "default" : "ghost",
        }),
      )}
    >
      {item.icon}
      {item.label}
    </Link>
  );
}
