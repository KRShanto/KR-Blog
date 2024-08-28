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
import { Plus } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { createNewsletter } from "@/actions/newsletter/create";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { register } from "@/actions/auth/register";

export default function AddUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(data: FormData) {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;
    const subscribed = data.get("subscribed") === "on";

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = await register({
      name,
      email,
      password,
      joinNewsletter: subscribed,
    });

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
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
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
            <div>
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="text-right">
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                name="confirmPassword"
                className="mt-1"
              />
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
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="submit" formAction={handleSubmit}>
              Add User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
