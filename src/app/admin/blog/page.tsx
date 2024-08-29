import { db } from "@/lib/db";
import BlogCard from "./_component/BlogCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const blogPosts = await db.post.findMany();

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100 md:mb-0">
          Blog Posts
        </h1>
        <Link href="/admin/blog/create" className="w-full md:w-auto">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Post
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((blog) => (
          <BlogCard key={blog.id} blog={blog} role="ADMIN" />
        ))}
      </div>
    </main>
  );
}
