import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import React, { useCallback } from "react";
import { BlogData } from "../AddEditBlog";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

type TProps = {
  blogData: BlogData;
  setBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
};

export default function FeatureImage({ blogData, setBlogData }: TProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const storageRef = ref(storage, `images/${file.name}`);
        uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            setBlogData((prev) => ({ ...prev, image: downloadURL }));
          });
        });
      }
    },
    [setBlogData],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  return (
    <div>
      <Label>Featured Image</Label>
      <div
        {...getRootProps()}
        className={`rounded-md border-2 border-dashed p-4 transition-all duration-300 ease-in-out ${isDragActive ? "border-primary" : "border-muted"} group relative overflow-hidden hover:border-primary`}
      >
        <input {...getInputProps()} />
        {blogData.image ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blogData.image}
              alt="Featured"
              className="h-32 w-full rounded-md object-cover"
            />
            <Button
              size="sm"
              variant="destructive"
              className="absolute right-2 top-2"
              onClick={(e) => {
                e.stopPropagation();
                setBlogData((prev) => ({ ...prev, image: "" }));
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <p>
            {isDragActive
              ? "Drop the image here"
              : "Drag 'n' drop an image here, or click to select one"}
          </p>
        )}
        <div
          className="pointer-events-none absolute inset-0 rounded-md border-2 border-dashed border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            animation: "dash 15s linear infinite",
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(var(--primary) / 0.1) 5px, rgba(var(--primary) / 0.1) 10px)",
            backgroundSize: "200% 200%",
          }}
        />
      </div>
    </div>
  );
}
