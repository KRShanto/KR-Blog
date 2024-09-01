import BlogPage from "./BlogPage";
import { getData } from "@/lib/getData";
import { CATEGORY_TAG, POST_TAG, SITE_NAME } from "@/lib/consts";
import { Category, Post } from "@prisma/client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Explore Our Latest Articles | ${SITE_NAME}`,
  description: `Stay updated with the latest articles from ${SITE_NAME}. Dive into a wide range of topics, from business growth and technology to web development and AI. Explore our collection of insightful posts and find the knowledge you need to succeed.`,
};

export default async function Page() {
  const posts = await getData<Post[]>("/api/posts", {
    tag: POST_TAG,
  });
  const categoris = await getData<Category[]>("/api/categories", {
    tag: CATEGORY_TAG,
  });

  return (
    <BlogPage
      posts={posts.data}
      categoris={categoris.data}
      selectedCategory={null}
    />
  );
}
