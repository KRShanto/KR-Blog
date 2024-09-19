import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, ThumbsUp } from "lucide-react";

export default function LikedPosts() {
  const likedPosts = [
    { id: 1, title: "The Rise of Quantum Computing", author: "Alice Johnson" },
    { id: 2, title: "Sustainable Living in Urban Areas", author: "Bob Smith" },
    {
      id: 3,
      title: "The Impact of Social Media on Mental Health",
      author: "Charlie Brown",
    },
  ];

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Liked Posts</CardTitle>
        <CardDescription>
          Articles you've enjoyed and appreciated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          {likedPosts.map((post) => (
            <div key={post.id} className="mb-4 rounded-lg border p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-muted-foreground">By {post.author}</p>
              <div className="mt-2">
                <Button variant="outline" size="sm" className="mr-2">
                  <Eye className="mr-2 h-4 w-4" />
                  Read
                </Button>
                <Button variant="outline" size="sm">
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Unlike
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
