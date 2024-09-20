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
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import UnLikedButton from "./UnLikedButton";
import { unstable_cache } from "next/cache";

const getLikedPosts = unstable_cache(
  async (user) => {
    return await db.like.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: {
          select: {
            id: true,
            slug: true,
            title: true,
          },
        },
      },
    });
  },
  ["liked-post"],
  {
    tags: ["liked-post"],
  },
);
export default async function LikedPosts() {
  const session = await auth();
  const likedPosts = await getLikedPosts(session?.user);
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Liked Posts</CardTitle>
        <CardDescription>
          Articles you've enjoyed and appreciated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[400px] min-h-fit w-full overflow-y-auto">
          {likedPosts.length > 0 ? (
            likedPosts.map((likePost) => (
              <div key={likePost.id} className="mb-4 rounded-lg border p-4">
                <h3 className="text-lg font-semibold">{likePost.post.title}</h3>
                <p className="text-sm text-muted-foreground">By kr shanto</p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Link
                      className="flex items-center"
                      href={`/blog/post/${likePost.post.slug}`}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Read
                    </Link>
                  </Button>
                  <UnLikedButton likedId={likePost.id} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Not found</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
