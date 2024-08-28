"use client";
import { Category } from "@prisma/client";
import { useState } from "react";
import AddEditCategory from "./AddEditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import CategoryTable from "./CategoryTable";
import CategoryHead from "./CategoryHead";

type TProps = {
  categoryItems?: Category[];
};

export default function CategoryContainer({ categoryItems }: TProps) {
  const [categories, setCategories] = useState<Category[]>(
    categoryItems ? categoryItems : [],
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

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
      <DeleteCategoryModal
              categoryId={categoryId!}
              isDeleteModalOpen={isDeleteModalOpen}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setCategories={setCategories}
      />
    </>
  );
}
