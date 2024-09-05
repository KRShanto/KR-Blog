"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Pencil, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Idea } from "@prisma/client";
import { editIdea } from "@/actions/idea/edit";

export default function EditIdea({ idea }: { idea: Idea }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: FormData) {
    const title = data.get("title") as string;
    const description = data.get("description") as string;

    console.log("title", title);
    console.log("description", description);

    if (!title) {
      setError("Please fill out all fields.");
      return;
    }

    const res = await editIdea({ id: idea.id, title, description });
    if (res.type === "error") {
      setError("An error occurred. Please try again.");
      return;
    }

    setError(null);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Edit Idea</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                className="col-span-3"
                name="title"
                defaultValue={idea.title}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                className="col-span-3"
                name="description"
                defaultValue={idea.description || ""}
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-2 sm:mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="submit" formAction={handleSubmit}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
