"use client";

import { Button } from "@/components/ui/button";
import { useBlogSidebarStore } from "@/stores/blogSidebar";
import { Menu } from "lucide-react";
import React from "react";

export default function CategoryOpenButton() {
  const { isOpen, toggleSidebar } = useBlogSidebarStore();

  return (
    <div className="mb-4 lg:hidden">
      <Button
        onClick={toggleSidebar}
        variant="outline"
        className="w-full justify-start"
      >
        <Menu className="mr-2 h-4 w-4" />
        {isOpen ? "Hide Categories" : "Show Categories"}
      </Button>
    </div>
  );
}
