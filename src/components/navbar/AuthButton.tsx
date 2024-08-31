import { auth } from "@/app/auth";
import React from "react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function AuthButton() {
  const session = await auth();

  if (session) {
    return <LogoutButton />;
  }

  return (
    <Link
      className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
      href="/login"
    >
      Login
    </Link>
  );
}
