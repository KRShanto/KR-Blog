import { auth } from "@/app/auth";
import Link from "next/link";
import React from "react";

export default async function AdminLink() {
  const session = await auth();

  if (session && session.user.role === "ADMIN") {
    return (
      <Link
        className="text-sm font-medium underline-offset-4 hover:underline"
        href="/admin/blog"
      >
        Admin
      </Link>
    );
  }

  return null;
}
