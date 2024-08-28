"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash, CheckCircle, XCircle } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { createNewsletter } from "@/actions/newsletter/create";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AddSubscriber() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const subscribed = data.get("subscribed") === "on";

    const res = await createNewsletter({ name, email, subscribed });

    if (res.type === "error") {
      setError(res.message);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Subscriber
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Add New Subscriber</DialogTitle>
          </DialogHeader>

          <div className="mt-5 flex flex-col gap-5">
            <div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="mt-1" name="name" />
            </div>
            <div>
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" name="email" className="mt-1" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="subscribed" name="subscribed" defaultChecked />
              <Label htmlFor="subscribed">Subscribed</Label>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-2 sm:mb-5">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Your session has expired. Please log in again.
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="submit" formAction={handleSubmit}>
              Add Subscriber
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
