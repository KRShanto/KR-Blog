import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, Eye } from "lucide-react";

export default function SavedPosts() {
  const savedPosts = [
    {
      id: 1,
      title: "10 Tips for Better Writing",
      excerpt: "Improve your writing skills with these simple tips...",
    },
    {
      id: 2,
      title: "The Future of AI",
      excerpt: "Exploring the potential impacts of artificial intelligence...",
    },
    {
      id: 3,
      title: "Healthy Eating Habits",
      excerpt:
        "Learn how to maintain a balanced diet and improve your health...",
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Saved Posts</CardTitle>
        <CardDescription>
          Your bookmarked articles for later reading.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {savedPosts.map((post) => (
            <div key={post.id} className="mb-4 rounded-lg border p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="mr-2">
                  <Eye className="mr-2 h-4 w-4" />
                  Read
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
