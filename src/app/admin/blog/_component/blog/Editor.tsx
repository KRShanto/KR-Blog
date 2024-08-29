import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@prisma/client";
import { EditorContent, useEditor } from "@tiptap/react";
import { Editor as TipTapEditor } from "@tiptap/core";

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
} from "lucide-react";
import { BlogData } from "../AddEditBlog";
import StarterKit from "@tiptap/starter-kit";

type TProps = {
  blogData: BlogData;
  defaultContent: string;
  setBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
};

export default function Editor({
  defaultContent,
  blogData,
  setBlogData,
}: TProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultContent,
    onUpdate: ({ editor }) => {
      setBlogData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
    immediatelyRender: false,
  });
  return (
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
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
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
                  editor?.chain()?.focus()?.toggleHeading({ level: 2 }).run()
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
              defaultValue={"helo"}
              className="prose min-h-[500px] max-w-none dark:prose-invert"
            />
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <div className="rounded-md border p-4">
            <h1 className="mb-4 text-3xl font-bold">{blogData.title}</h1>
            {blogData.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={blogData?.image}
                alt={blogData?.title}
                className="mb-4 h-64 w-full rounded-md object-cover"
              />
            )}
            <div className="mb-4 flex gap-2">
              <span className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div
              className="prose max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blogData.content! }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
