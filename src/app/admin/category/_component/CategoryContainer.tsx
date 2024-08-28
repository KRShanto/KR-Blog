"use client";
import { Category } from "@prisma/client";
import { useState } from "react";
import AddEditCategory from "./AddEditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import CategoryTable from "./CategoryTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoryHead from "./CategoryHead";

type TProps = {
  categoryItems?: Category[];
};

export default function CategoryContainer({ categoryItems }: TProps) {
  const [categories, setCategories] = useState<Category[]>(
    categoryItems || [
      { id: 1, name: "Technology", slug: "technology" },
      { id: 2, name: "Travel", slug: "travel" },
      { id: 3, name: "Food", slug: "food" },
    ],
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });
  return (
    <>
      <CategoryHead setIsAddModalOpen={setIsAddModalOpen} />

      {/* Categories Table */}
      <CategoryTable
        categories={categories}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      {/* edit category */}
      {isAddModalOpen && (
        <AddEditCategory
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
        />
      )}

      {/* add category */}
      {isEditModalOpen && (
        <AddEditCategory
          fromEdit
          isModalOpen={isEditModalOpen}
          setIsModalOpen={setIsEditModalOpen}
        />
      )}

      {/* Delete Category Modal */}
      <DeleteCategoryModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </>
  );
}
