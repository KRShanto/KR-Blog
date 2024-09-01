"use client";
import { addComment } from "@/actions/comment/create";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { FormEvent, useState, useTransition } from "react";
type TProps = {
  postId: number;
};
export default function CommentBox({ postId }: TProps) {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addComment({
        authorId: session?.user.id!,
        content: newComment,
        postId,
      });
      if (response.status === 201) {
        setNewComment("");
        toast({
          variant: "default",

          description: "Comment added successfully",
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to add comment",
      });
    }
  };
  return (
    <form
      onSubmit={(e) => startTransition(() => handleCommentSubmit(e))}
      className="mt-4"
    >
      <Textarea
        disabled={!session}
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="mb-2"
      />
      <Button disabled={!session || pending} type="submit">
        Post Comment
      </Button>
    </form>
  );
}