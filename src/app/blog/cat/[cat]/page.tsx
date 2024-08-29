import React from "react";
import BlogPage from "../../BlogPage";
import { db } from "@/lib/db";

export default async function Page({ params }: { params: { cat: string } }) {
  const posts = await db.post.findMany({
    where: {
      category: {
        slug: params.cat,
      },
    },
  });

  const categoris = await db.category.findMany();
  const selectedCategory = categoris.find((cat) => cat.slug === params.cat);

  return (
    <BlogPage
      posts={posts}
      categoris={categoris}
      selectedCategory={selectedCategory!}
    />
  );
}
