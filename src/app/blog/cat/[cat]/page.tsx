import React from "react";
import BlogPage from "../../BlogPage";
import { getData } from "@/lib/getData";
import { Category, Post } from "@prisma/client";

export async function generateStaticParams() {
  const categories = await getData<Category[]>("api/categories");

  return categories.data.map((cat) => ({
    cat: cat.slug,
  }));
}

export default async function Page({ params }: { params: { cat: string } }) {
  const decodedSlug = decodeURIComponent(params.cat);

  const posts = await getData<Post[]>("api/posts", {
    query: {
      category: decodedSlug,
    },
  });

  const categories = await getData<Category[]>("api/categories");
  const selectedCategory = categories.data.find(
    (cat) => cat.slug === params.cat,
  );

  return (
    <BlogPage
      posts={posts.data}
      categoris={categories.data}
      selectedCategory={selectedCategory!}
    />
  );
}
