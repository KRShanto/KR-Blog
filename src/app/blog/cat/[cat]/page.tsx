// import React from "react";
// import BlogPage from "../../BlogPage";
// import { getData } from "@/lib/getData";
// import { Category, Post } from "@prisma/client";

// export async function generateStaticParams() {
//   const categories: Category[] = await getData("api/categories");

//   return categories.map((cat) => ({
//     cat: cat.slug,
//   }));
// }

// export default async function Page({ params }: { params: { cat: string } }) {
//   const posts: Post[] = await getData("api/posts", {
//     query: {
//       category: params.cat,
//     },
//   });

//   const categories: Category[] = await getData("api/categories");
//   const selectedCategory = categories.find((cat) => cat.slug === params.cat);

//   return (
//     <BlogPage
//       posts={posts}
//       categoris={categories}
//       selectedCategory={selectedCategory!}
//     />
//   );
// }

export default async function Page() {
  return <div></div>;
}
