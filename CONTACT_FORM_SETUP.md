# Contact Form Email Setup Guide

This portfolio now has a fully functional contact form that sends emails directly to your inbox!

## Setup Instructions

### Step 1: Install Dependencies
Run this command to install Nodemailer:
```bash
npm install
# or
pnpm install
```

### Step 2: Configure Gmail (or your email service)

#### Using Gmail:

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to [myaccount.google.com](https://myaccount.google.com)
   - Click "Security" in the left sidebar
   - Enable 2-Step Verification

2. **Create App Password**:
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Copy this password

3. **Update `.env.local`**:
   - Open the `.env.local` file in your project root
   - Replace `your-email@gmail.com` with your Gmail address
   - Replace `your-app-password` with the 16-character password you copied
   - Keep `ADMIN_EMAIL` as your inbox email

Example `.env.local`:
```
EMAIL_USER=manasvilimbasiya1007@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=manasvilimbasiya1007@gmail.com
```

### Step 3: Test the Form

1. Run your development server:
```bash
npm run dev
```

2. Navigate to the contact section on your portfolio
3. Fill out the form and submit
4. Check your email inbox (and spam folder) for:
   - An email from your portfolio with the visitor's message
   - A confirmation email sent to the visitor

## How It Works

When someone submits the contact form:

1. **Visitor's email is sent to you** with:
   - Visitor's name
   - Visitor's email address
   - Their message

2. **Confirmation email is sent to the visitor** letting them know you received their message

3. **Form resets** and shows a success message

## Troubleshooting

### Emails not sending?
- Check that `EMAIL_USER` and `EMAIL_PASSWORD` are correct in `.env.local`
- Verify 2-Step Verification is enabled on your Gmail
- Check the browser console for error messages
- Check server logs for detailed error information

### Using a different email service?
You can modify the `/app/api/contact/route.ts` file to use:
- SendGrid
- Mailgun
- AWS SES
- Any other SMTP service

Just update the `transporter` configuration.

### Security Notes
- Never commit `.env.local` to git (it's in `.gitignore`)
- App passwords are specific to your account and can be revoked
- Consider rate-limiting if you expect high volume

## Alternative Email Services

If you prefer not to use Gmail, you can use:

**SendGrid**:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});
```

**Mailgun**:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_EMAIL,
    pass: process.env.MAILGUN_PASSWORD,
  },
});
```

## Questions?
Check the [Nodemailer Documentation](https://nodemailer.com/) for more details.
