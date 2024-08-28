import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import CopyToClipboard from "./CopyToClipboard";
import { deleteBlog } from "../actions";

type TProps = {
  blogId: number;
};

export default function BlogActions({ blogId }: TProps) {
  const hostUrl = process.env.NEXT_PUBLIC_APP_URL;
  const handleDelete = async () => {
    "use server";
    try {
      await deleteBlog(blogId);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <>
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={`/blog/post/${blogId}`}
      >
        <Eye size={24} />
      </Link>
      <CopyToClipboard copyText={`${hostUrl}/blog/post/${blogId}`} />
      <Link
        className={buttonVariants({ variant: "outline" })}
        href={`/admin/blog/edit/${blogId}`}
      >
        <Pencil size={24} />
      </Link>
      <form action={handleDelete}>
        <Button type="submit" variant="outline">
          <Trash2 size={24} />
        </Button>
      </form>
    </>
  );
}
