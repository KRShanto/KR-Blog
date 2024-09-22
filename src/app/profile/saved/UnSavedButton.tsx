"use client";

import { unSavedPost } from "@/actions/saved/unSavedPost";
import ConfirmationModal from "@/components/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark } from "lucide-react";
import { useTransition } from "react";

export default function UnSavedButton({ savedId }: { savedId: number }) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const handleUnSavedPost = async () => {
    try {
      const res = await unSavedPost(savedId);
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
      title="Are you Sure UnSave This Post?"
      description="UnSave Post confirmation!!"
      onConfirm={() => startTransition(handleUnSavedPost)}
    >
      <Button disabled={pending} variant="outline" size="sm">
        <Bookmark className="mr-2 h-4 w-4" />
        Remove
      </Button>
    </ConfirmationModal>
  );
}
