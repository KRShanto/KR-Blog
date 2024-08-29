import Image from "next/image";
import Link from "next/link";
import CategoryOpenButton from "./CategoryOpenButton";
import { Button } from "@/components/ui/button";
import Categories from "./Categories";
import { Category, Post } from "@prisma/client";

export default async function BlogPage({
  posts,
  categoris,
  selectedCategory,
}: {
  posts: Post[];
  categoris: Category[];
  selectedCategory: Category | null;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">Our Blog</h1>

      <CategoryOpenButton />

      <div className="flex flex-col gap-8 lg:flex-row">
        <Categories
          categories={categoris}
          selectedCategory={selectedCategory}
        />

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-lg border p-3 shadow-md"
              >
                <Image
                  src={post.image || "/default-image.jpg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                  <p className="mb-4 text-gray-600">{post.description}</p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button>Read more</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
