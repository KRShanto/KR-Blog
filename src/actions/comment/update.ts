"use server";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export async function updateComment(
  commentId: number,
  userId: number,
  content: string,
) {
  try {
    const response = await db.comment.update({
      where: {
        authorId: userId,
        id: commentId,
      },
      data: {
        content,
      },
    });
    if (response) {
      revalidatePath("/blog/post");
      revalidateTag("comments");
      return {
        success: true,
        status: 200,
        message: "comment updated successfully",
        comment: response,
      };
    } else {
      return {
        success: false,
        status: 500,
        message: "something went wrong",
        comment: response,
      };
    }
  } catch (err: any) {
    throw new Error(err);
  }
}
