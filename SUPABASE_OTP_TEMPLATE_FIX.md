# Supabase OTP Template Fix - Step by Step

## Current Issue
Your app says "We sent a 6-digit code" but users receive magic links instead. This is because the Supabase email template is configured for magic links, not OTP codes.

## The Fix (5 minutes)

### Step 1: Access Supabase Email Templates

1. Go to https://supabase.com/dashboard
2. Select your project from the list
3. In the left sidebar, click **"Authentication"**
4. Click **"Email Templates"** in the submenu

### Step 2: Edit the Magic Link Template

1. You'll see a list of email templates
2. Click on **"Magic Link"** template (this is used for OTP emails too)
3. You'll see the current template content in an editor

### Step 3: Check Current Template

Look for these elements in the template:
- `{{ .ConfirmationURL }}` - This sends magic links
- Links like `<a href="{{ .ConfirmationURL }}">Click here</a>`
- Buttons that say "Confirm your mail" or "Sign in"

If you see any of these, that's why you're getting magic links.

### Step 4: Replace Template with OTP Version

**Delete the entire current template** and replace it with this:

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #374151;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9fafb;
    }
    .container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 32px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 2px solid #e5e7eb;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #2563eb;
      margin: 0;
    }
    .content {
      padding: 32px 0;
    }
    h2 {
      color: #111827;
      font-size: 24px;
      margin: 0 0 16px 0;
    }
    .code-container {
      background: linear-gradient(to right, #eff6ff, #ecfdf5);
      border: 3px solid #2563eb;
      border-radius: 12px;
      padding: 32px;
      text-align: center;
      margin: 32px 0;
    }
    .code-label {
      margin: 0 0 8px 0;
      color: #6b7280;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .code {
      font-size: 48px;
      font-weight: bold;
      letter-spacing: 8px;
      color: #2563eb;
      margin: 16px 0;
      font-family: 'Courier New', monospace;
    }
    .code-validity {
      margin: 8px 0 0 0;
      color: #6b7280;
      font-size: 14px;
    }
    .security-notice {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 16px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .security-notice p {
      margin: 0;
      color: #991b1b;
      font-size: 14px;
    }
    .footer {
      text-align: center;
      padding-top: 24px;
      border-top: 2px solid #e5e7eb;
      color: #6b7280;
      font-size: 14px;
    }
    .footer-note {
      font-size: 12px;
      color: #9ca3af;
      margin-top: 16px;
    }
    p {
      margin: 0 0 16px 0;
      color: #4b5563;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo">TruPlace</h1>
    </div>

    <div class="content">
      <h2>Your Verification Code</h2>

      <p>Hello,</p>

      <p>You requested to sign in to TruPlace. Use the verification code below to complete your authentication:</p>

      <div class="code-container">
        <p class="code-label">Your Verification Code</p>
        <div class="code">{{ .Token }}</div>
        <p class="code-validity">Valid for 60 minutes</p>
      </div>

      <div class="security-notice">
        <p><strong>Security Notice:</strong> Never share this code with anyone. TruPlace will never ask for your verification code via email, phone, or any other method.</p>
      </div>

      <p>If you didn't request this code, you can safely ignore this email. Your account remains secure.</p>

      <p>Need help? Contact our support team at support@truplace.com</p>
    </div>

    <div class="footer">
      <p>Thanks,<br><strong>The TruPlace Team</strong></p>
      <p class="footer-note">
        This is an automated message. Please do not reply to this email.<br>
        © 2024 TruPlace. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
```

### Step 5: Save the Template

1. Click the **"Save"** button at the bottom of the template editor
2. You should see a success message confirming the template was saved

### Step 6: Wait for Changes to Propagate

Supabase needs a few minutes to apply the changes:
- Wait **2-3 minutes** before testing
- Changes may take up to 5-10 minutes to fully propagate globally

### Step 7: Test the OTP Flow

1. Clear your browser cache and cookies (or use an incognito window)
2. Go to your application
3. Click "Submit Review" or try to log in as admin
4. Enter your email address
5. Click "Send Verification Code"
6. **Check your email inbox**
7. You should now receive a **6-digit code** like "123456"
8. Enter the code in your app
9. Verify successful authentication

## Important Notes

### The Key Variable

The most important part of the template is this line:
```html
<div class="code">{{ .Token }}</div>
```

This `{{ .Token }}` variable is what makes Supabase send OTP codes instead of magic links.

### DO NOT Use These Variables

- `{{ .ConfirmationURL }}` - Sends magic links (what you had before)
- `{{ .SiteURL }}` - Not needed for OTP flow
- Any `<a href="...">` links - Not needed for OTP flow

### Template Customization

You can customize the template styling, but **DO NOT remove or change** the `{{ .Token }}` variable. That's the only thing that tells Supabase to send the OTP code.

## Troubleshooting

### Still Receiving Magic Links After 10 Minutes?

1. **Verify you saved the template**
   - Go back to Email Templates and check the Magic Link template
   - Confirm it contains `{{ .Token }}` and not `{{ .ConfirmationURL }}`

2. **Check you edited the correct template**
   - Make sure you edited "Magic Link" not "Invite User" or another template
   - The Magic Link template is used for OTP authentication

3. **Clear all caches**
   - Clear browser cache and cookies
   - Use a private/incognito window
   - Try a different email address

4. **Check Supabase logs**
   - Go to Authentication → Logs in Supabase Dashboard
   - Look for any errors related to email sending

5. **Verify Supabase email provider is enabled**
   - Go to Authentication → Providers
   - Ensure "Email" is enabled (toggle should be on)

### Code Not Received At All?

1. **Check spam/junk folder**
   - OTP emails sometimes get flagged as spam
   - Mark as "Not Spam" if found

2. **Verify email service is working**
   - Go to Authentication → Logs
   - Check for email delivery errors

3. **Check rate limiting**
   - You can only request a code once every 60 seconds
   - Wait for the cooldown period

4. **Try a different email address**
   - Some email providers have strict filters

### Invalid Code Error?

1. **Code expired**
   - Codes are valid for 60 minutes only
   - Request a new code if it expired

2. **Typos**
   - Double-check you entered all 6 digits correctly
   - Codes are case-sensitive (though usually all numbers)

3. **Email mismatch**
   - Make sure you're using the same email address
   - The email you enter in the app must match the one that received the code

4. **Code already used**
   - Each code can only be used once
   - Request a new code if you already tried one

## Alternative: Keep Magic Links

If you prefer magic links over OTP codes, you can keep the current template and update the application UI instead:

1. Keep the Supabase template with `{{ .ConfirmationURL }}`
2. Update `src/components/EmailVerificationModal.tsx` to show:
   - "We sent a login link to your email"
   - "Check your inbox and click the link to sign in"
3. Remove the OTP input component
4. Remove OTP verification logic

However, OTP codes provide a better user experience since users don't need to leave your app.

## Verification Checklist

After making the changes, verify:

- [ ] Supabase Magic Link template contains `{{ .Token }}`
- [ ] Template does NOT contain `{{ .ConfirmationURL }}`
- [ ] Template is saved successfully
- [ ] Waited 2-3 minutes for changes to propagate
- [ ] Tested with a real email address
- [ ] Received a 6-digit code (not a link)
- [ ] Code works when entered in the app
- [ ] Resend functionality works correctly
- [ ] Error handling works for invalid codes

## Success Indicators

You'll know it's working when:

1. Email subject line says something about "Verification Code" or "OTP"
2. Email body displays a 6-digit number (e.g., "123456")
3. No clickable links in the email body
4. Code can be entered in the app's OTP input field
5. Authentication succeeds after entering the code

## Need More Help?

If you're still having issues after following all these steps:

1. Double-check every step above
2. Review the `OTP_CONFIGURATION_FIX.md` file for additional troubleshooting
3. Check Supabase status page: https://status.supabase.com
4. Review Supabase documentation: https://supabase.com/docs/guides/auth/passwordless-login/auth-email-otp
5. Contact Supabase support if template changes don't take effect

## Summary

The issue is NOT in your application code. The code is correct and already configured for OTP authentication. The only change needed is in the Supabase Dashboard email template. Replace `{{ .ConfirmationURL }}` with `{{ .Token }}` and save.
