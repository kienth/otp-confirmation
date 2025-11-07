"use client";

import React, { useState } from "react";
import axios from "axios";
import { TiptapEditor } from "@/components/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsletterFormProps {
  onSendSuccess?: () => void;
}

export function NewsletterForm({ onSendSuccess }: NewsletterFormProps) {
  const [emailList, setEmailList] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (!emailList.trim() || !subject.trim() || !content.trim()) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    // Parse email list (comma-separated or line-separated)
    const emails = emailList
      .split(/[,\n]/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0);

    // Validate emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email) => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      setError(`Invalid email addresses: ${invalidEmails.join(", ")}`);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/send-newsletter", {
        emails,
        subject,
        content,
      });

      setMessage(
        `Newsletter sent successfully to ${emails.length} recipients!`
      );
      onSendSuccess?.();

      // Reset form
      setEmailList("");
      setSubject("");
      setContent("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send newsletter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Newsletter</CardTitle>
          <CardDescription>
            Design and send beautiful HTML newsletters to your subscribers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendNewsletter} className="space-y-6">
            {/* Email Recipients */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Recipients
              </label>
              <textarea
                className="w-full min-h-[100px] p-3 border rounded-md resize-y"
                placeholder="Enter email addresses (comma or line separated)&#10;example1@email.com, example2@email.com&#10;example3@email.com"
                value={emailList}
                onChange={(e) => setEmailList(e.target.value)}
                disabled={loading}
              />
              <p className="text-sm text-gray-600 mt-1">
                Separate multiple emails with commas or new lines
              </p>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Subject Line
              </label>
              <Input
                type="text"
                placeholder="Enter newsletter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            {/* Content Editor */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">
                  Newsletter Content
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={!previewMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode(false)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    type="button"
                    variant={previewMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode(true)}
                  >
                    👁️ Preview
                  </Button>
                </div>
              </div>

              {previewMode ? (
                <div className="border rounded-lg p-4 min-h-[300px] bg-white">
                  <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="prose prose-sm max-w-none"
                  />
                </div>
              ) : (
                <TiptapEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your newsletter content..."
                />
              )}
            </div>

            {/* Send Button */}
            <div className="flex gap-3">
              <Button
                type="submit"
                className="flex-1"
                disabled={
                  loading ||
                  !emailList.trim() ||
                  !subject.trim() ||
                  !content.trim()
                }
              >
                {loading ? "Sending Newsletter..." : "Send Newsletter"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEmailList("");
                  setSubject("");
                  setContent("");
                  setMessage("");
                  setError("");
                }}
                disabled={loading}
              >
                Clear All
              </Button>
            </div>

            {/* Success Message */}
            {message && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                <p className="text-green-800">{message}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-800">{error}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Content Statistics */}
      {content && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Content Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">Characters</p>
                <p className="text-gray-600">
                  {content.replace(/<[^>]*>/g, "").length}
                </p>
              </div>
              <div>
                <p className="font-medium">Words</p>
                <p className="text-gray-600">
                  {
                    content
                      .replace(/<[^>]*>/g, "")
                      .split(/\s+/)
                      .filter((word) => word.length > 0).length
                  }
                </p>
              </div>
              <div>
                <p className="font-medium">Recipients</p>
                <p className="text-gray-600">
                  {
                    emailList
                      .split(/[,\n]/)
                      .filter((email) => email.trim().length > 0).length
                  }
                </p>
              </div>
              <div>
                <p className="font-medium">HTML Size</p>
                <p className="text-gray-600">
                  {(new Blob([content]).size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
