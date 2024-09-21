"use client";
import { unlikedPost } from "@/actions/like/unLikedPost";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ThumbsUp } from "lucide-react";
import { useTransition } from "react";

export default function UnLikedButton({ likedId }: { likedId: number }) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const handleUnLiked = async () => {
    try {
      const res = await unlikedPost(likedId);
      if (res.success) {
        toast({
          variant: "default",
          title: "successfully unliked post",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Cannot unlike post",
        description: err.message,
      });
    }
  };
  return (
    <ConfirmationModal
      title="Are you Sure Unlike This Post?"
      description="Unlike Post confirmation!!"
      onConfirm={() => startTransition(handleUnLiked)}
    >
      <Button disabled={pending} variant="outline" size="sm">
        <ThumbsUp className="mr-2 h-4 w-4" />
        Unlike
      </Button>
    </ConfirmationModal>
  );
}
