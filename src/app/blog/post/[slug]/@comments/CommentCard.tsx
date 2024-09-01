import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import getFormattedDate from "@/lib/getFormattedDate";
import React, { useState } from "react";
import ReplyComment from "./ReplyComment";
import ReplyCommentBox from "./ReplyCommentBox";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { Comment, User } from "@prisma/client";

type TProps = {
  comment: Comment & { replies: (Comment & { author: User })[] } & {
    author: User;
  };
  postId: number;
};

export default function CommentCard({ comment, postId }: TProps) {
  const [isReply, setIsReply] = useState(false);
  return (
    <Card key={comment.id} className="mb-6">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={comment.author?.image || "/default-avatar.jpg"}
              alt={comment.author?.name || "User avatar"}
            />
            <AvatarFallback>
              {comment.author.name &&
                comment.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {comment.author?.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getFormattedDate(comment.createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 dark:text-gray-400">{comment.content}</p>
        {comment.replies.length > 0 &&
          comment.replies.map((repComment) => (
            <ReplyComment key={repComment.id} repComment={repComment} />
          ))}
        {isReply && (
          <div className="ml-10">
            <ReplyCommentBox
              parentCommentId={comment.id}
              postId={postId}
              setIsReply={setIsReply}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isReply && (
          <Button onClick={() => setIsReply(true)} variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            Reply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
