"use server";

import { CATEGORY_TAG } from "@/lib/consts";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import { revalidateTag } from "next/cache";

export const addCategory = async (category: Partial<Category>) => {
  try {
    const response = await db.category.create({
      data: category as Category,
    });
    if (response) {
      revalidateTag(CATEGORY_TAG);

      return {
        success: true,
        status: 201,
        message: "Category added successfully",
        category: response,
      };
    } else {
      throw new Error("Failed to add category");
    }
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err);
  }
};
