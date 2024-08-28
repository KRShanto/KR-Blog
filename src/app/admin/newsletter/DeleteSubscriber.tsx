"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash, CheckCircle, XCircle } from "lucide-react";
import AddSubscriber from "./AddSubscriber";
import { db } from "@/lib/db";
import { editNewsletterSubscription } from "@/actions/newsletter/edit";
import { deleteNewsletterSubscription } from "@/actions/newsletter/delete";

export default function DeleteSubscriber({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    await deleteNewsletterSubscription(id);
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
          <DialogTitle>Delete Subscriber</DialogTitle>
        </DialogHeader>

        <p>Are you sure you want to delete this subscriber?</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
