"use client";
import { Category } from "@prisma/client";
import { useState } from "react";
import AddEditCategory from "./AddEditCategoryModal";
import DeleteModal from "@/components/DeleteModal";
import CategoryTable from "./CategoryTable";
import CategoryHead from "./CategoryHead";
import { deleteCategory } from "../actions";
import { useToast } from "@/components/ui/use-toast";

type TProps = {
  categoryItems?: Category[];
};

export default function CategoryContainer({ categoryItems }: TProps) {
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>(
    categoryItems ? categoryItems : [],
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [error, setError] = useState(null);

  const handleDeleteCategory = async (categoryId: number) => {
    console.log(categoryId);
    try {
      await deleteCategory(categoryId);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId),
      );
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
      setError(err.message);
    }
  };
  return (
    <>
      <CategoryHead setIsAddModalOpen={setIsAddModalOpen} />

      {/* Categories Table */}
      <CategoryTable
        categories={categories}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setEditCategory={setEditCategory}
        setCategoryId={setCategoryId}
      />

      {/* add category modal */}
      {isAddModalOpen && (
        <AddEditCategory
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          setCategories={setCategories}
        />
      )}

      {/* edit category modal */}
      {isEditModalOpen && (
        <AddEditCategory
          fromEdit
          category={editCategory!}
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
          setCategories={setCategories}
        />
      )}

      {/* Delete Category Modal */}
      <DeleteModal
        onDelete={() => handleDeleteCategory(categoryId!)}
        title="Category"
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </>
  );
}
