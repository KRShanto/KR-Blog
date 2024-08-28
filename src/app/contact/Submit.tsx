"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { createContact } from "@/actions/contact/create";
import { useRouter } from "next/navigation";

export default function Submit() {
  const { pending } = useFormStatus();
  const [error, setError] = useState<{ title: string; message: string } | null>(
    null,
  );
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    if (!name || !email || !message) {
      setError({
        title: "Invalid Input",
        message: "Please fill in all fields",
      });
      return;
    }

    const res = await createContact({ name, email, message });

    if (res.type === "error") {
      setError({
        title: "Error",
        message: res.message,
      });
      return;
    }

    toast({
      title: "Message Sent",
      description:
        "We have received your message. We will get back to you soon.",
    });

    router.push("/");
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{error?.title}</AlertTitle>
          <AlertDescription>{error?.message}</AlertDescription>
        </Alert>
      )}

      <Button
        type="submit"
        className="mt-4"
        disabled={pending}
        formAction={handleSubmit}
      >
        {pending ? "Sending..." : "Send Message"}
      </Button>
    </>
  );
}
