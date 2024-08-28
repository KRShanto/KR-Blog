import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type TProps = {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoryHead({ setIsAddModalOpen }: TProps) {
  return (
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
  );
}
