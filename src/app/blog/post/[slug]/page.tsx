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
import { db } from "@/lib/db";
import { Heart, Linkedin, Share2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebook, FaTwitter } from "react-icons/fa";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await db.post.findUnique({
    where: {
      slug: params.slug,
      published: true,
    },
  });

  if (!post) return notFound();

  const relatedPosts = await db.post.findMany({
    where: {
      categoryId: post.categoryId,
      published: true,
    },
    take: 2,
  });

  const isLiked = false; // Temporary value
  const likeCount = 5; // Temporary value

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <article className="mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        <Image
          src={post.image || "/default-image.jpg"}
          alt={post.imageAlt || "Post Image"}
          width={500}
          height={300}
          className="mb-6 w-full rounded-lg"
        />
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Published on {moment(post.createdAt).format("MMMM D, YYYY")} by{" "}
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon">
              <Heart
                className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`}
              />
            </Button>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {likeCount} likes
            </span>
            <Button variant="outline" size="icon">
              <FaFacebook className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
            <Button variant="outline" size="icon">
              <FaTwitter className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4 text-gray-900 dark:text-gray-100" />
            </Button>
          </div>
        </div>
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <Separator className="my-10" />

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Related Posts
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {relatedPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <Image
                  src={post.image || "/default-image.jpg"}
                  alt={post.imageAlt || "Post Image"}
                  width={400}
                  height={200}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-gray-900 dark:text-gray-100">
                  {post.title}
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-400">
                  {post.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href={`/blog/post/${post.slug}`}>Read more</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* TODO */}
      {/* <section className="mb-10">
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
      </section> */}
    </div>
  );
}
