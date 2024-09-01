"use client";

import { register } from "@/actions/auth/register";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const [error, setError] = useState("");
  const { pending } = useFormStatus();

  const handleSubmit = async (data: FormData) => {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirm-password") as string;
    const joinNewsletter = data.get("newsletter") === "on";

    setError("");

    try {
      // Basic validation
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      const res = await register({
        name,
        email,
        password,
        joinNewsletter,
      });

      if (res.type === "error") {
        throw new Error(res.message);
      }

      const res2 = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res2?.error) {
        throw new Error("");
      }

      // Redirect to the home page
      window.location.href = "/";
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={pending}
        formAction={handleSubmit}
      >
        {pending ? "Registering..." : "Register"}
      </Button>
    </>
  );
}
