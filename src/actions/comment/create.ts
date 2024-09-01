"use server";

import { db } from "@/lib/db";
import { Comment } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addComment(comment: Partial<Comment>) {
  try {
    const { authorId, content, postId, parentCommentId } = comment;
    const response = await db.comment.create({
      data: {
        authorId: authorId!,
        content: content!,
        postId: postId!,
        parentCommentId: parentCommentId ? parentCommentId! : null,
      },
    });
    revalidatePath("/blog/post");
    return {
      success: true,
      status: 201,
      message: "comment added successfully",
      comment: response,
    };
  } catch (err: any) {
    throw new Error(err);
  }
}
