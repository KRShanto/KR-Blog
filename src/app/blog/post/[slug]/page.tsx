import { auth } from "@/app/auth";
import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { POST_TAG } from "@/lib/consts";
import { db } from "@/lib/db";
import { getData } from "@/lib/getData";
import { Post } from "@prisma/client";
import { Avatar } from "@radix-ui/react-avatar";
import { Heart, Linkedin, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import Comments from "../../Comments";

export async function generateStaticParams() {
  const posts = await getData<Post[]>("/api/posts", {
    tag: POST_TAG,
  });
  return posts.data.map((post: Post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  const decodedSlug = decodeURIComponent(params.slug);
  const post = await getData<Post>("/api/posts", {
    query: { slug: decodedSlug },
    tag: POST_TAG,
  });

  if (post.status === 404) return notFound();

  const relatedPosts = await getData<Post[]>("/api/posts", {
    query: { categoryId: post.data.categoryId, limit: 2, not: post.data.slug },
    tag: POST_TAG,
  });
  const comments = await db.comment.findMany({
    where: { postId: post.data.id, authorId: session?.user.id },
    include: { author: true },
  });
  const isLiked = false; // Temporary value
  const likeCount = 5; // Temporary value

  // console.log("slug: ", decodedSlug);
  // console.log("Post: ", post);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <article className="mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-gray-100">
          {post.data.title}
        </h1>
        <Image
          src={post.data.image || "/default-image.jpg"}
          alt={post.data.imageAlt || "Post Image"}
          width={500}
          height={300}
          className="mb-6 w-full rounded-lg"
        />
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Published on {moment(post.data.createdAt).format("MMMM D, YYYY")} by{" "}
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
          className="prose w-full max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.data.content }}
        />
      </article>

      <Separator className="my-10" />

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Related Posts
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {relatedPosts.data.map((post, index) => (
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
      <Comments comments={comments} postId={post.data.id} />
    </div>
  );
}
