"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import CopyToClipboard from "./CopyToClipboard";
import DeleteModal from "@/components/DeleteModal";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Post } from "@prisma/client";
import { deleteBlog } from "@/actions/blog/delete";

type TProps = {
  blog: Post;
};

export default function BlogActions({ blog }: TProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const hostUrl = process.env.NEXT_PUBLIC_APP_URL;
  const { toast } = useToast();

  const [error, setError] = useState(null);
  const handleDeleteBlog = async () => {
    try {
      await deleteBlog(blog.id);
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      setError(err.message);
    }
  };
  return (
    <div className="flex gap-3">
      {blog.published ? (
        <Link
          className={buttonVariants({
            variant: "outline",
            className: "h-[40px] w-[40px]",
          })}
          href={`/blog/post/${blog.id}`}
          style={{ padding: "0px" }}
        >
          <Eye size={20} />
        </Link>
      ) : (
        <Button className="h-[40px] w-[40px] p-0" variant="outline">
          <EyeOff size={20} />
        </Button>
      )}

      <CopyToClipboard copyText={`${hostUrl}/blog/post/${blog.id}`} />

      <Link
        className={buttonVariants({
          variant: "outline",
          className: "h-[40px] w-[40px]",
        })}
        style={{ padding: "0px" }}
        href={`/admin/blog/edit/${blog.id}`}
      >
        <Pencil size={20} />
      </Link>
      {/* blog delete modal */}
      <DeleteModal
        title="blog"
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        onDelete={handleDeleteBlog}
      />

      <Button
        onClick={() => setIsDeleteModalOpen(true)}
        type="submit"
        variant="outline"
        className="h-[40px] w-[40px] p-0"
      >
        <Trash2 size={20} />
      </Button>
    </div>
  );
}
