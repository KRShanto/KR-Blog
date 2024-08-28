"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import CopyToClipboard from "./CopyToClipboard";
import { deleteBlog } from "../actions";
import DeleteModal from '@/components/DeleteModal'
import { useState } from "react";

type TProps = {
  blogId: number;
};

export default function BlogActions({ blogId }: TProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const hostUrl = process.env.NEXT_PUBLIC_APP_URL;

  const [error, setError] = useState(null);
  const handleDeleteBlog = async () => {
    try {
      await deleteBlog(blogId);
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <>
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "h-[40px] w-[40px]",
        })}
        href={`/blog/post/${blogId}`}
        style={{ padding: "0px" }}
      >
        <Eye size={24} />
      </Link>
      <CopyToClipboard copyText={`${hostUrl}/blog/post/${blogId}`} />
      <Link
        className={buttonVariants({
          variant: "outline",
          className: "h-[40px] w-[40px]",
        })}
        style={{ padding: "0px" }}
        href={`/admin/blog/edit/${blogId}`}
      >
        <Pencil size={24} />
      </Link>
      {/* blog delete modal */}
      <DeleteModal title="blog" isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} onDelete={handleDeleteBlog} />
      <Button
        onClick={() => setIsDeleteModalOpen(true)}
        type="submit"
        variant="outline"
        className="h-[40px] w-[40px] p-0"
      >
        <Trash2 size={24} />
      </Button>
    </>
  );
}
