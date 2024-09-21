"use server";
import { db } from "@/lib/db";

export async function deleteComment(commentId: number, userId: number) {
  try {
    const response = await db.comment.delete({
      where: {
        authorId: userId,
        id: commentId,
      },
    });
    if (response) {
      return {
        success: true,
        status: 200,
        message: "comment delete successfully",
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
