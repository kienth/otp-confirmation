"use client";

import React, { useState } from "react";
import { NewsletterForm } from "@/components/NewsletterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NewsletterPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000); // Hide success message after 5 seconds
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📧 Newsletter Creator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create and send beautiful HTML newsletters with our rich text
            editor. Design professional emails that look great in Gmail and
            other email clients.
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-800">
                      Newsletter Sent Successfully!
                    </h3>
                    <p className="text-green-700">
                      Your newsletter has been delivered to all recipients.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Newsletter Form */}
        <NewsletterForm onSendSuccess={handleSendSuccess} />

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>✨</span>
                <span>Rich Text Editor</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Full-featured editor with formatting, images, links, tables, and
                more. Similar to Summernote and React-Quill but more modern and
                flexible.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📱</span>
                <span>Mobile Responsive</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your newsletters automatically adapt to different screen sizes
                and look great on desktop, tablet, and mobile devices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🎨</span>
                <span>Professional Design</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Beautiful HTML templates with professional styling that works
                perfectly with Gmail and other major email clients.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>💡 Newsletter Tips</CardTitle>
            <CardDescription>
              Best practices for creating effective newsletters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">📝 Content Tips</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Keep subject lines under 50 characters</li>
                  <li>• Use clear headings to organize content</li>
                  <li>• Include a call-to-action button or link</li>
                  <li>• Add images to make it visually appealing</li>
                  <li>• Keep paragraphs short and scannable</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Delivery Tips</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Test with a small group first</li>
                  <li>• Send during optimal times (Tue-Thu, 10AM-2PM)</li>
                  <li>• Use the preview feature before sending</li>
                  <li>• Personalize the sender name</li>
                  <li>• Keep email lists clean and updated</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
