import { getCategories } from "@/actions/category/get";
import AddEditBlog from "../_component/AddEditBlog";

export const metadata = {
  title: "Create Blog",
};

export default async function BlogCreatePage() {
  const categories = await getCategories();
  return <AddEditBlog categories={categories} />;
}
