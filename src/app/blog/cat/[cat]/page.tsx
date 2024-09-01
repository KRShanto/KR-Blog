import React from "react";
import BlogPage from "../../BlogPage";
import { getData } from "@/lib/getData";
import { Category, Post } from "@prisma/client";
import { CATEGORY_TAG, POST_TAG } from "@/lib/consts";

export async function generateStaticParams() {
  const categories = await getData<Category[]>("api/categories", {
    tag: CATEGORY_TAG,
  });
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
    tag: POST_TAG,
  });

  const categories = await getData<Category[]>("api/categories", {
    tag: CATEGORY_TAG,
  });
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
