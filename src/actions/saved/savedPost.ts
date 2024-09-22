"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export async function savedPost({ postId }: { postId: number }) {
  const session = await auth();

  if (!session) {
    return {
      type: "error",
      message: "You need to be logged in to like a post.",
    };
  }

  // await db.like.create({
  //   data: {
  //     userId: session.user.id,
  //     postId,
  //   },
  // });

  // check if already liked
  const savedPost = await db.savedPost.findFirst({
    where: {
      userId: session.user.id,
      postId,
    },
  });

  // remove savePost if already savePostd
  if (savedPost) {
    await db.savedPost.delete({
      where: {
        id: savedPost.id,
      },
    });
    revalidatePath(`/blog/post`);
    revalidateTag("saved-posts");
    return {
      type: "success",
      message: "Post unsaved successfully.",
    };
  } else {
    await db.savedPost.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });
    revalidatePath(`/blog/post`);
    revalidateTag("saved-posts");
    return {
      type: "success",
      message: "Post saved successfully.",
    };
  }
}
