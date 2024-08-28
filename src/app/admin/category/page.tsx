"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Users,
  Tag,
  Mail,
  Plus,
  Pencil,
  Trash,
  Menu,
  X,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

export default function Component() {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Technology", slug: "technology" },
    { id: 2, name: "Travel", slug: "travel" },
    { id: 3, name: "Food", slug: "food" },
  ]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "" });

  const handleAddCategory = () => {
    setCategories([...categories, { id: Date.now(), ...newCategory }]);
    setNewCategory({ name: "", slug: "" });
    setIsAddModalOpen(false);
  };

  const handleEditCategory = () => {
    if (currentCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === currentCategory.id ? { ...cat, ...newCategory } : cat,
        ),
      );
      setIsEditModalOpen(false);
    }
  };

  const handleDeleteCategory = () => {
    if (currentCategory) {
      setCategories(categories.filter((cat) => cat.id !== currentCategory.id));
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <main className="flex-1 overflow-auto p-4 md:p-8">
      <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100 md:mb-0">
          Categories
        </h1>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-900 dark:text-gray-100">
                Name
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">
                Slug
              </TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                  {category.name}
                </TableCell>
                <TableCell className="text-gray-900 dark:text-gray-100">
                  {category.slug}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentCategory(category);
                        setNewCategory({
                          name: category.name,
                          slug: category.slug,
                        });
                        setIsEditModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setCurrentCategory(category);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Category Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Add New Category
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="name"
                className="text-right text-gray-900 dark:text-gray-100"
              >
                Name
              </Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="slug"
                className="text-right text-gray-900 dark:text-gray-100"
              >
                Slug
              </Label>
              <Input
                id="slug"
                value={newCategory.slug}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddCategory}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Edit Category
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
                  setNewCategory({ ...newCategory, slug: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditCategory}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Delete Category
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-900 dark:text-gray-100">
            Are you sure you want to delete this category?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
