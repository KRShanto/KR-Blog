import { auth } from "@/app/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import CommentCard from "./CommentCard";

const getComments = unstable_cache(
  async (userId: number) => {
    const comments = await db.comment.findMany({
      where: { authorId: userId },
      include: {
        post: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });
    return comments;
  },
  ["comments"],
  {
    tags: ["comments"],
  },
);

export default async function Comments() {
  const session = await auth();
  const comments = await getComments(session?.user?.id!);
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Your Comments</CardTitle>
        <CardDescription>
          Manage your comments on various posts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
