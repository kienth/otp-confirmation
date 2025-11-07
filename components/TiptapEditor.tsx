"use client";

import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { TextAlign } from "@tiptap/extension-text-align";
import { FontFamily } from "@tiptap/extension-font-family";
import { Underline } from "@tiptap/extension-underline";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
}

export function TiptapEditor({
  content = "",
  onChange,
  placeholder = "Start writing your newsletter...",
}: TiptapEditorProps) {
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before rendering the editor
  useEffect(() => {
    setIsClient(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false, // Fix SSR hydration issues
    extensions: [
      StarterKit.configure({
        heading: false, // Disable the default heading extension
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
        HTMLAttributes: {
          class: 'heading',
        },
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontFamily,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[300px] p-4 border rounded-md",
      },
    },
  }, [isClient]); // Only create editor when client-side

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const insertTable = () => {
    if (editor) {
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run();
    }
  };

  if (!isClient || !editor) {
    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="border-b bg-gray-50 p-2 h-12 flex items-center">
          <div className="text-gray-500">Loading editor...</div>
        </div>
        <div className="min-h-[300px] p-4 flex items-center justify-center">
          <div className="text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            Preparing rich text editor...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex gap-1 border-r pr-2">
          <Button
            variant={editor.isActive("bold") ? "default" : "outline"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <strong>B</strong>
          </Button>
          <Button
            variant={editor.isActive("italic") ? "default" : "outline"}
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <em>I</em>
          </Button>
          <Button
            variant={editor.isActive("underline") ? "default" : "outline"}
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <u>U</u>
          </Button>
          <Button
            variant={editor.isActive("strike") ? "default" : "outline"}
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <s>S</s>
          </Button>
        </div>

        {/* Headings */}
        <div className="flex gap-1 border-r pr-2">
          <Button
            variant={
              editor.isActive("heading", { level: 1 }) ? "default" : "outline"
            }
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            H1
          </Button>
          <Button
            variant={
              editor.isActive("heading", { level: 2 }) ? "default" : "outline"
            }
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            H2
          </Button>
          <Button
            variant={
              editor.isActive("heading", { level: 3 }) ? "default" : "outline"
            }
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            H3
          </Button>
        </div>

        {/* Alignment */}
        <div className="flex gap-1 border-r pr-2">
          <Button
            variant={
              editor.isActive({ textAlign: "left" }) ? "default" : "outline"
            }
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            ⬅️
          </Button>
          <Button
            variant={
              editor.isActive({ textAlign: "center" }) ? "default" : "outline"
            }
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            ↔️
          </Button>
          <Button
            variant={
              editor.isActive({ textAlign: "right" }) ? "default" : "outline"
            }
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            ➡️
          </Button>
        </div>

        {/* Lists */}
        <div className="flex gap-1 border-r pr-2">
          <Button
            variant={editor.isActive("bulletList") ? "default" : "outline"}
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            • List
          </Button>
          <Button
            variant={editor.isActive("orderedList") ? "default" : "outline"}
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            1. List
          </Button>
        </div>

        {/* Text Color */}
        <div className="flex gap-1 border-r pr-2">
          <Input
            type="color"
            className="w-8 h-8 p-0 border-0"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            title="Text Color"
          />
        </div>

        {/* Media & Links */}
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={addImage}>
            🖼️ Image
          </Button>
          <Button variant="outline" size="sm" onClick={addLink}>
            🔗 Link
          </Button>
          <Button variant="outline" size="sm" onClick={insertTable}>
            📊 Table
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] focus-within:outline-none"
      />
    </div>
  );
}
