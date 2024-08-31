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
import { cn } from "@/lib/utils";

const font = Outfit({ subsets: ["latin"] });

const colors = [
  ["rgba(0, 0, 255, 0.2)", "rgba(0, 0, 255, 1)"], // blue
  ["rgba(0, 128, 0, 0.2)", "rgba(0, 128, 0, 1)"], // green
  ["rgba(255, 255, 0, 0.2)", "rgba(255, 255, 0, 1)"], // yellow
  ["rgba(128, 0, 128, 0.2)", "rgba(128, 0, 128, 1)"], // purple
  ["rgba(255, 165, 0, 0.2)", "rgba(255, 165, 0, 1)"], // orange
  ["rgba(0, 128, 128, 0.2)", "rgba(0, 128, 128, 1)"], // teal
  ["rgba(0, 255, 255, 0.2)", "rgba(0, 255, 255, 1)"], // cyan
  ["rgba(0, 255, 0, 0.2)", "rgba(0, 255, 0, 1)"], // lime
  ["rgba(80, 200, 120, 0.2)", "rgba(80, 200, 120, 1)"], // emerald
  ["rgba(255, 0, 255, 0.2)", "rgba(255, 0, 255, 1)"], // fuchsia
  ["rgba(255, 0, 127, 0.2)", "rgba(255, 0, 127, 1)"], // rose
];

// Function to shuffle the colors array
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default async function Page() {
  const featuredPosts = await getData<Post[]>("/api/posts", {
    query: { featured: true },
    tag: POST_TAG,
  });

  const posts = await getData<Post[]>("/api/posts", {
    query: { notFeatured: true, limit: 6 },
    tag: POST_TAG,
  });

  const categories = await getData<Category[]>("/api/categories", {
    tag: CATEGORY_TAG,
  });

  // Shuffle the colors array
  const shuffledColors = shuffleArray([...colors]);

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
            {featuredPosts.data.length > 0 && (
              <Card className="md:col-span-2 lg:row-span-2">
                <CardHeader>
                  <Image
                    src={featuredPosts.data[0].image || "default-image.jpg"}
                    alt={featuredPosts.data[0].imageAlt}
                    className="mx-auto w-full rounded-lg object-cover md:mx-0"
                    height={300}
                    width={800}
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl sm:text-2xl">
                    {featuredPosts.data[0].title}
                  </CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    {featuredPosts.data[0].description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:px-4 sm:py-2 sm:text-sm"
                    href={`/blog/post/${featuredPosts.data[0].slug}`}
                  >
                    Read More
                  </Link>
                </CardFooter>
              </Card>
            )}
            {featuredPosts.data.length > 1 &&
              featuredPosts.data.slice(1).map((post, i) => (
                <Card key={i} className="flex flex-col">
                  <CardHeader>
                    <Image
                      src={post.image || "default-image.jpg"}
                      alt={post.imageAlt}
                      className="mx-auto w-full rounded-lg object-cover md:mx-0"
                      height={150}
                      width={300}
                    />
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
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
      <section className="w-full bg-muted py-8 sm:py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tighter sm:mb-8 sm:text-4xl md:text-5xl">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {categories.data.map((category, index) => {
              // select random color
              const color = shuffledColors[index % shuffledColors.length];

              return (
                <Link
                  key={category.id}
                  className="flex items-center justify-center gap-2 text-nowrap rounded-md border p-5 text-lg font-medium transition-transform duration-300 ease-in-out hover:scale-105"
                  href={`/blog/cat/${category.slug}`}
                  style={{
                    backgroundColor: color[0],
                    borderColor: color[1],
                  }}
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: color[1],
                    }}
                  ></div>
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="mb-6 text-center text-2xl font-bold tracking-tighter sm:mb-8 sm:text-4xl md:text-5xl">
            More Posts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {posts.data.map((post, i) => (
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
