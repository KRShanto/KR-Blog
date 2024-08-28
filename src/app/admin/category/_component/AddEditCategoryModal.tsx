import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";
import { useState } from "react";
import { addCategory, editCategory } from "../actions";

type TProps = {
  fromEdit?: boolean;
  category?: Category;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export default function AddEditCategory({
  fromEdit,
  category,
  isModalOpen,
  setIsModalOpen,
  setCategories,
}: TProps) {
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState(
    fromEdit && category
      ? { name: category.name, slug: category.slug }
      : { name: "", slug: "" },
  );

  // edit category handler
  const handleEditCategory = async () => {
    try {
      if (fromEdit && category) {
        const response = await editCategory(category?.id, newCategory);
        console.log(response.category);
        if (response?.status === 200) {
          setCategories((prevCategories) =>
            prevCategories.map((prevCategory) => {
              if (prevCategory.id === response.category.id) {
                return response.category;
              } else {
                return prevCategory;
              }
            }),
          );
          setIsModalOpen(false);
        }
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // add category handler
  const handleAddCategory = async () => {
    try {
      if (!newCategory.name || !newCategory.slug) {
        setError("Name and slug are required");
        return;
      }
      console.log(newCategory);
      const response = await addCategory(newCategory);
      if (response?.status === 201) {
        setCategories((prevCategory) => [...prevCategory, response.category]);
        setIsModalOpen(false);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {error && (
            <p className="py-1 text-center text-sm text-red-500">{error}</p>
          )}
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {fromEdit ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="edit-name"
              className="text-right text-gray-900 dark:text-gray-100"
            >
              Name
            </Label>
            <Input
              id="edit-name"
              required
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="edit-slug"
              className="text-right text-gray-900 dark:text-gray-100"
            >
              Slug
            </Label>
            <Input
              id="edit-slug"
              value={newCategory.slug}
              required
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  slug: e.target.value.toLowerCase().replace(/ /g, "-"),
                })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={fromEdit ? handleEditCategory : handleAddCategory}
          >
            {fromEdit ? "Save Changes" : "Add Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}