"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function editIdea({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) {
  const updatedIdea = await db.idea.update({
    where: {
      id,
    },
    data: {
      title,
      description,
    },
  });

  revalidatePath("/admin/idea");

  return {
    type: "success",
    data: updatedIdea,
  };
}
