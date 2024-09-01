"use client";
import { addComment } from "@/actions/comment/create";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";

import React, { useState } from "react";
type TProps = {
  parentCommentId: number;
  postId: number;
  setIsReply: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
};
export default function ReplyCommentBox({
  postId,
  parentCommentId,
  setIsReply,
  user,
}: TProps) {
  const [replyCommentText, setReplyCommentText] = useState("");
  const { toast } = useToast();

  const handleReplyComment = async () => {
    try {
      const response = await addComment({
        content: replyCommentText,
        postId,
        parentCommentId: parentCommentId,
      });
      if (response.status === 201) {
        setIsReply(false);
        toast({ variant: "default", description: "Reply comment successful" });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to reply comment",
      });
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>
            {user.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">Just now</div>
          </div>
          <Textarea
            onChange={(e) => setReplyCommentText(e.target.value)}
            className="mt-2 min-h-[80px]"
            placeholder="Write your reply..."
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button onClick={() => setIsReply(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleReplyComment}>Reply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
