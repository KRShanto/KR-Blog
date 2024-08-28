"use client";
import { Button } from "@/components/ui/button";
import { Copy, ClipboardCheck } from "lucide-react";
import React, { useState } from "react";

type TProps = {
  copyText: string;
};
export default function CopyToClipboard({ copyText }: TProps) {
  const [copies, setCopies] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopies(true);
      setTimeout(() => setCopies(false), 1500);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      className="h-[40px] w-[40px] p-0"
    >
      {copies ? (
        <ClipboardCheck className="size-4 text-green-600 md:size-5" />
      ) : (
        <Copy className="size-4 md:size-5" />
      )}
    </Button>
  );
}
