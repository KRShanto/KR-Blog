import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Post } from "@prisma/client";
import BlogActions from "./BlogActions";
import { ROLES } from "@/lib/consts";
type TProps = {
  blog: Partial<Post>;
  role: "ADMIN" | "USER"; // Add your role type here
};
export default function BlogCard({ blog, role }: TProps) {
  return (
    <Card className="max-h-[250px] overflow-auto md:col-span-2 lg:row-span-2">
      <div className="flex items-start justify-center">
        <CardHeader className="shrink">
          <Image
            src={blog.image ? blog.image : "/default-image.jpg"}
            alt="Another image"
            className="mx-auto size-20 rounded-lg object-cover sm:size-32 md:mx-0"
            width={200}
            height={200}
          />
        </CardHeader>
        <CardContent className="flex-1 p-5">
          <CardTitle className="line-clamp-1 text-xl sm:text-2xl">
            {blog?.title}
          </CardTitle>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground sm:text-base">
            {blog?.description}
          </p>
        </CardContent>
      </div>
      {role === ROLES.admin && (
        <CardFooter className="flex items-center space-x-2">
          <BlogActions blogId={blog?.id!} />
        </CardFooter>
      )}
    </Card>
  );
}
