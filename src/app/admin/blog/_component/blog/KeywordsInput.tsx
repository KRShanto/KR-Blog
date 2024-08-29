import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import React, { useState } from "react";
import { BlogData } from "../AddEditBlog";

type TProps = {
  blogData: BlogData;
  setBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
};

export default function KeywordsInput({blogData, setBlogData}:TProps) {
  const [keywordInput, setKeywordInput] = useState("");
  const handleKeywordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };

  const handleKeywordInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && keywordInput.trim()) {
      e.preventDefault();
      setBlogData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()],
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setBlogData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((keyword) => keyword !== keywordToRemove),
    }));
  };
  return (
    <div>
      <Label htmlFor="keywords">Keywords</Label>
      <div className="mb-2 flex flex-wrap gap-2">
        {blogData.keywords.map((keyword, index) => (
          <span
            key={index}
            className="flex items-center rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground"
          >
            {keyword}
            <Button
              size="sm"
              variant="ghost"
              className="ml-1 h-4 w-4 p-0"
              onClick={() => removeKeyword(keyword)}
            >
              <X className="h-3 w-3" />
            </Button>
          </span>
        ))}
      </div>
      <Input
        id="keywords"
        value={keywordInput}
        onChange={handleKeywordInputChange}
        onKeyDown={handleKeywordInputKeyDown}
        placeholder="Type a keyword and press Enter"
      />
    </div>
  );
}
