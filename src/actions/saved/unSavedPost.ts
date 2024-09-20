"use server";
import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function unSavedPost(savedId: number) {
  try {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        message: "You need to be logged in to like a post.",
      };
    }

    const unSavedPost = await db.savedPost.delete({
      where: {
        id: savedId,
      },
    });
    if (unSavedPost) {
      revalidateTag("saved-posts");
      return { success: true, message: "Post unliked successfully" };
    } else {
      return { success: false, message: "Failed to unlike post" };
    }
  } catch (err) {
    throw new Error("Failed to unlike post");
  }
}
