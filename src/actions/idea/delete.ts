"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteIdea({ id }: { id: number }) {
  await db.idea.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/idea");

  return {
    type: "success",
  };
}
