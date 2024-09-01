import BlogPage from "./BlogPage";
import { getData } from "@/lib/getData";
import { CATEGORY_TAG, POST_TAG } from "@/lib/consts";
import { Category, Post } from "@prisma/client";

export default async function Page() {
  const posts = await getData<Post[]>("/api/posts", {
    tag: POST_TAG,
  });
  const categoris = await getData<Category[]>("/api/categories", {
    tag: CATEGORY_TAG,
  });
  console.log({ posts });
  return (
    <BlogPage
      posts={posts.data}
      categoris={categoris.data}
      selectedCategory={null}
    />
  );
}
