"use client";
import { likePost } from "@/actions/like/likePost";
import { auth } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/db";
import { Heart } from "lucide-react";
import React, { useState } from "react";

export default function LikeButton({
  isLiked,
  postId,
}: {
  isLiked: boolean;
  postId: number;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleLike() {
    setIsLoading(true);
    const res = await likePost({ postId });

    if (res.type === "error") {
      toast({
        title: "Cannot like post",
        description: res.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Post liked successfully",
      });
    }
    setIsLoading(false);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleLike}
      disabled={isLoading}
    >
      <Heart
        className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`}
      />
    </Button>
  );
}
