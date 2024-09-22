"use server";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteComment(commentId: number, userId: number) {
  try {
    const findComment = await db.comment.findUnique({
      where: {
        id: commentId,
        authorId: userId,
      },
    });
    if (findComment && !findComment?.parentCommentId) {
      await db.comment.deleteMany({
        where: {
          parentCommentId: commentId,
        },
      });
    }

    const response = await db.comment.delete({
      where: {
        authorId: userId,
        id: commentId,
      },
    });

    if (response) {
      revalidatePath("/blog/post");
      revalidateTag("comments");
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
