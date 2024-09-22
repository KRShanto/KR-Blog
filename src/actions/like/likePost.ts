"use server";

import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export async function likePost({ postId }: { postId: number }) {
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
  const like = await db.like.findFirst({
    where: {
      userId: session.user.id,
      postId,
    },
  });

  // remove like if already liked
  if (like) {
    await db.like.delete({
      where: {
        id: like.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        userId: session.user.id,
        postId,
      },
    });
  }

  revalidatePath(`/blog/post`);
  revalidateTag("liked-post");

  return {
    type: "success",
    message: "Post liked successfully.",
  };
}
