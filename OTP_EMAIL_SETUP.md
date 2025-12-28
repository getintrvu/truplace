# OTP Email Template Setup Guide

This guide explains how to configure the Supabase email template for OTP (One-Time Password) authentication.

## IMPORTANT: Magic Link vs OTP Code

If users are receiving **magic links** instead of **6-digit OTP codes**, you need to enable Email OTP in Supabase:

1. Go to **Authentication** → **Providers** → **Email**
2. Enable **"Email OTP"** authentication method
3. Optionally disable **"Magic Link"** if you only want OTP codes
4. Save changes

See `OTP_CONFIGURATION_FIX.md` for detailed troubleshooting.

## Overview

The application uses OTP-based authentication instead of magic links. Users receive a 6-digit verification code via email that they enter in the application to authenticate.

## Key Features

- 6-digit OTP codes sent via email
- 10-minute cooldown between code resends
- Truplace branded styling (blue-green gradient)
- Secure, password-free authentication

## Email Template Configuration

### Step 1: Access Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Email Templates**
3. Select the **Magic Link** template

### Step 2: Update the Email Template

Replace the default template with the following OTP template:

```html
<h2>Your Verification Code</h2>

<p>Hello,</p>

<p>Your verification code is:</p>

<h1 style="font-size: 48px; font-weight: bold; letter-spacing: 8px; text-align: center; color: #2563eb; margin: 30px 0;">
  {{ .Token }}
</h1>

<p>This code will expire in 60 minutes.</p>

<p>If you didn't request this code, please ignore this email.</p>

<p>Thanks,<br>The Truplace Team</p>
```

### Step 3: Important Template Variables

The key variable for OTP authentication is:

- `{{ .Token }}` - The 6-digit OTP code

**DO NOT use:**
- `{{ .ConfirmationURL }}` - This is for magic link authentication (deprecated)
- `{{ .SiteURL }}` - Not needed for OTP flow

### Step 4: Customize the Template (Optional)

You can enhance the email template with:

1. **Truplace Branding**: Add logo and brand colors (blue #2563eb, green #10b981)
2. **Better Formatting**: Add CSS styling for a professional look
3. **Security Information**: Add reminders about not sharing the code

Example enhanced template:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #374151;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px solid #e5e7eb;
    }
    .code-container {
      background: linear-gradient(to right, #eff6ff, #ecfdf5);
      border: 2px solid #2563eb;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      margin: 30px 0;
    }
    .code {
      font-size: 48px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #2563eb;
      margin: 20px 0;
    }
    .security-notice {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 2px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="color: #2563eb; margin: 0;">Truplace</h1>
  </div>

  <h2>Your Verification Code</h2>

  <p>Hello,</p>

  <p>You requested to sign in to Truplace. Use the verification code below to complete your authentication:</p>

  <div class="code-container">
    <p style="margin: 0; color: #6b7280; font-size: 14px;">YOUR VERIFICATION CODE</p>
    <div class="code">{{ .Token }}</div>
    <p style="margin: 0; color: #6b7280; font-size: 14px;">Valid for 60 minutes</p>
  </div>

  <div class="security-notice">
    <p style="margin: 0;"><strong>Security Notice:</strong> Never share this code with anyone. Truplace will never ask for your verification code.</p>
  </div>

  <p>If you didn't request this code, please ignore this email or contact our support team if you have concerns.</p>

  <div class="footer">
    <p>Thanks,<br>The Truplace Team</p>
    <p style="font-size: 12px; margin-top: 20px;">
      This is an automated message, please do not reply to this email.
    </p>
  </div>
</body>
</html>
```

## Testing the Setup

1. **Test the OTP Flow**:
   - Open the application
   - Click any action that requires authentication
   - Enter your email address
   - Check your inbox for the OTP code
   - Enter the 6-digit code in the application

2. **Test Resend Cooldown**:
   - After sending a code, try to resend immediately
   - Verify the 10-minute countdown displays correctly
   - Wait for cooldown to expire and test resend

3. **Test Invalid Code**:
   - Enter an incorrect 6-digit code
   - Verify error message displays properly
   - Verify the input turns red to indicate error

## Troubleshooting

### Code Not Received

1. Check spam/junk folder
2. Verify email template is saved correctly in Supabase
3. Check Supabase logs for email delivery errors
4. Verify email service is configured in Supabase

### Invalid Code Error

1. Ensure code hasn't expired (60 minutes)
2. Check for typos in the code
3. Request a new code if the old one expired
4. Verify the email matches the one used to request the code

### Template Not Working

1. Ensure you're editing the "Magic Link" template (Supabase uses this for OTP)
2. Verify `{{ .Token }}` is used (not `{{ .ConfirmationURL }}`)
3. Save changes and test again
4. Clear browser cache if needed

## Security Considerations

- Codes expire after 60 minutes
- 10-minute cooldown prevents spam/abuse
- Codes are single-use only
- Email validation prevents personal email addresses (work emails only)
- All authentication happens over HTTPS

## Next Steps

After configuring the email template:

1. Test the complete authentication flow
2. Monitor Supabase auth logs for any issues
3. Consider setting up custom SMTP for better email deliverability
4. Add monitoring for authentication failures

## Support

If you encounter issues:

- Check Supabase documentation: https://supabase.com/docs/guides/auth/auth-email-templates
- Review application logs for authentication errors
- Contact support at support@truplace.com
