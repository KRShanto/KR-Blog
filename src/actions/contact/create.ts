"use server";

import { db } from "@/lib/db";

export async function createContact({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  await db.contact.create({
    data: {
      name,
      email,
      message,
    },
  });

  return {
    type: "success",
    message: "Contact created successfully",
  };
}
