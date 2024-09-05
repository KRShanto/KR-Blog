import Sidebar from "../../components/Sidebar";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "../auth";

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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") return notFound();

  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
