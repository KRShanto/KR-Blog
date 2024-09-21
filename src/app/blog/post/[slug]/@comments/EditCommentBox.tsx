import { updateComment } from "@/actions/comment/update";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Comment } from "@prisma/client";
import { useState } from "react";

type TProps = {
  comment: Partial<Comment>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function EditCommentBox({ comment, setIsEdit }: TProps) {
  const [content, setContent] = useState(comment.content || "");
  const { toast } = useToast();
  const handleEditComment = async () => {
    try {
      const response = await updateComment(comment?.id!, 1, content);
      if (response.status === 200) {
        toast({
          variant: "default",
          description: "Comment updated successfully",
        });
        setIsEdit(false);
      } else {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Error updating comment",
        description: err.message,
      });
    }
  };
  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 min-h-[80px]"
            placeholder="Write your reply..."
          />
          <div className="mt-2 flex justify-end gap-2">
            <Button onClick={() => setIsEdit(false)} variant="ghost">
              Cancel
            </Button>
            <Button onClick={handleEditComment}>Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
