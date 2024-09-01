import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Comment, User } from "@prisma/client";
import { MessageCircle } from "lucide-react";
import CommentBox from "./CommentBox";
import getFormattedDate from "@/lib/getFormattedDate";

type TProps = {
  postId: number;
  comments: (Comment & { author: User })[];
};
export default function Comments({ comments, postId }: TProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Comments
      </h2>
      {comments.map((comment) => (
        <Card key={comment.id} className="mb-6">
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
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {comment.author?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getFormattedDate(comment.createdAt)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-400">
              {comment.content}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-2 h-4 w-4" />
              Reply
            </Button>
          </CardFooter>
        </Card>
      ))}
      <CommentBox postId={postId} />
    </section>
  );
}
