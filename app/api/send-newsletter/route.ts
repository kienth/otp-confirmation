import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    console.log("=== SEND NEWSLETTER ENDPOINT CALLED ===");
    const { emails, subject, content } = await request.json();

    // Validation
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: "Email list is required and must be an array" },
        { status: 400 }
      );
    }

    if (!subject || !subject.trim()) {
      return NextResponse.json(
        { error: "Subject is required" },
        { status: 400 }
      );
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Validate email format for all emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emails.filter((email) => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      return NextResponse.json(
        { error: `Invalid email addresses: ${invalidEmails.join(", ")}` },
        { status: 400 }
      );
    }

    console.log(`Sending newsletter to ${emails.length} recipients`);
    console.log(`Subject: ${subject}`);
    console.log(`Content length: ${content.length} characters`);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    // Verify SMTP connection
    try {
      console.log("Verifying SMTP connection...");
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      return NextResponse.json(
        { error: "Email service configuration error" },
        { status: 500 }
      );
    }

    // Create beautiful HTML email template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .newsletter-container {
            background: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .newsletter-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
          }
          .newsletter-content {
            font-size: 16px;
            line-height: 1.8;
          }
          .newsletter-content h1 {
            color: #1f2937;
            font-size: 28px;
            margin-top: 30px;
            margin-bottom: 15px;
          }
          .newsletter-content h2 {
            color: #374151;
            font-size: 24px;
            margin-top: 25px;
            margin-bottom: 12px;
          }
          .newsletter-content h3 {
            color: #4b5563;
            font-size: 20px;
            margin-top: 20px;
            margin-bottom: 10px;
          }
          .newsletter-content p {
            margin-bottom: 15px;
          }
          .newsletter-content img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            margin: 15px 0;
          }
          .newsletter-content a {
            color: #3b82f6;
            text-decoration: none;
          }
          .newsletter-content a:hover {
            text-decoration: underline;
          }
          .newsletter-content table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .newsletter-content th,
          .newsletter-content td {
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
          }
          .newsletter-content th {
            background-color: #f3f4f6;
            font-weight: bold;
          }
          .newsletter-content blockquote {
            border-left: 4px solid #3b82f6;
            padding-left: 20px;
            margin: 20px 0;
            font-style: italic;
            background-color: #f8fafc;
            padding: 15px 20px;
            border-radius: 4px;
          }
          .newsletter-content ul,
          .newsletter-content ol {
            padding-left: 25px;
            margin-bottom: 15px;
          }
          .newsletter-content li {
            margin-bottom: 8px;
          }
          .newsletter-footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 14px;
            color: #6b7280;
          }
          @media (max-width: 600px) {
            body {
              padding: 10px;
            }
            .newsletter-container {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="newsletter-container">
          <div class="newsletter-header">
            <h1 style="margin: 0; color: #1f2937;">${subject}</h1>
            <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">${new Date().toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}</p>
          </div>
          
          <div class="newsletter-content">
            ${content}
          </div>
          
          <div class="newsletter-footer">
            <p>Thank you for reading our newsletter!</p>
            <p style="margin-top: 10px;">
              <small>This email was sent from our newsletter system.</small>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send emails
    const results = [];
    const failedEmails = [];

    for (const email of emails) {
      try {
        console.log(`Sending to ${email}...`);

        await transporter.sendMail({
          from: `"Newsletter" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: subject,
          html: htmlContent,
          // Also include plain text version
          text: content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " "),
        });

        results.push({ email, status: "sent" });
        console.log(`✅ Sent to ${email}`);

        // Small delay to avoid overwhelming the SMTP server
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (emailError) {
        console.error(`❌ Failed to send to ${email}:`, emailError);
        failedEmails.push(email);
        results.push({
          email,
          status: "failed",
          error:
            emailError instanceof Error ? emailError.message : "Unknown error",
        });
      }
    }

    const successCount = results.filter((r) => r.status === "sent").length;
    const failureCount = results.filter((r) => r.status === "failed").length;

    console.log(
      `Newsletter sending completed: ${successCount} sent, ${failureCount} failed`
    );

    return NextResponse.json(
      {
        success: true,
        message: `Newsletter sent successfully`,
        summary: {
          totalEmails: emails.length,
          sent: successCount,
          failed: failureCount,
          failedEmails: failedEmails,
        },
        results: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending newsletter:", error);

    return NextResponse.json(
      {
        error: "Failed to send newsletter",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
