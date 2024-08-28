"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import * as EmailValidator from "email-validator";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function register({ name, email, password }: RegisterData) {
  // Check if any field is missing
  if (!name || !email || !password) {
    return {
      type: "error",
      message: "Please fill in all fields",
    };
  }

  // check if the user already created
  const user = await db.user.findUnique({
    where: { email },
  });

  if (user) {
    return {
      type: "error",
      message: "User already exists",
    };
  }

  // check if the email is valid
  if (!EmailValidator.validate(email)) {
    return {
      type: "error",
      message: "Invalid email",
    };
  }

  // check if the password is long enough
  if (password.length < 8) {
    return {
      type: "error",
      message: "Password must be at least 8 characters long",
    };
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error found while creating new user");
    console.error("The error: ", error);

    return {
      type: "error",
      message: "A server side error occured",
    };
  }
}
