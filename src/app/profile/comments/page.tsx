import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Comments() {
  const comments = [
    {
      id: 1,
      postTitle: "The Future of AI",
      content: "Great article! Very informative.",
      date: "2023-06-15",
    },
    {
      id: 2,
      postTitle: "10 Tips for Better Writing",
      content: "I found point #3 particularly helpful. Thanks!",
      date: "2023-06-10",
    },
    {
      id: 3,
      postTitle: "Sustainable Living",
      content: "Could you elaborate more on the second point?",
      date: "2023-06-05",
    },
  ];

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
            <div key={comment.id} className="mb-4 rounded-lg border p-4">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-lg font-semibold">{comment.postTitle}</h3>
                <span className="text-sm text-muted-foreground">
                  {comment.date}
                </span>
              </div>
              <p className="mb-2 text-sm">{comment.content}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
