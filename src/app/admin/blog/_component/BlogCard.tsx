import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

import bOne from "@/../public/b-one.avif";
import { Post } from "@prisma/client";
import BlogActions from "./BlogActions";
type TProps = {
  blog: Partial<Post>;
};
export default function BlogCard({ blog }: TProps) {
  return (
    <Card className="max-h-[300px] overflow-auto md:col-span-2 lg:row-span-2">
      <div className="flex items-start justify-center">
        <CardHeader className="shrink">
          <Image
            src={bOne}
            alt="Another image"
            className="mx-auto size-40 rounded-lg object-cover md:mx-0"
          />
        </CardHeader>
        <CardContent className="flex-1 p-5">
          <CardTitle className="text-xl sm:text-2xl">{blog?.title}</CardTitle>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground sm:text-base">
            {blog?.description}
          </p>
        </CardContent>
      </div>
      <CardFooter className="flex items-center space-x-2">
        <BlogActions blogId={blog?.id!} />
      </CardFooter>
    </Card>
  );
}
