import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// if the query has a `slug` parameter, we'll assume it's a request for a single post
// else if the query has a `featured` parameter, we'll assume it's a request for featured posts
// otherwise, we'll assume it's a request for all posts

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const slug = search.get("slug");
  const featured = search.get("featured");
  const limit = search.get("limit");
  const categoryId = search.get("categoryId");
  const category = search.get("category");
  const notFeatured = search.get("notFeatured");
  const not = search.get("not") || undefined;

  if (slug) {
    const post = await db.post.findUnique({
      where: { slug, published: true, NOT: { slug: not } },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  }

  if (featured) {
    const posts = await db.post.findMany({
      where: { isFeatured: true, published: true, NOT: { slug: not } },
      take: 3,
    });

    return NextResponse.json(posts);
  }

  if (categoryId || category) {
    const posts = await db.post.findMany({
      where: {
        published: true,
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        category: category ? { slug: category } : undefined,
        NOT: { slug: not },
      },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(posts);
  }

  const posts = await db.post.findMany({
    where: {
      published: true,
      isFeatured: notFeatured ? false : true,
      NOT: { slug: not },
    },
    take: limit ? parseInt(limit) : undefined,
  });

  return NextResponse.json(posts);
}
