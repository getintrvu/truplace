# OTP Instant Expiry Diagnostic Guide

## Problem Description

You've configured the Email OTP Expiration to **3600 seconds (1 hour)** in the Supabase Dashboard, but OTP codes are expiring instantly or within seconds of being sent.

## Enhanced Diagnostic Features

We've added comprehensive logging to help diagnose this issue. When running in development mode, you'll now see:

### When Sending OTP:
- Exact timestamp when code was sent
- Expected expiry time (1 hour from send)
- Full Supabase response data
- Timestamp stored in sessionStorage for tracking

### When Verifying OTP:
- Time elapsed since code was sent (in minutes and seconds)
- Whether code should still be valid based on configuration
- Detailed error analysis if verification fails
- **CRITICAL ALERT** if code expired in less than 1 minute

## How to Use the Enhanced Diagnostics

1. **Open Browser Console** (F12 or Right-click → Inspect → Console tab)

2. **Trigger OTP Send**: Request a verification code

3. **Look for these logs**:
   ```
   🔧 Sending OTP with options: {...}
   📦 Supabase signInWithOtp response: {...}
   ✅ OTP Send Success
   ```

4. **Enter the OTP code** when you receive it

5. **Check verification logs**:
   ```
   🔑 OTP Verification Attempt
   ⏱️ Time elapsed: Xm Ys (X seconds total)
   ```

6. **If instant expiry occurs**, you'll see:
   ```
   🚨 CRITICAL: Code expired in less than 1 minute!
   🚨 This indicates a Supabase configuration issue!
   ```

## Common Causes and Solutions

### 1. Configuration Propagation Delay

**Issue**: Supabase configuration changes can take 5-10 minutes to propagate across their infrastructure.

**Solution**:
- Wait 10 minutes after changing the setting
- Clear browser cache and cookies
- Try again with a fresh OTP code

**How to verify**:
- Go to Supabase Dashboard → Authentication → Email Auth
- Confirm "Email OTP Expiration" shows **3600** seconds
- Take a screenshot to confirm the setting

### 2. Supabase Project Configuration Override

**Issue**: There might be project-level or organization-level settings overriding your configuration.

**Solution**:
```bash
# Check if there are any auth configuration overrides
# In Supabase Dashboard, go to:
# Settings → API → Project API keys
# Check if JWT expiry is set very low
```

**Check**:
1. JWT expiry should be reasonable (not 60 seconds)
2. Session timeout should allow OTP verification
3. Rate limiting should not block OTP verification

### 3. Email Template Configuration

**Issue**: If you're using custom email templates, they might have hardcoded expiry times or use magic links instead of OTP codes.

**Solution**:
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Check the "Confirm signup" or "Magic Link" template
3. Ensure it uses `{{ .Token }}` for OTP codes, not `{{ .ConfirmationURL }}`
4. Reset to default template if modified

### 4. Supabase Platform Issue

**Issue**: This might be a known Supabase bug or platform limitation.

**Solution**:
1. Check Supabase Status: https://status.supabase.com/
2. Search Supabase GitHub Issues: https://github.com/supabase/supabase/issues
3. Search for "OTP expiry" or "OTP expires immediately"

**Create Support Ticket**:
If this is a Supabase issue, create a support ticket with:
- Your project reference
- Screenshot of your OTP expiration setting (3600 seconds)
- Console logs showing instant expiry
- Time elapsed logs from our enhanced diagnostics

### 5. Browser/Network Time Sync Issues

**Issue**: If your system clock or browser time is out of sync, it might affect OTP validation.

**Solution**:
1. Verify system time is correct
2. Enable automatic time sync
3. Try a different browser or incognito mode
4. Try from a different network

### 6. Rate Limiting or Security Policies

**Issue**: Aggressive rate limiting or security policies might be invalidating tokens immediately.

**Solution**:
1. Check Supabase Dashboard → Authentication → Rate Limits
2. Temporarily disable rate limiting for testing
3. Check if there are any custom security policies in place

## Advanced Debugging

### Check Supabase Auth Logs

1. Go to Supabase Dashboard → Logs → Auth Logs
2. Look for recent OTP send/verify events
3. Check for any error messages or warnings
4. Look for rate limiting or security policy violations

### Inspect Network Requests

1. Open Browser DevTools → Network tab
2. Filter for "auth" requests
3. Look at the response from `signInWithOtp`:
   - Check if there's any expiry information in the response
   - Look for any warning headers
4. Look at the request to `verifyOtp`:
   - Check the error response body
   - Look for specific error codes

### Test with cURL

Create a direct API test to isolate the issue:

```bash
# Send OTP
curl -X POST 'https://YOUR_PROJECT.supabase.co/auth/v1/otp' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Note the timestamp
# Wait a few seconds
# Try to verify (you'll need the actual code from email)

curl -X POST 'https://YOUR_PROJECT.supabase.co/auth/v1/verify' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"email","email":"test@example.com","token":"123456"}'
```

## Workaround: Custom OTP Management

If Supabase OTP continues to fail, consider implementing a custom OTP system:

### Option 1: Use Supabase Edge Function

Create a custom OTP system using:
- Generate random 6-digit codes
- Store in database with custom expiry (3600 seconds)
- Send via email using edge function
- Verify against database

### Option 2: Use Magic Links Instead

Switch from OTP to magic links temporarily:
- Magic links typically have longer expiry
- More reliable in Supabase
- Similar security profile

## Next Steps

1. **Check the console logs** when sending and verifying OTP
2. **Note the exact time elapsed** when codes fail
3. **Wait 10 minutes** after changing Supabase settings
4. **Try again** with a fresh code
5. **If still failing in < 60 seconds**, this is a Supabase platform issue
6. **Contact Supabase Support** with the diagnostic information

## Diagnostic Checklist

- [ ] Verified Supabase Dashboard shows 3600 seconds
- [ ] Waited 10+ minutes after configuration change
- [ ] Cleared browser cache and cookies
- [ ] Tested in incognito/private mode
- [ ] Checked Supabase Auth logs for errors
- [ ] Confirmed system time is correct
- [ ] Verified no rate limiting issues
- [ ] Checked for custom email template issues
- [ ] Reviewed network requests in DevTools
- [ ] Noted exact time elapsed from console logs
- [ ] Checked Supabase Status page
- [ ] Searched GitHub issues for similar problems

## Contact Information

If you need to escalate this issue:

**Supabase Support**:
- Dashboard: Settings → Support
- Discord: https://discord.supabase.com/
- GitHub Issues: https://github.com/supabase/supabase/issues

**Include in Support Request**:
1. Project reference/URL
2. Screenshot of OTP expiration setting (3600s)
3. Console logs showing time elapsed
4. Exact error messages
5. Steps to reproduce
6. When the issue started occurring

## Emergency Fallback

If you need immediate functionality and cannot wait for Supabase resolution:

1. Set `VITE_DISABLE_AUTH_FOR_TESTING=true` in `.env` (DEVELOPMENT ONLY)
2. Use magic links instead of OTP codes
3. Implement custom authentication system
4. Contact Supabase support to resolve the underlying issue

**WARNING**: Never use `VITE_DISABLE_AUTH_FOR_TESTING=true` in production!
