import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getFormattedDate from "@/lib/getFormattedDate";
import { Comment, User } from "@prisma/client";
import React from "react";

type TProps = {
  repComment: Comment & { author: User };
};
export default function ReplyComment({ repComment }: TProps) {
  return (
    <div className="ml-10 mt-4 border-t pt-4">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>
            {repComment?.author?.name &&
              repComment.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-col items-start">
            <div className="font-medium">{repComment.author.name}</div>
            <div className="text-xs text-muted-foreground">
              {getFormattedDate(repComment.createdAt)}
            </div>
          </div>
          <p className="mt-2 text-gray-700 dark:text-gray-400">
            {repComment.content}
          </p>
        </div>
      </div>
    </div>
  );
}
