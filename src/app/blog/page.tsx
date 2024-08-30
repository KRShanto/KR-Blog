import { db } from "@/lib/db";
import BlogPage from "./BlogPage";

export default async function Page() {
  const posts = await db.post.findMany({
    where: {
      published: true,
    },
  });
  const categoris = await db.category.findMany();

  return (
    <BlogPage posts={posts} categoris={categoris} selectedCategory={null} />
  );
}
