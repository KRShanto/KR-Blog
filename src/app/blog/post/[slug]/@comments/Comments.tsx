"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Comment, User } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import CommentBox from "./CommentBox";
import getFormattedDate from "@/lib/getFormattedDate";
import ReplyCommentBox from "./ReplyCommentBox";
import { useState } from "react";
import ReplyComment from "./ReplyComment";
import CommentCard from "./CommentCard";
import { Session } from "next-auth";

type TProps = {
  postId: number;
  comments: (Comment & {
    author: User;
    replies: (Comment & { author: User })[];
  })[];
  session: Session | null;
};
export default function Comments({ session, comments, postId }: TProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Comments
      </h2>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          postId={postId}
          user={session?.user as any}
        />
      ))}

      {session ? (
        <CommentBox postId={postId} />
      ) : (
        <p className="text-center text-lg font-medium">
          <MessageCircle className="mr-2 inline" />
          You need to be logged in to comment
        </p>
      )}
    </section>
  );
}
