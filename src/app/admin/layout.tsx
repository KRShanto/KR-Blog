import { FileText, Mail, Tag, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import Sidebar from "./Sidebar";

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
