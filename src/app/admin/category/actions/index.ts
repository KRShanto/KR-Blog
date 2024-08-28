"use server";

import { db } from "@/lib/db";
import { Category } from "@prisma/client";
import { revalidatePath } from "next/cache";

// add category actions
export const addCategory = async (category: Partial<Category>) => {
  try {
    const response = await db.category.create({
      data: category as Category,
    });
    if (response) {
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

// edit category actions
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

// delete category actions

export const deleteCategory = async (categoryId: number) => {
  try {
    await db.category.delete({
      where: {
        id: categoryId,
      },
    });
    revalidatePath("/admin/category");
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
