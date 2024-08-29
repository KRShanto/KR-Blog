"use client";

import { useBlogSidebarStore } from "@/stores/blogSidebar";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";

export default function Categories({
  categories,
  selectedCategory,
}: {
  categories: Category[];
  selectedCategory: Category | null;
}) {
  const { isOpen } = useBlogSidebarStore();

  return (
    <aside
      className={`mb-8 w-full lg:mb-0 lg:w-64 ${isOpen ? "block" : "hidden lg:block"}`}
    >
      <h2 className="mb-4 text-xl font-semibold">Categories</h2>

      <Link
        href={`/blog`}
        className={cn(
          "mb-2 flex items-center gap-2 rounded-lg bg-zinc-200 p-2",
          !selectedCategory ? "bg-zinc-900 text-white" : "hover:bg-zinc-300",
        )}
      >
        <div
          className={cn(
            "h-4 w-4 rounded-full",
            selectedCategory === null ? "bg-blue-500" : "bg-zinc-400",
          )}
        ></div>
        All Categories
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/blog/cat/${category.slug}`}
          className={cn(
            "mb-2 flex items-center gap-2 rounded-lg bg-zinc-200 p-2",
            selectedCategory?.id === category.id
              ? "bg-zinc-900 text-white"
              : "hover:bg-zinc-300",
          )}
        >
          <div
            className={cn(
              "h-4 w-4 rounded-full",
              selectedCategory?.id === category.id
                ? "bg-blue-500"
                : "bg-zinc-400",
            )}
          ></div>

          {category.name}
        </Link>
      ))}
    </aside>
  );
}
