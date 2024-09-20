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
import { Eye } from "lucide-react";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import UnSavedButton from "./UnSavedButton";

const getSavedPosts = unstable_cache(
  async (userId: number) => {
    const savedPosts = await db.savedPost.findMany({
      where: { userId },
      include: {
        post: {
          select: {
            title: true,
            seoDescription: true,
            slug: true,
          },
        },
      },
    });

    return savedPosts;
  },
  ["saved-posts"],
  {
    tags: ["saved-posts"],
  },
);

export default async function SavedPosts() {
  const session = await auth();
  const savedPosts = await getSavedPosts(session?.user?.id!);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Saved Posts</CardTitle>
        <CardDescription>
          Your bookmarked articles for later reading.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[400px] min-h-fit w-full overflow-y-auto">
          {savedPosts.length > 0 ? (
            savedPosts.map((savePost) => (
              <div key={savePost.id} className="mb-4 rounded-lg border p-4">
                <h3 className="text-lg font-semibold">{savePost.post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {savePost.post.seoDescription}
                </p>
                <div className="mt-2">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Link
                      className="flex items-center"
                      href={`/blog/post/${savePost.post.slug}`}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Read
                    </Link>
                  </Button>
                  <UnSavedButton savedId={savePost.id} />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Not Found</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
