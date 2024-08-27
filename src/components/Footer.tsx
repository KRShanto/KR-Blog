import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-muted-foreground">
        © 2023 Acme Inc. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="#">
          Privacy
        </Link>
      </nav>
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="Author" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Link
          href="#"
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          John Doe
        </Link>
      </div>
    </footer>
  );
}
