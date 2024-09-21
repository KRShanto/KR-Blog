import { Button } from "@/components/ui/button";
import getFormattedDate from "@/lib/getFormattedDate";
import { Comment, Post } from "@prisma/client";
import Link from "next/link";

type CommentCardProps = {
  comment: Comment & { post: Partial<Post> };
};

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div key={comment.id} className="mb-4 rounded-lg border p-4">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-lg font-semibold">{comment.post.title}</h3>
        <span className="text-sm text-muted-foreground">
          {getFormattedDate(new Date(comment.createdAt))}
        </span>
      </div>
      <p className="mb-2 text-sm">{comment.content}</p>
      <div className="flex space-x-2">
        <Link
          scroll={false}
          href={`/blog/post/${comment.post.slug}?commentId=${comment.id}`}
        >
          <Button variant="outline" size="sm">
            Read comment
          </Button>
        </Link>
      </div>
    </div>
  );
}
