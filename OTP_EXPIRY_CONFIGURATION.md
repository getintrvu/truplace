# OTP Expiry Configuration Guide

This guide explains how to configure OTP (One-Time Password) expiry duration in Supabase to match the application's 1-hour (3600 seconds) code validity period.

## Overview

The TruPlace application is configured to use a **1-hour (3600 seconds)** OTP expiry duration. This means:
- Users have 1 hour to enter their verification code after receiving it
- After 1 hour, the code becomes invalid and users must request a new one
- The resend functionality is also tied to this 1-hour window

## Application Configuration

The following components are configured for 3600-second (1 hour) OTP expiry:

### Frontend Components

1. **EmailVerificationModal** (`src/components/EmailVerificationModal.tsx`)
   - Resend cooldown: 3600 seconds (1 hour)
   - Code expiry countdown: 3600 seconds (1 hour)
   - Displays expiration timer to users
   - Shows "Valid for 1 hour" message
   - Provides clear error messages for expired codes

2. **OTP Debug Utilities** (`src/lib/otpDebug.ts`)
   - Logs code send time and expiry time
   - Tracks verification attempts with timestamps
   - Provides detailed error messages for expired codes

## Supabase Dashboard Configuration

**IMPORTANT:** You must configure the OTP expiry duration in your Supabase Dashboard to match the application's 1-hour setting.

### Step-by-Step Instructions

1. **Navigate to Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Open Authentication Settings**
   - Click on "Authentication" in the left sidebar
   - Click on "Providers" or "Settings"
   - Scroll to find "Email" provider settings

3. **Configure OTP Expiry**
   - Look for "OTP Expiry Duration" or "Token Expiry" setting
   - Set the value to **3600** seconds (or 60 minutes / 1 hour)
   - The default is often 60 seconds or 300 seconds - you need to change this

4. **Save Changes**
   - Click "Save" to apply the changes
   - The new expiry duration will apply to all new OTPs generated after this change

### Alternative Configuration Method

If the Supabase Dashboard doesn't provide a UI option for OTP expiry, you may need to:

1. Use Supabase CLI or API to update the configuration
2. Contact Supabase support for guidance
3. Check your project's authentication configuration in the Supabase API

## Email Template Configuration

The OTP email template should also reflect the 1-hour validity period.

### Updating Email Template in Supabase Dashboard

1. **Navigate to Email Templates**
   - In Supabase Dashboard → Authentication → Email Templates
   - Select "Magic Link" or "OTP" template

2. **Update the Template**
   - Find the line that mentions code validity (e.g., "Valid for 60 minutes")
   - Ensure it says **"Valid for 1 hour"** or **"Valid for 60 minutes"**
   - Example message: "Your verification code is valid for 1 hour"

3. **Template Variables**
   - Use `{{ .Token }}` for the 6-digit OTP code
   - Include clear expiry information in the template

## Testing the Configuration

After configuring the OTP expiry, test the implementation:

1. **Request a Verification Code**
   - Enter your email in the verification modal
   - Check the browser console for debug logs showing:
     - Code sent time
     - Code expiry time
     - "Code valid for: 1 hour (3600 seconds)"

2. **Verify the Countdown Timer**
   - The modal should show a countdown timer
   - Format: "Code expires in HH:MM"
   - Should count down from 59:59 (1 hour)

3. **Test Expiry Behavior**
   - Wait for the code to expire (or manually test with an old code)
   - Verify error message: "Verification code has expired. Please request a new one."
   - Confirm resend button works correctly

4. **Check Email Content**
   - Verify the email mentions 1-hour validity
   - Confirm it displays a 6-digit code (not a magic link)

## Troubleshooting

### Code Expires Too Quickly

If users report codes expiring too quickly:
1. Check Supabase Dashboard → Authentication → Email settings
2. Verify OTP Expiry is set to 3600 seconds
3. Check browser console logs for actual expiry time
4. Clear browser cache and test again

### Code Expires Too Slowly

If codes remain valid longer than 1 hour:
1. Supabase may be using a different default
2. Check if there are multiple OTP configurations
3. Verify the setting was saved correctly

### Resend Button Issues

If resend button doesn't work as expected:
1. Check `resendCooldown` state in EmailVerificationModal
2. Verify it's set to 3600 seconds
3. Check browser console for errors
4. Ensure the countdown timer is working

### Email Shows Magic Link Instead of Code

If users receive a magic link instead of a 6-digit code:
1. Check the email template type in Supabase Dashboard
2. Ensure you're using "OTP" template, not "Magic Link"
3. See `SUPABASE_OTP_TEMPLATE_FIX.md` for detailed instructions

## Security Considerations

The 1-hour OTP expiry duration balances security and user experience:

### Security Benefits
- Codes automatically expire after 1 hour, limiting the window for unauthorized access
- Users must request new codes frequently
- Reduces risk of code interception and reuse

### User Experience Benefits
- Users have sufficient time to check email and enter code
- Reduces frustration from too-short expiry periods
- Minimizes need for multiple resend requests

### Best Practices
- Monitor code usage patterns in Supabase logs
- Consider implementing rate limiting for OTP requests
- Track failed verification attempts
- Alert users when code is about to expire

## Code References

Key files implementing the 3600-second OTP expiry:

- `src/components/EmailVerificationModal.tsx:118` - Resend cooldown
- `src/components/EmailVerificationModal.tsx:119` - Code expiry timer
- `src/components/EmailVerificationModal.tsx:158-160` - Expired code error handling
- `src/lib/otpDebug.ts:58-67` - OTP send logging with expiry
- `src/lib/otpDebug.ts:94-96` - Expired code error logging

## Summary

To ensure proper OTP functionality with 1-hour expiry:

1. ✅ Application code is already configured for 3600 seconds
2. ⚠️  **YOU MUST** set OTP expiry to 3600 seconds in Supabase Dashboard
3. ✅ Email template should mention "Valid for 1 hour"
4. ✅ Test the complete flow after configuration
5. ✅ Monitor logs for any expiry-related issues

## Support

If you encounter issues with OTP configuration:
- Check browser console for detailed debug logs
- Review Supabase Dashboard authentication logs
- See other documentation files in this project:
  - `OTP_EMAIL_SETUP.md`
  - `SUPABASE_OTP_TEMPLATE_FIX.md`
  - `QUICK_FIX_OTP_ISSUE.md`
