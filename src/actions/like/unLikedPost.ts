"use server";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function unlikedPost(likedId: number) {
  try {
    const unlikedPost = await db.like.delete({
      where: {
        id: likedId,
      },
    });
    if (unlikedPost) {
      revalidateTag("liked-post");
      return { success: true, message: "Post unliked successfully" };
    } else {
      return { success: false, message: "Failed to unlike post" };
    }
  } catch (err) {
    throw new Error("Failed to unlike post");
  }
}
