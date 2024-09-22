"use client";
import { savedPost } from "@/actions/saved/savedPost";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark } from "lucide-react";
import { useTransition } from "react";

export default function SaveButton({
  isSaved,
  postId,
}: {
  isSaved: boolean;
  postId: number;
}) {
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  async function handleSave() {
    const res = await savedPost({ postId });

    if (res.type === "error") {
      toast({
        title: "Cannot save post",
        description: res.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: res.message,
      });
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => startTransition(handleSave)}
      disabled={pending}
    >
      <Bookmark
        className={`h-4 w-4 ${isSaved ? "fill-current text-green-500" : ""}`}
      />
    </Button>
  );
}
