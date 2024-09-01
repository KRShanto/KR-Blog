import { db } from "@/lib/db";
import CategoryContainer from "./_component/CategoryContainer";

export const metadata = {
  title: "All Categories",
};

export default async function CategoryPage() {
  const categories = await db.category.findMany();
  return (
    <main className="flex-1 overflow-auto p-4 md:p-8">
      <CategoryContainer categoryItems={categories} />
    </main>
  );
}
