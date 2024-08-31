import { CATEGORY_TAG, POST_TAG } from "@/lib/consts";
import { getData } from "@/lib/getData";
import { Category, Post } from "@prisma/client";
import { MetadataRoute } from "next";

function siteUrl(rest: string) {
  const url = process.env.NEXT_PUBLIC_APP_URL;

  if (rest.startsWith("/")) {
    return `${url}${rest}`;
  }

  return `${url}/${rest}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl("/"),
      lastModified: today,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: siteUrl("/about"),
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: siteUrl("/contact"),
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: siteUrl("/blog"),
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // get all categories
  const categories = await getData<Category[]>("/api/categories", {
    tag: CATEGORY_TAG,
  });

  // Get all posts
  const posts = await getData<Post[]>("/api/posts", {
    tag: POST_TAG,
  });

  const categoryRoutes: MetadataRoute.Sitemap = categories.data.map(
    (category) => ({
      url: siteUrl(`/blog/cat/${category.slug}`),
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = posts.data.map((post) => ({
    url: siteUrl(`/blog/post/${post.slug}`),
    lastModified: new Date(post.updatedAt),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
