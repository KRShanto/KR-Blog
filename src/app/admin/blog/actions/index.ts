"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const deleteBlog = async (blogId: number) => {
  try {
    await db.post.delete({
      where: {
        id: blogId,
      },
    });
    revalidatePath("/admin/blog");
    return {
      success: true,
      message: "Blog deleted successfully",
      status: 200,
    };
  } catch (err: any) {
    throw new Error(err);
  }
};
