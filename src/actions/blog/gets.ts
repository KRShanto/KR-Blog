"use server";

import { db } from "@/lib/db";

export async function getBlogsById(blogId: number) {
  try {
    const blog = await db.post.findUnique({
      where: { id: blogId },
    });
    return blog;
  } catch (err: any) {
    throw new Error(err);
  }
}
