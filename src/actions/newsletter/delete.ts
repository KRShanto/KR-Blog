"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteNewsletterSubscription(id: number) {
  await db.newsletterSubscription.delete({
    where: { id },
  });

  revalidatePath("/admin/newsletter");

  return {
    type: "success",
    message: "Newsletter subscription deleted",
  };
}
