"use server";

import { db } from "@/lib/db";

export async function getCategories() {
  return await db.category.findMany();
}
