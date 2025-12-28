# Quick Diagnostic Checklist

## Critical Questions

### 1. Did you save the template?
After pasting the new template in the Supabase Dashboard, did you click the "Save" button and see a success message?

### 2. Which template did you edit?
Go to: **Authentication → Email Templates**

You should see multiple templates:
- **Confirm signup**
- **Invite user**
- **Magic Link** ← THIS ONE
- **Change Email Address**
- **Reset Password**

Did you edit the **"Magic Link"** template specifically?

### 3. Does the template have the token variable?
Open the Magic Link template and press `Ctrl+F` (or `Cmd+F` on Mac) to search for:
- Search for: `{{ .Token }}`
- If NOT found: ❌ Template is wrong
- If found: ✅ Template is correct

Then search for:
- Search for: `{{ .ConfirmationURL }}`
- If found: ❌ Remove this completely
- If NOT found: ✅ Template is correct

### 4. How long has it been?
When did you save the template?
- Less than 3 minutes ago: Wait longer
- 3-10 minutes ago: Should work soon
- More than 10 minutes: Something's wrong

### 5. Are you testing correctly?
- Clear browser cache and cookies ✅
- Use incognito/private window ✅
- Request a NEW code (don't reuse old emails) ✅
- Wait 60 seconds between requests ✅

## Quick Test

1. Open your browser's **incognito/private mode**
2. Go to your app
3. Try to authenticate with a fresh email or request a new code
4. Check the email you just received (not old ones)
5. Look for a 6-digit number vs a clickable link

## What the Email Should Look Like

### CORRECT (OTP Code):
```
Subject: Your verification code for TruPlace

Hi,

Your verification code is:

    ┌─────────┐
    │ 123456  │
    └─────────┘

Valid for 60 minutes.
```

### INCORRECT (Magic Link):
```
Subject: Confirm your email

Hi,

Click the button below to sign in:

[Confirm your mail] ← Clickable button

Or copy this link: https://xxx.supabase.co/auth/v1/verify?token=xxx
```

## If Template is Saved Correctly

If your template has `{{ .Token }}` and NO `{{ .ConfirmationURL }}`, but you're still getting magic links:

### Check Auth Settings:

1. Go to Supabase Dashboard
2. Click **Authentication** in left sidebar
3. Click **Settings** (gear icon or tab)
4. Scroll to **"Email Auth"** section
5. Find **"Enable email confirmations"**
6. Make sure it's **OFF** (toggle should be gray/disabled)

**Why?** When "Enable email confirmations" is ON, Supabase may override OTP and send confirmation links instead.

### Check Rate Limiting:

You can only request one code per email every 60 seconds. If you're testing repeatedly:
- Wait 60 seconds between attempts
- Or use different email addresses
- Or restart your Supabase project (extreme, not recommended)

## Browser Console Check

1. Open your app in dev mode
2. Press `F12` to open browser console
3. Look for this log when the app starts:
```
🔐 OTP Authentication Status
Supabase Configured: ✅
Testing Mode: ✅ Disabled
```

4. Try to send a code and look for:
```
📧 Attempting to send OTP to: your@email.com
✅ OTP send request successful
⚠️ If you receive a magic link instead of a code, see: SUPABASE_OTP_TEMPLATE_FIX.md
```

This confirms your code is working correctly and calling the right Supabase function.

## Template Verification

Copy this exact template to make sure there are no errors:

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2563eb;">TruPlace</h1>
    <h2>Your Verification Code</h2>
    <p>Hello,</p>
    <p>You requested to sign in to TruPlace. Use the verification code below:</p>
    <div style="background: #f0f9ff; border: 3px solid #2563eb; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
      <p style="margin: 0; font-size: 12px; color: #666;">VERIFICATION CODE</p>
      <div style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #2563eb; margin: 10px 0;">{{ .Token }}</div>
      <p style="margin: 0; font-size: 14px; color: #666;">Valid for 60 minutes</p>
    </div>
    <p><strong>Security Notice:</strong> Never share this code with anyone.</p>
    <p>If you didn't request this code, you can safely ignore this email.</p>
    <p>Thanks,<br><strong>The TruPlace Team</strong></p>
  </div>
</body>
</html>
```

**Key line:** `{{ .Token }}` - This MUST be in your template.

## Still Not Working?

### Option A: Screenshot Check
Take a screenshot of:
1. The Supabase Email Templates page showing the Magic Link template
2. The email you're receiving

This will help identify exactly what's wrong.

### Option B: Try Test Mode
Edit your `.env` file:
```
VITE_DISABLE_AUTH_FOR_TESTING=true
```

This bypasses email entirely for testing. Not for production, but helps verify the rest of your app works.

### Option C: Check Supabase Project Region
Sometimes template changes take longer in certain regions:
- US: Usually 2-3 minutes
- EU: Usually 3-5 minutes
- Asia: Usually 5-10 minutes

Wait up to 15 minutes for global propagation.

### Option D: Contact Supabase Support
If after 24 hours the template still doesn't work:

1. Go to https://supabase.com/dashboard/support
2. Click "New Support Ticket"
3. Select "Technical Issue"
4. Describe: "Email template changes for Magic Link not taking effect. Changed {{ .ConfirmationURL }} to {{ .Token }} but still receiving magic links instead of OTP codes."
5. Include: Project ID, timestamp of change, screenshot of template

## Summary

**Your app code is correct.** The issue is 100% in the Supabase Dashboard configuration.

Most likely causes (in order):
1. Didn't wait long enough (wait 10 min)
2. Edited wrong template (must be "Magic Link")
3. Template not saved correctly (click Save)
4. Email confirmations enabled (turn OFF)
5. Looking at old cached emails (test fresh)
