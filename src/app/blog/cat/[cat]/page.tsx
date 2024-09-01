import React from "react";
import BlogPage from "../../BlogPage";
import { getData } from "@/lib/getData";
import { Category, Post } from "@prisma/client";
import { CATEGORY_TAG, POST_TAG, SITE_NAME } from "@/lib/consts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getData<Category[]>("api/categories", {
    tag: CATEGORY_TAG,
  });
  return categories.data.map((cat) => ({
    cat: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { cat: string };
}): Promise<Metadata> {
  const categories = await getData<Category[]>("api/categories", {
    tag: CATEGORY_TAG,
  });
  const category = categories.data.find((cat) => cat.slug === params.cat);

  if (!category) return notFound();

  return {
    title: `Explore ${category?.name} Articles | ${SITE_NAME}`,
    description: `Discover in-depth articles and insights on ${category?.name} at ${SITE_NAME}. Stay informed with the latest trends, tips, and knowledge to excel in this field. Browse our curated content and enhance your understanding of ${category.name}.`,
  };
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
