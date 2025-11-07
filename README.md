# OTP Email Verification System

A modern OTP (One-Time Password) email verification system built with Next.js 14, TypeScript, shadcn/ui, Tailwind CSS, and Axios.

## Features

- 📧 Email-based OTP verification
- 🎨 Beautiful UI with shadcn/ui components
- 🔒 Secure 6-digit OTP generation
- ⏰ OTP expiration (10 minutes)
- 📱 Responsive design
- 🚀 Built with Next.js 14 and TypeScript

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Configure Email Settings

Edit the `.env.local` file with your Gmail credentials:

```env
# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# App Configuration
NEXTAUTH_SECRET=your-nextauth-secret-here
```

**Important**: For Gmail, you need to:

1. Enable 2-factor authentication on your Google account
2. Generate an "App Password" for this application
3. Use the App Password in the `EMAIL_PASS` field (not your regular password)

### 3. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## How It Works

1. **Email Input**: User enters their email address
2. **OTP Generation**: System generates a 6-digit random OTP
3. **Email Sending**: OTP is sent to the user's email via SMTP
4. **OTP Verification**: User enters the OTP to verify their email
5. **Success**: Email is verified and user sees success message

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── send-otp/route.ts    # API endpoint to send OTP
│   │   └── verify-otp/route.ts  # API endpoint to verify OTP
│   ├── globals.css              # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── OTPForm.tsx             # Main OTP form component
├── lib/
│   └── utils.ts                # Utility functions
└── .env.local                  # Environment variables
```

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **shadcn/ui**: Beautiful UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Nodemailer**: Email sending library
- **Axios**: HTTP client for API calls

## Security Features

- OTP expires after 10 minutes
- OTP is automatically deleted after successful verification
- Email validation on both client and server
- Input sanitization for OTP (only numbers allowed)

## Production Deployment

For production use, consider:

1. Using a proper database (Redis/PostgreSQL) instead of in-memory storage for OTPs
2. Implementing rate limiting for OTP requests
3. Adding more robust error handling and logging
4. Using a dedicated email service (SendGrid, AWS SES, etc.)
5. Adding CSRF protection
6. Implementing user session management

## License

MIT License
