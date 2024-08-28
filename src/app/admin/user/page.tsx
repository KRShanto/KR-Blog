import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { db } from "@/lib/db";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { Crown, User } from "lucide-react";
import { auth } from "@/app/auth";
import DeleteUser from "./DeleteUser";

export default async function UsersPage() {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
    },
    orderBy: { createdAt: "asc" },
  });
  const session = await auth();

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex w-full flex-col items-center justify-between sm:flex-row">
        <h1 className="mb-4 text-2xl font-bold sm:mb-0">Users</h1>
        <AddUser />
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Image
                      src={user.image || "/user.png"}
                      alt={`${user.name}'s avatar`}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.role === "ADMIN" ? (
                    <div className="flex items-center gap-1 text-[#ff6200] dark:text-[#FFD700]">
                      <Crown className="h-4 w-4" /> Admin
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" /> User
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <EditUser
                      id={user.id}
                      name={user.name!}
                      email={user.email}
                      role={user.role}
                    />
                    {session?.user?.id !== user.id && (
                      <DeleteUser id={user.id} />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
