"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Category, Post } from "@prisma/client";
import { EditBlog } from "@/actions/blog/edit";
import { createBlog } from "@/actions/blog/create";
import TopActions from "./blog/TopActions";
import Editor from "./blog/Editor";
import Title from "./blog/Title";
import FeatureImage from "./blog/FeatureImage";
import CategoryItems from "./blog/CategoryItems";
import KeywordsInput from "./blog/KeywordsInput";
type TProps = {
  fromEdit?: boolean;
  blog?: Post;
  categories: Category[];
};

export type BlogData = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageAttribution: string;
  keywords: string[];
  categoryId: number | null;
  published: boolean;
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
  content: string;
};
export default function AddEditBlog({
  fromEdit = false,
  blog,
  categories,
}: TProps) {
  const { toast } = useToast();
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const defaultBlogData =
    fromEdit && blog
      ? {
          title: blog?.title,
          description: blog?.description,
          image: blog.image,
          imageAlt: blog.imageAlt,
          imageAttribution: blog.imageAttribution!,
          keywords: blog.keywords as string[],
          categoryId: blog.categoryId as number | null,
          published: blog.published,
          isFeatured: blog.isFeatured,
          seoTitle: blog.seoTitle,
          seoDescription: blog.seoDescription,
          content: blog.content,
        }
      : {
          title: "",
          description: "",
          image: "",
          imageAlt: "",
          imageAttribution: "",
          keywords: [] as string[],
          categoryId: null as number | null,
          published: false,
          isFeatured: false,
          seoTitle: "",
          seoDescription: "",
          content: "",
        };
  const [blogData, setBlogData] = useState(defaultBlogData);

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setBlogData((prev) => ({ ...prev, isFeatured: checked }));
  };

  // blog submit handler
  const handleSubmit = async () => {
    // Validate the form data
    if (!blogData.title || !blogData.description) {
      toast({
        variant: "destructive",
        title: "Fields required",
        description: "Please fill in all the required fields",
      });
      return;
    }

    if (!blogData.categoryId) {
      toast({
        variant: "destructive",
        title: "Category required",
        description: "Please select a category",
      });
      return;
    }
    let res;
    const inputBlogData = {
      title: blogData.title,
      description: blogData.description,
      image: blogData.image,
      imageAlt: blogData.imageAlt,
      imageAttribution: blogData.imageAttribution,
      keywords: blogData.keywords,
      content: blogData.content,
      categoryId: blogData.categoryId,
      published: blogData.published,
      isFeatured: blogData.isFeatured,
      seoTitle: blogData.seoTitle,
      seoDescription: blogData.seoDescription,
    };

    if (fromEdit) {
      res = await EditBlog(blog?.id!, inputBlogData);
    } else {
      res = await createBlog(inputBlogData);
    }

    if (res.type === "success") {
      toast({
        title: "Success",
        description: "Blog Edit successfully",
      });

      router.push("/admin/blog");
    } else {
      toast({
        variant: "destructive",
        title: "Error occured",
        description: res.message,
      });
    }
  };

  const handleBack = () => {
    setIsWarningOpen(true);
  };

  useEffect(() => {
    setBlogData((prev) => ({
      ...prev,
      seoTitle: prev.title,
      seoDescription: prev.description,
    }));
  }, [blogData.title, blogData.description]);

  return (
    <div className="container mx-auto p-4">
      <TopActions
        fromEdit={fromEdit}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Title>{fromEdit ? "Edit Blog Settings" : "Blog Settings"}</Title>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={blogData.title}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={blogData.description}
              onChange={handleInputChange}
            />
          </div>
          <FeatureImage blogData={blogData} setBlogData={setBlogData} />
          <div>
            <Label htmlFor="imageAlt">Image Alt Text</Label>
            <Input
              id="imageAlt"
              name="imageAlt"
              value={blogData.imageAlt}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="imageAttribution">Image Attribution</Label>
            <Input
              id="imageAttribution"
              name="imageAttribution"
              value={blogData.imageAttribution}
              onChange={handleInputChange}
            />
          </div>
          <CategoryItems
            selectedCategoryId={blogData.categoryId!}
            categories={categories}
            fromEdit={fromEdit}
            setBlogData={setBlogData}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="publish"
              checked={blogData.published}
              onCheckedChange={(checked) =>
                setBlogData((prev) => ({ ...prev, published: checked }))
              }
            />
            <Label htmlFor="publish">Publish Post</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isFeatured"
              checked={blogData.isFeatured}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isFeatured">Featured Post</Label>
          </div>
          <h3 className="mt-6 text-xl font-semibold">SEO Settings</h3>
          <div>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              name="seoTitle"
              value={blogData.seoTitle}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              name="seoDescription"
              value={blogData.seoDescription}
              onChange={handleInputChange}
            />
          </div>
          <KeywordsInput blogData={blogData} setBlogData={setBlogData} />
        </div>
        <Editor
          blogData={blogData}
          setBlogData={setBlogData}
          defaultContent={fromEdit && blog ? blog.content : blogData.content}
        />
      </div>
      <Dialog open={isWarningOpen} onOpenChange={setIsWarningOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to go back?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Are you sure you want to go back? All
              your changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWarningOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setIsWarningOpen(false);
                router.push("/admin/blog");
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        @keyframes dash {
          to {
            background-position: 200% 200%;
          }
        }
      `}</style>
    </div>
  );
}
