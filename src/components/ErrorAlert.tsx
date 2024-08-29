"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
export default function ErrorToaster({ error }: { error: string }) {
  return (
    <Alert variant="destructive" className="mb-2 sm:mb-5">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
