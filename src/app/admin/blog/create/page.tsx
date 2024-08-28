"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  X,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { createBlog } from "@/actions/blog/create";
import { getCategories } from "@/actions/category/get";
import { useServerGet } from "@/hooks/useServerGet";
import { useRouter } from "next/navigation";

export default function Page() {
  const { toast } = useToast();
  const { data: categories } = useServerGet(getCategories);
  console.log(categories);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [blogData, setBlogData] = useState({
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
  });
  const [keywordInput, setKeywordInput] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: blogData.content,
    onUpdate: ({ editor }) => {
      setBlogData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

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

  const handleSelectChange = (value: string) => {
    setBlogData((prev) => ({ ...prev, categoryId: parseInt(value) }));
  };

  const handleSave = async () => {
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

    const res = await createBlog({
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
    });

    if (res.type === "success") {
      toast({
        title: "Success",
        description: "Blog created successfully",
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

  useEffect(() => {
    setBlogData((prev) => ({
      ...prev,
      seoTitle: prev.title,
      seoDescription: prev.description,
    }));
  }, [blogData.title, blogData.description]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`);
      uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setBlogData((prev) => ({ ...prev, image: downloadURL }));
        });
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between">
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <h2 className="text-2xl font-bold">Blog Settings</h2>
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
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {/* <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food">Food</SelectItem> */}
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
        </div>
        <div className="lg:col-span-2">
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="editor">
              <div className="rounded-md border p-4">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().toggleBold().run()}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      editor?.chain().focus().toggleBulletList().run()
                    }
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      editor?.chain().focus().toggleOrderedList().run()
                    }
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      editor?.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      editor?.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      editor?.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                  >
                    <Heading3 className="h-4 w-4" />
                  </Button>
                </div>
                <EditorContent
                  editor={editor}
                  className="prose dark:prose-invert min-h-[500px] max-w-none"
                />
              </div>
            </TabsContent>
            <TabsContent value="preview">
              <div className="rounded-md border p-4">
                <h1 className="mb-4 text-3xl font-bold">{blogData.title}</h1>
                {blogData.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blogData.image}
                    alt={blogData.title}
                    className="mb-4 h-64 w-full rounded-md object-cover"
                  />
                )}
                <div className="mb-4 flex gap-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogData.content }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
