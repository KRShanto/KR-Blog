"use client";
import { Comment, User } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import CommentBox from "./CommentBox";
import CommentCard from "./CommentCard";
import { Session } from "next-auth";
import { useEffect } from "react";
import highlightElementById from "@/lib/highlightElementById";

type TProps = {
  postId: number;
  comments: (Comment & {
    author: User;
    replies: (Comment & { author: User })[];
  })[];
  session: Session | null;
  commentIdForQuery: string;
};
export default function Comments({
  session,
  comments,
  postId,
  commentIdForQuery,
}: TProps) {
  useEffect(() => {
    highlightElementById(commentIdForQuery);
  }, [commentIdForQuery]);
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Comments
      </h2>

      {session ? (
        <CommentBox postId={postId} />
      ) : (
        <p className="mb-4 text-center text-lg font-medium">
          <MessageCircle className="mr-2 inline" />
          You need to be logged in to comment
        </p>
      )}

      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          postId={postId}
          user={session?.user as any}
        />
      ))}
    </section>
  );
}
