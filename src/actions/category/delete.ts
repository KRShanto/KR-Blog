"use server";

import { CATEGORY_TAG } from "@/lib/consts";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export const deleteCategory = async (categoryId: number) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidateTag(CATEGORY_TAG);

    return {
      success: true,
      status: 200,
      message: "Category deleted successfully",
    };
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err);
  }
};
