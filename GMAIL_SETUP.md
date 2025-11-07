# Gmail Setup Guide for OTP System

## Step 1: Enable 2-Factor Authentication

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** tab
3. Under "How you sign in to Google", click **2-Step Verification**
4. Follow the setup process to enable 2FA

## Step 2: Generate App Password

1. In your Google Account, go to **Security**
2. Under "How you sign in to Google", click **2-Step Verification**
3. At the bottom, click **App passwords**
4. Select the app as "Mail" and device as "Other (custom name)"
5. Enter "OTP Verification System" as the name
6. Click **Generate**
7. **Copy the 16-character password** (this is your EMAIL_PASS)

## Step 3: Update .env.local

Replace the placeholder values in your `.env.local` file:

```env
# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-actual-email@gmail.com
EMAIL_PASS=your-16-character-app-password

# App Configuration
NEXTAUTH_SECRET=your-random-secret-string
```

**Important:**

- Use your actual Gmail address for `EMAIL_USER`
- Use the 16-character app password (not your regular Gmail password) for `EMAIL_PASS`
- Remove any spaces from the app password

## Step 4: Alternative Email Providers

If you prefer not to use Gmail, here are other options:

### Outlook/Hotmail

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
```

### Yahoo Mail

```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-app-password
```

### SendGrid (Recommended for production)

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

## Step 5: Test the Configuration

1. Update your `.env.local` file with real values
2. Restart your development server: `npm run dev`
3. Try sending an OTP to your email
4. Check the terminal for debug logs

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**

   - Make sure you're using an App Password, not your regular password
   - Ensure 2-Factor Authentication is enabled

2. **"Connection timeout" error**

   - Check your internet connection
   - Try using port 465 with `secure: true` instead

3. **"Authentication failed" error**
   - Double-check your email and app password
   - Make sure there are no extra spaces

### Debug Steps:

1. Check the server logs in your terminal
2. Verify environment variables are loaded
3. Test SMTP connection manually

If you continue to have issues, you can use a service like [Ethereal Email](https://ethereal.email/) for testing without real email delivery.
