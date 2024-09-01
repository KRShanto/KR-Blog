"use client";

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
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    setError("");
    // Here you would typically send the login data to your server
    // This is a mock API call
    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields.");
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error("");
      }

      // Redirect to the home page
      window.location.href = "/";
    } catch (err: any) {
      setError(
        err.message ||
          "Invalid email or password. Please try again. Or sign up if you don't have an account.",
      );
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
        {pending ? "Logging in..." : "Log in"}
      </Button>
    </>
  );
}
