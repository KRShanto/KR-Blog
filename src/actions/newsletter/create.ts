"use server";
import { revalidatePath } from "next/cache";
import { db } from "./../../lib/db";

import * as EmailValidator from "email-validator";

export async function createNewsletter({
  name,
  email,
  subscribed = true,
}: {
  name: string;
  email: string;
  subscribed?: boolean;
}) {
  if (!name || !email) {
    return {
      type: "error",
      message: "Please fill in all fields",
    };
  }

  if (!EmailValidator.validate(email)) {
    return {
      type: "error",
      message: "Invalid email",
    };
  }

  const previousSubscription = await db.newsletterSubscription.findUnique({
    where: { email },
  });

  if (previousSubscription) {
    return {
      type: "success",
      message: "Already subscribed",
    };
  }

  await db.newsletterSubscription.create({
    data: {
      name,
      email,
      subscribed,
    },
  });

  revalidatePath("/admin/newsletter");

  return {
    type: "success",
    message: "Thank you for subscribing to our newsletter",
  };
}
