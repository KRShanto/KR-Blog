import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { deleteCategory } from "../actions";
import { Category } from "@prisma/client";

type TProps = {
  categoryId: number;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export default function DeleteCategoryModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  categoryId,
  setCategories,
}: TProps) {
  const [error, setError] = useState(null);
  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId),
      );
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {error && (
            <p className="py-1 text-center text-sm text-red-500">{error}</p>
          )}
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Delete Category
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-900 dark:text-gray-100">
          Are you sure you want to delete this category?
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
