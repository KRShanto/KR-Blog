"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function editNewsletterSubscription({
  id,
  name,
  email,
  subscribed,
}: {
  id: number;
  name?: string;
  email?: string;
  subscribed?: boolean;
}) {
  const subscription = await db.newsletterSubscription.findUnique({
    where: { id },
  });

  await db.newsletterSubscription.update({
    where: { id },
    data: {
      name: name || subscription?.name,
      email: email || subscription?.email,
      subscribed:
        subscribed === undefined ? subscription?.subscribed : subscribed,
    },
  });

  revalidatePath("/admin/newsletter");

  return {
    type: "success",
    message: "Newsletter subscription updated",
  };
}
