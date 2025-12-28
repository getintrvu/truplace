# OTP Authentication Issue - Magic Link vs OTP Code

## Problem

The application UI displays "We sent a 6-digit code to your email" but Supabase is actually sending magic links instead of OTP codes. This is a common configuration issue with Supabase Auth.

## Root Cause

Supabase's `signInWithOtp()` function behaves differently depending on your project's authentication settings:

- **Magic Link Mode** (default): Sends a clickable link that logs you in
- **Email OTP Mode**: Sends a 6-digit code that must be entered in the app

By default, Supabase sends magic links, not OTP codes.

## Solution: Enable Email OTP in Supabase

### Step 1: Access Supabase Auth Settings

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Find the **Email** provider section

### Step 2: Enable Email OTP

1. Click on the **Email** provider to expand settings
2. Look for **Email Authentication Method** or **OTP Type** settings
3. You should see options like:
   - ✓ **Email OTP** (6-digit code)
   - **Magic Link** (clickable URL)
4. **Enable "Email OTP"** if it's not already enabled
5. **Disable "Magic Link"** if you only want OTP codes (optional but recommended)
6. Click **Save**

### Step 3: Configure Email Template

1. Navigate to **Authentication** → **Email Templates**
2. Select **Magic Link** template (Supabase uses this template for OTP emails too)
3. Ensure your template uses `{{ .Token }}` to display the OTP code
4. The current template should already be configured correctly (see `OTP_EMAIL_SETUP.md`)

### Step 4: Verify OTP Configuration

Test that OTP codes are being sent:

1. Open your application
2. Click "Submit Review" or try to log in as admin
3. Enter your email address
4. Click "Send Verification Code"
5. **Check your email** - you should receive:
   - ✓ A **6-digit code** (e.g., "123456")
   - ✗ NOT a clickable magic link

If you still receive magic links after completing these steps, proceed to Step 5.

### Step 5: Additional Configuration (If Needed)

Some Supabase projects may require additional configuration:

1. Navigate to **Authentication** → **URL Configuration**
2. Check **Site URL** and **Redirect URLs** settings
3. Ensure these are configured correctly for your application

4. Navigate to **Authentication** → **Auth Providers** → **Email**
5. Look for advanced settings:
   - **Confirm email**: Can be disabled for passwordless auth
   - **Secure email change**: Recommended to keep enabled
   - **Double confirm email changes**: Optional

## Alternative: Update UI to Match Magic Link Behavior

If you prefer to use magic links instead of OTP codes, update the UI:

### Option A: Magic Link Flow

1. Update `src/components/EmailVerificationModal.tsx` to show magic link instructions
2. Remove the OTP input component
3. Display message: "We sent a login link to your email. Click the link to sign in."
4. Remove OTP verification logic

This approach is simpler but less seamless (users must switch to email client and click link).

## Recommended Solution

**Use Email OTP (6-digit codes)** - This provides the best user experience:
- Users stay in your app
- No context switching to email
- Faster authentication flow
- More modern UX pattern

## Verification Steps

After enabling Email OTP:

1. Test the authentication flow
2. Verify you receive a 6-digit code (not a link)
3. Enter the code in the app
4. Confirm successful authentication
5. Test the resend functionality
6. Test invalid code error handling

## Common Issues

### Still Receiving Magic Links

- Clear browser cache and cookies
- Wait 5 minutes for settings to propagate
- Check Supabase logs for any configuration errors
- Verify you saved all settings in Step 2

### Code Not Received

- Check spam/junk folder
- Verify email template is saved
- Check Supabase email delivery logs
- Ensure email provider is configured

### Invalid Code Error

- Codes expire after 60 minutes
- Each code can only be used once
- Email must match the one used to request code
- Wait for cooldown period before requesting new code

## Technical Details

### Current Implementation

The application uses:
```typescript
// In src/lib/supabase.ts
export const sendOTP = async (email: string) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  // ...
};

export const verifyOTP = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  });
  // ...
};
```

This code is correct and will work with both magic links and OTP codes, depending on your Supabase configuration.

### How It Works

1. User enters email
2. `signInWithOtp()` is called
3. Supabase checks your project settings:
   - If **Email OTP** enabled → Sends 6-digit code
   - If **Magic Link** enabled → Sends clickable link
4. For OTP: User enters code, app calls `verifyOtp()`
5. For Magic Link: User clicks link, automatically authenticated

## Support

If you continue experiencing issues:

1. Check Supabase status: https://status.supabase.com
2. Review Supabase Auth documentation: https://supabase.com/docs/guides/auth/auth-email
3. Check Supabase Dashboard logs for error messages
4. Contact Supabase support if configuration options are not visible

## Summary

The application code is correct. The issue is a **Supabase project configuration** problem. Follow Steps 1-2 above to enable Email OTP in your Supabase Dashboard, and the application will work as designed.
