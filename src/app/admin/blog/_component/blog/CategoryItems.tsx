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

type TProps = {
  setBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
  categories: Category[];
  fromEdit: boolean;
  selectedCategoryId: number;
};

export default function CategoryItems({
  fromEdit,
  setBlogData,
  categories,
  selectedCategoryId,
}: TProps) {
  const handleSelectChange = (value: string) => {
    setBlogData((prev) => ({ ...prev, categoryId: parseInt(value) }));
  };
  let category: Category | null = null;

  if (fromEdit && categories) {
    category =
      categories.find((category) => category.id === selectedCategoryId) || null;
  }
  return (
    <div>
      <Label htmlFor="category">Category</Label>
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
  );
}
