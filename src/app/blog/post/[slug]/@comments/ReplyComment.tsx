import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getFormattedDate from "@/lib/getFormattedDate";
import { Comment, User } from "@prisma/client";
import React, { useState } from "react";
import { User as AuthUser } from "next-auth";
import { Pencil, Trash2 } from "lucide-react";
import EditCommentBox from "./EditCommentBox";
import ConfirmationModal from "@/components/ConfirmationModal";

type TProps = {
  repComment: Comment & { author: User };
  user: AuthUser | undefined;
  onDelete: (commentId: number, userId: number) => void;
};
export default function ReplyComment({ repComment, user, onDelete }: TProps) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div id={repComment.id.toString()} className="ml-10 mt-4 border-t pt-4">
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
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {repComment.author?.name}
              </p>
              {repComment?.authorId === parseInt(user?.id!) && (
                <div className="flex space-x-2">
                  <Pencil
                    onClick={() => setIsEdit((prev) => !prev)}
                    size={16}
                    className="cursor-pointer"
                  />
                  <ConfirmationModal
                    title="Are you Sure Delete This Comment"
                    description="delete comment permanently?"
                    onConfirm={() =>
                      onDelete(repComment.id, parseInt(user?.id!))
                    }
                  >
                    <Trash2 size={16} className="cursor-pointer" />
                  </ConfirmationModal>
                </div>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {getFormattedDate(repComment.createdAt)}
            </div>
          </div>
          {isEdit ? (
            <EditCommentBox comment={repComment} setIsEdit={setIsEdit} />
          ) : (
            <p className="text-gray-700 dark:text-gray-400">
              {repComment.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
