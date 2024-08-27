"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Heart,
  Linkedin,
  MessageCircle,
  Share2,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [likeCount, setLikeCount] = useState(42);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Jane Smith",
      date: "March 16, 2024",
      content:
        "Great article! I'm particularly excited about the potential of Web Assembly. Can't wait to see how it transforms web development in the coming years.",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Current User", // In a real app, this would be the logged-in user's name
        date: new Date().toLocaleDateString(),
        content: newComment.trim(),
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl dark:prose-invert mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
          The Future of Web Development: Trends to Watch in 2024
        </h1>
        <Image
          src="/image.jpg"
          alt="Featured image"
          width={800}
          height={400}
          className="mb-6 w-full rounded-lg"
        />
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Published on March 15, 2024
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={handleLike}>
              <Heart
                className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`}
              />
            </Button>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {likeCount} likes
            </span>
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
          </div>
        </div>
        <p className="mb-8 text-sm text-gray-700 dark:text-gray-400 sm:text-base md:text-lg">
          As we move further into 2024, the landscape of web development
          continues to evolve at a rapid pace. From new frameworks to innovative
          design paradigms, developers are constantly adapting to meet the
          demands of modern web applications. In this post, we'll explore some
          of the most exciting trends that are shaping the future of web
          development.
        </p>
        <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl">
          1. The Rise of AI-Assisted Development
        </h2>
        <p className="mb-8 text-sm text-gray-700 dark:text-gray-400 sm:text-base md:text-lg">
          Artificial Intelligence is no longer just a buzzword in web
          development. It's becoming an integral part of the development
          process, from code generation to bug detection and even UX design
          suggestions.
        </p>
        <h2 className="mb-6 text-lg font-bold text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl">
          2. Web Assembly and the Future of Browser-Based Applications
        </h2>
        <p className="mb-8 text-sm text-gray-700 dark:text-gray-400 sm:text-base md:text-lg">
          Web Assembly (Wasm) is gaining traction, allowing developers to run
          high-performance applications in the browser. This technology is
          opening up new possibilities for complex web applications that were
          previously only possible in native environments.
        </p>
      </article>

      <Separator className="my-10" />

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Related Posts
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Image
                  src={`/image.jpg`}
                  alt={`Related Post ${i}`}
                  width={400}
                  height={200}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-gray-900 dark:text-gray-100">
                  Related Post {i}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  A brief preview of another interesting article...
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`#related-post-${i}`}>Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

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
                    src="/placeholder-avatar.jpg"
                    alt={comment.author}
                  />
                  <AvatarFallback>
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {comment.author}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {comment.date}
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
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2"
          />
          <Button type="submit">Post Comment</Button>
        </form>
      </section>
    </div>
  );
}
