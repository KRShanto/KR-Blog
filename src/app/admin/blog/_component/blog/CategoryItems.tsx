import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogData } from "../AddEditBlog";
import { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddEditCategory from "@/app/admin/category/_component/AddEditCategoryModal";
import { useState } from "react";

type TProps = {
  setBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  categories: Category[];
  fromEdit: boolean;
  selectedCategoryId: number;
};

export default function CategoryItems({
  fromEdit,
  setBlogData,
  categories,
  setCategories,
  selectedCategoryId,
}: TProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSelectChange = (value: string) => {
    setBlogData((prev) => ({ ...prev, categoryId: parseInt(value) }));
  };
  let category: Category | null = null;

  if (fromEdit && categories) {
    category =
      categories.find((category) => category.id === selectedCategoryId) || null;
  }
  return (
    <>
      <AddEditCategory
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setCategories={setCategories}
      />
      <div>
        <div className="mb-2 space-x-2">
          <Label htmlFor="category">Category</Label>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-7 space-x-1"
            variant="outline"
          >
            <span>Add New</span>
            <Plus size={13} />
          </Button>
        </div>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger value={category ? category?.id : ""}>
            <SelectValue
              placeholder={category ? category.name : "Select a category"}
            />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                 */}
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
