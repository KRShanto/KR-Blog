import { auth } from "@/app/auth";
import { db } from "@/lib/db";
import React from "react";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";

export default async function Saves({ postId }: { postId: number }) {
  const session = await auth();
  const savePost = await db.savedPost.findFirst({
    where: {
      postId,
    },
  });
  const isSaved = savePost?.userId === session?.user.id;
  return (
    <div className="flex items-center gap-2">
      <SaveButton isSaved={isSaved} postId={postId} />
    </div>
  );
}
