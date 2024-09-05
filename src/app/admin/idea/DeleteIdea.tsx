"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { deleteIdea } from "@/actions/idea/delete";

export default function DeleteIdea({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDeleteIdea() {
    await deleteIdea({ id });
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Idea</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to delete this idea?</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeleteIdea}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
