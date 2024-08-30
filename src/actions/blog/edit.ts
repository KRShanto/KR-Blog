"use server";
import { POST_TAG } from "@/lib/consts";
import { db } from "@/lib/db";
import { revalidateTag } from "next/cache";

interface CreateBlogData {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageAttribution: string;
  keywords: string[];
  content: string;
  categoryId: number;
  published: boolean;
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
}
export async function EditBlog(blogId: number, data: CreateBlogData) {
  try {
    await db.post.update({
      where: { id: blogId },
      data: {
        title: data.title,
        seoTitle: data.seoTitle,
        description: data.description,
        seoDescription: data.seoDescription,
        image: data.image,
        imageAlt: data.imageAlt,
        imageAttribution: data.imageAttribution,
        keywords: {
          set: data.keywords,
        },
        content: data.content,
        categoryId: data.categoryId,
        published: data.published,
        isFeatured: data.isFeatured,
        slug: data.title.toLowerCase().replace(/ /g, "-"),
      },
    });

    revalidateTag(POST_TAG);
  } catch (error) {
    console.error(error);

    return {
      type: "error",
      message: "Something went wrong",
    };
  }

  return {
    type: "success",
    message: "Blog created successfully",
  };
}
