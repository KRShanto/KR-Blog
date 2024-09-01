import { FileText, Mail, Tag, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import Sidebar from "./Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "Admin | %s",
    default: "Admin Panel",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
