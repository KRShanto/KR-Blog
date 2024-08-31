"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: number) {
  const session = await auth();
  
  if (session?.user?.id === id) {
    return { type: "error", message: "You cannot delete yourself" };
  }

  await db.user.delete({
    where: { id },
  });

  revalidatePath("/admin/user");

  return { type: "success", message: "User deleted successfully" };
}
