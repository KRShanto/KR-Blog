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
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import { Comment, User } from "@prisma/client";
import { User as AuthUser } from "next-auth";
import EditCommentBox from "./EditCommentBox";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useToast } from "@/components/ui/use-toast";
import { deleteComment } from "@/actions/comment/delete";

type TProps = {
  comment: Comment & { replies: (Comment & { author: User })[] } & {
    author: User;
  };
  postId: number;
  user?: AuthUser;
};

export default function CommentCard({ user, comment, postId }: TProps) {
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast();

  const handleConfirmDelete = async (commentId: number, userId: number) => {
    try {
      const response = await deleteComment(commentId, userId);
      if (response.status === 200) {
        toast({
          variant: "default",
          description: "Comment deleted successfully",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Failed to delete comment",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };
  return (
    <Card id={comment.id.toString()} className="mb-6 scroll-mt-14">
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
            <div className="flex items-center space-x-2">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {comment.author?.name}
              </p>
              {comment?.authorId === parseInt(user?.id!) && (
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
                      handleConfirmDelete(comment.id, parseInt(user?.id!))
                    }
                  >
                    <Trash2 size={16} className="cursor-pointer" />
                  </ConfirmationModal>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {getFormattedDate(comment.createdAt)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isEdit ? (
          <EditCommentBox comment={comment} setIsEdit={setIsEdit} />
        ) : (
          <p className="text-gray-700 dark:text-gray-400">{comment.content}</p>
        )}
        {comment.replies.length > 0 &&
          comment.replies.map((repComment) => (
            <ReplyComment
              key={repComment.id}
              repComment={repComment}
              user={user}
              onDelete={handleConfirmDelete}
            />
          ))}
        {isReply && (
          <div className="ml-10">
            <ReplyCommentBox
              parentCommentId={comment.id}
              postId={postId}
              setIsReply={setIsReply}
              user={user!}
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isReply && user && (
          <Button onClick={() => setIsReply(true)} variant="ghost" size="sm">
            <MessageCircle className="mr-2 h-4 w-4" />
            Reply
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
