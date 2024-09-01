import { auth } from "@/app/auth";
import Comments from "./Comments";
import { db } from "@/lib/db";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await db.post.findFirst({
    where: { slug: decodedSlug },
  });

  if (!post) {
    return null;
  }

  const comments = await db.comment.findMany({
    where: { postId: post.id, parentCommentId: null },
    include: {
      author: true,
      replies: {
        include: { author: true },
      },
    },
  });

  const session = await auth();

  return <Comments comments={comments} postId={post.id} session={session} />;
}
