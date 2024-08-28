import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Category } from "@prisma/client";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

type TProps = {
  categories: Category[];
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CategoryTable({
  categories,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
}: TProps) {
  return (
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
                      //   setCurrentCategory(category);
                      //   setNewCategory({
                      //     name: category.name,
                      //     slug: category.slug,
                      //   });
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      //   setCurrentCategory(category);
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
  );
}
