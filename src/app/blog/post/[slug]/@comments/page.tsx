import { auth } from "@/app/auth";
import Comments from "./Comments";
import { db } from "@/lib/db";
import React from "react";

type TProps = { params: { slug: string }; searchParams: { commentId: string } };

export default async function Page({ params, searchParams }: TProps) {
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
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const session = await auth();

  return (
    <Comments
      commentIdForQuery={searchParams.commentId}
      comments={comments}
      postId={post.id}
      session={session}
    />
  );
}
