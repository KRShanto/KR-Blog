"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createIdea({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const newIdea = await db.idea.create({
    data: {
      title,
      description,
    },
  });

  revalidatePath("/admin/idea");

  return {
    type: "success",
    data: newIdea,
  };
}
