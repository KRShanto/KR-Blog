import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewsLetter from "./NewsLetter";
import Logo from "@/components/Logo";
import { Outfit } from "next/font/google";
import { getData } from "@/lib/getData";
import { Category, Post } from "@prisma/client";
import { CATEGORY_TAG, POST_TAG } from "@/lib/consts";

const font = Outfit({ subsets: ["latin"] });

export default async function Page() {
  const featuredPosts: Post[] = await getData("/api/posts", {
    query: { featured: true },
    tag: POST_TAG,
  });

  const posts: Post[] = await getData("/api/posts", {
    query: { notFeatured: true, limit: 6 },
    tag: POST_TAG,
  });

  const categories: Category[] = await getData("/api/categories", {
    tag: CATEGORY_TAG,
  });

  return (
    <main className="flex-1">
      <section className="w-full py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <h1 className="text-center text-5xl font-bold">
            Welcome to <Logo />
          </h1>

          <p
            className="mt-3 text-center text-3xl dark:text-slate-300"
            style={font.style}
          >
            Your ultimate source to supercharge your business.
          </p>

          <div className="mt-3 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="md:col-span-2 lg:row-span-2">
              <CardHeader>
                <Image
                  src={featuredPosts[0].image || "default-image.jpg"}
                  alt={featuredPosts[0].imageAlt}
                  className="mx-auto w-full rounded-lg object-cover md:mx-0"
                  height={300}
                  width={800}
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl sm:text-2xl">
                  {featuredPosts[0].title}
                </CardTitle>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                  {featuredPosts[0].description}
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
                  href={`/blog/post/${featuredPosts[0].slug}`}
                >
                  Read More
                </Link>
              </CardFooter>
            </Card>
            {[1, 2].map(
              (i) =>
                featuredPosts[i] && (
                  <Card key={i} className="flex flex-col">
                    <CardHeader>
                      <Image
                        src={featuredPosts[i].image || "default-image.jpg"}
                        alt={featuredPosts[i].imageAlt}
                        className="mx-auto w-full rounded-lg object-cover md:mx-0"
                        height={150}
                        width={300}
                      />
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardTitle className="text-lg">
                        {featuredPosts[i].title}
                      </CardTitle>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {featuredPosts[i].description}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        href={`/blog/post/${featuredPosts[i].slug}`}
                      >
                        Read More
                      </Link>
                    </CardFooter>
                  </Card>
                ),
            )}
          </div>
        </div>
      </section>
      <section className="w-full bg-muted py-8 sm:py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-6 text-2xl font-bold tracking-tighter sm:mb-8 sm:text-4xl md:text-5xl">
            Categories
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
                href={`/blog/cat/${category.slug}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="l mb-6 text-2xl font-bold tracking-tighter sm:mb-8 sm:text-4xl md:text-5xl">
            More Posts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Card key={i}>
                <CardHeader>
                  <Image
                    src={post.image || "default-image.jpg"}
                    alt={post.imageAlt}
                    className="mx-auto w-full rounded-lg object-cover md:mx-0"
                    height={200}
                    width={400}
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{post.title}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {post.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
                    href={`/blog/post/${post.slug}`}
                  >
                    Read More
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <NewsLetter />
    </main>
  );
}
