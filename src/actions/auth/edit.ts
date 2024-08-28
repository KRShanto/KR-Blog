"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function editUser({
  id,
  name,
  email,
  role,
}: {
  id: number;
  name?: string;
  email?: string;
  role?: "USER" | "ADMIN";
}) {
  const user = await db.user.findUnique({
    where: { id },
  });

  if (!user) {
    return { type: "error", message: "User not found" };
  }

  await db.user.update({
    where: { id },
    data: {
      name: name || user.name,
      email: email || user.email,
      role: role || user.role,
    },
  });

  revalidatePath("/admin/user");

  return { type: "success", message: "User updated successfully" };
}
