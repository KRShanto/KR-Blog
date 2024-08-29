'use server'

import { db } from "@/lib/db";

export const deleteCategory = async (categoryId: number) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });
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
