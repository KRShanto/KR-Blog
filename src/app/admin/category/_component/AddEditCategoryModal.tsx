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

type TProps = {
  fromEdit?: boolean;
  category?: Category;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddEditCategory({
  fromEdit,
  category,
  isModalOpen,
  setIsModalOpen,
}: TProps) {
  //  const handleAddCategory = () => {
  //    setCategories([...categories, { id: Date.now(), ...newCategory }]);
  //    setNewCategory({ name: "", slug: "" });
  //    setIsAddModalOpen(false);
  //  };

  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });

  const handleEditCategory = () => {
    //    if (currentCategory) {
    //      setCategories(
    //        categories.map((cat) =>
    //          cat.id === currentCategory.id ? { ...cat, ...newCategory } : cat,
    //        ),
    //      );
    //      setIsEditModalOpen(false);
    //    }
  };

  const handleAddCategory = () => {
    console.log(newCategory);
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
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
