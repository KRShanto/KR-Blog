import Image from "next/image";
import React from "react";
import { Post } from "@prisma/client";
import BlogActions from "./BlogActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type TProps = {
  blog: Partial<Post>;
  role: "ADMIN" | "USER";
};

export default function BlogCard({ blog, role }: TProps) {
  return (
    <div
      key={blog.id}
      className="overflow-hidden rounded-lg border p-3 shadow-md"
    >
      <Image
        src={blog.image || "/default-image.jpg"}
        alt={blog.imageAlt || "Blog Image"}
        width={300}
        height={200}
        className="h-48 w-full rounded-t-lg object-cover"
      />
      <div className="p-6">
        <h2 className="mb-2 text-xl font-semibold">{blog.title}</h2>
        <p className="mb-4 text-gray-600">{blog.description}</p>
        <Link href={`/blog/${blog.slug}`}>
          <Button>Read more</Button>
        </Link>
      </div>

      {role === "ADMIN" && <BlogActions blogId={blog.id!} />}
    </div>
  );
}
