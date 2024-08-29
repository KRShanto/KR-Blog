'use server'

import { db } from "@/lib/db";
import { Category } from "@prisma/client";

export const editCategory = async (
  categoryId: number,
  updateCategory: Partial<Category>,
) => {
  try {
    const response = await db.category.update({
      where: {
        id: categoryId,
      },
      data: updateCategory as Category,
    });
    if (response) {
      return {
        success: true,
        status: 200,
        message: "Category updated successfully",
        category: response,
      };
    } else {
      throw new Error("Category not found");
    }
  } catch (err: any) {
    console.log(err.message);
    throw new Error(err);
  }
};
