"use server";
import { db } from "./../../lib/db";

import * as EmailValidator from "email-validator";

export async function createNewsletter({ email }: { email: string }) {
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
      email,
    },
  });

  return {
    type: "success",
    message: "Thank you for subscribing to our newsletter",
  };
}
