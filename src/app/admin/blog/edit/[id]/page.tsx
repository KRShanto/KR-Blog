import { getCategories } from "@/actions/category/get";
import AddEditBlog from "../../_component/AddEditBlog";
import { getBlogsById } from "@/actions/blog/gets";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Blog",
};

type TProps = {
  params: { id: string };
};

export default async function BlogEditPage({ params: { id } }: TProps) {
  const categories = await getCategories();
  const blog = await getBlogsById(parseInt(id));
  return <AddEditBlog fromEdit categories={categories} blog={blog!} />;
}
