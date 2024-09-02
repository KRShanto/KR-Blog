import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import React from "react";
import LikeButton from "./LikeButton";

export default async function Likes({ postId }: { postId: number }) {
  const likes = await db.like.findMany({
    where: {
      postId,
    },
  });
  const session = await auth();

  const likeCount = likes.length;
  const isLiked = likes.some((like) => like.userId === session?.user.id);

  return (
    <div className="flex items-center gap-2">
      <LikeButton isLiked={isLiked} postId={postId} />
      <span className="select-none text-sm font-medium text-gray-900 dark:text-gray-100">
        <span className="font-bold">{likeCount}</span>{" "}
        {likeCount <= 1 ? "Like" : "Likes"}
      </span>
    </div>
  );
}
