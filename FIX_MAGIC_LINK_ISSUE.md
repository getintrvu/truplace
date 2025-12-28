# Fix: Magic Links Instead of OTP Codes

## The Problem

Your application is showing "We sent a 6-digit code" but Supabase is sending magic links with clickable URLs instead of OTP codes. This is a configuration issue, not a code bug.

## The Root Cause

Supabase's `signInWithOtp()` function sends **magic links by default**. To send OTP codes, you must update the email template to use `{{ .Token }}` instead of `{{ .ConfirmationURL }}`.

## The Solution

### Step 1: Update Supabase Email Template

1. Open https://supabase.com/dashboard
2. Select your project
3. Go to: **Authentication** → **Email Templates**
4. Click on: **"Magic Link"** template
5. Replace the entire template with the one in `SUPABASE_OTP_TEMPLATE_FIX.md`
6. Click **Save**
7. Wait 2-3 minutes for changes to propagate

### Step 2: Test the Fix

1. Clear browser cache or use incognito mode
2. Try to authenticate in your app
3. Check your email
4. You should now receive a **6-digit code** (e.g., "123456")
5. Enter the code in the app

## Quick Reference

The key change is this template variable:
- **OLD (Magic Link):** `{{ .ConfirmationURL }}`
- **NEW (OTP Code):** `{{ .Token }}`

## Documentation

Three guides are available:

1. **SUPABASE_OTP_TEMPLATE_FIX.md** - Complete step-by-step guide with full template
2. **OTP_CONFIGURATION_FIX.md** - Detailed explanation and troubleshooting
3. **QUICK_FIX_OTP_ISSUE.md** - 2-minute quick fix summary

## New Features Added

To help diagnose OTP issues, the following debug tools have been added:

### Development Console Logging

In development mode, you'll now see detailed OTP logs:
- OTP send attempts and results
- OTP verification attempts and results
- Configuration status on app startup

### Debug Tools in Browser Console

In development, type in the browser console:
```javascript
window.__otpDebug.logStatus()     // Check OTP configuration
window.__otpDebug.checkConfig()   // Validate configuration
window.__otpDebug.getInfo()       // Get configuration details
```

### What Gets Logged

When you send an OTP:
```
📧 Attempting to send OTP to: user@example.com
✅ OTP send request successful
📬 Check your email inbox for the code
⚠️ If you receive a magic link instead of a code, see: SUPABASE_OTP_TEMPLATE_FIX.md
```

When you verify an OTP:
```
🔑 Attempting to verify OTP
Email: user@example.com
Token Length: 6 ✅
✅ OTP verification successful
🎉 User authenticated
```

### Configuration Check on Startup

When the app starts in development mode, you'll see:
```
🔐 OTP Authentication Status
Supabase Configured: ✅
Supabase URL: https://your-project.supabase.co
Anon Key Present: ✅
Testing Mode: ✅ Disabled
Personal Emails: ✅ Blocked
```

## Code Changes Made

The following files were created or modified:

### New Files
- `src/lib/otpDebug.ts` - Debug logging utilities
- `SUPABASE_OTP_TEMPLATE_FIX.md` - Complete fix guide
- `FIX_MAGIC_LINK_ISSUE.md` - This file

### Modified Files
- `src/lib/supabase.ts` - Added debug logging to `sendOTP()` and `verifyOTP()`
- `src/main.tsx` - Added OTP status logging on app startup (dev mode only)
- `README.md` - Added prominent OTP configuration notice

### No Changes Needed
- Application code was already correct
- UI components are properly configured
- Email verification flow works as designed

## Important Notes

1. **No code changes fix this** - This is a Supabase Dashboard configuration issue
2. **Debug logging is dev-only** - Production builds have no extra logging
3. **Testing mode still works** - `VITE_DISABLE_AUTH_FOR_TESTING=true` bypasses OTP entirely
4. **Application code was correct** - The UI and authentication flow were properly implemented

## Why This Happens

Supabase uses the same `signInWithOtp()` method for both magic links and OTP codes. The email template determines which gets sent:

- Template with `{{ .ConfirmationURL }}` = Magic link
- Template with `{{ .Token }}` = OTP code

By default, Supabase projects use magic link templates. You must manually change it to use OTP codes.

## After Fixing

Once the template is updated:

1. Users receive 6-digit codes via email
2. Users enter codes in the app (not clicking links)
3. Authentication happens without leaving the app
4. Better user experience overall

## Verification Checklist

- [ ] Updated Supabase Magic Link template
- [ ] Template contains `{{ .Token }}`
- [ ] Template does NOT contain `{{ .ConfirmationURL }}`
- [ ] Saved template successfully
- [ ] Waited 2-3 minutes for propagation
- [ ] Tested with real email
- [ ] Received 6-digit code (not link)
- [ ] Code works in app
- [ ] Resend functionality works

## Still Having Issues?

If you still receive magic links after following all steps:

1. Double-check you edited the "Magic Link" template (not another one)
2. Verify the template is saved (refresh the page to confirm)
3. Wait 10 minutes for global propagation
4. Clear all browser caches
5. Try a different email address
6. Check Supabase logs: Authentication → Logs
7. Review detailed troubleshooting in `OTP_CONFIGURATION_FIX.md`

## Support Resources

- Supabase OTP Docs: https://supabase.com/docs/guides/auth/passwordless-login/auth-email-otp
- Supabase Email Templates: https://supabase.com/docs/guides/auth/auth-email-templates
- Supabase Status: https://status.supabase.com

## Summary

**Problem:** Receiving magic links instead of OTP codes
**Cause:** Supabase email template configured for magic links
**Solution:** Update template to use `{{ .Token }}` instead of `{{ .ConfirmationURL }}`
**Time:** 5 minutes to fix
**Complexity:** Configuration change (no coding required)
**Application Code:** Already correct, no changes needed
