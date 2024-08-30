"use client";
import { Button } from "@/components/ui/button";

type TProps = {
  onBack: () => void;
  onSubmit: () => void;
  fromEdit: boolean;
};

export default function TopActions({ onBack, onSubmit, fromEdit }: TProps) {
  return (
    <div className="mb-4 flex justify-between">
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onSubmit}>{fromEdit ? "Save Edit" : "Save"}</Button>
    </div>
  );
}
