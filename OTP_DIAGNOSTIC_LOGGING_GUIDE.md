# OTP Diagnostic Logging Guide

## What's Been Implemented

Enhanced diagnostic logging has been added to capture the EXACT Supabase responses and help identify why OTP codes are expiring instantly.

---

## New Features

### 1. **Enhanced signInWithOtp Logging**
Location: `src/lib/supabase.ts` (lines 98-115)

When you request an OTP code, you'll now see:
- Full response object structure with all keys
- Complete data object (user, session)
- Complete error object (message, status, code)
- Timestamp of the request

### 2. **Enhanced verifyOtp Logging**
Location: `src/lib/supabase.ts` (lines 150-186)

When you verify an OTP code, you'll now see:
- Exact parameters being sent (email, token length, type)
- Token preview (first 2 and last 2 digits for security)
- Response time in milliseconds
- Complete response structure
- All error details (message, status, code, details, hint)
- Which verification type is being used ('email' or 'magiclink')

### 3. **Raw Error Logging**
Location: `src/components/EmailVerificationModal.tsx`

All catch blocks now log the complete raw error BEFORE translating to user-friendly messages:
- Line 156-169: verifyOTP errors
- Line 123-132: sendOTP errors
- Line 219-228: resend OTP errors

### 4. **Type Testing Feature**
Location: `src/lib/supabase.ts` (lines 146-148)

You can now test using different OTP types by setting an environment variable.

### 5. **Supabase Client Configuration Logging**
Location: `src/lib/supabase.ts` (lines 19-31)

On app startup in dev mode, you'll see complete Supabase configuration details.

---

## How to Use the Diagnostics

### Test 1: Standard Test with 'email' Type (Current)

1. Open your browser console (F12)
2. Clear the console
3. Request an OTP code
4. Look for logs marked:
   - `=== DETAILED SIGNINWITHOTP RESPONSE START ===`
   - `=== VERIFYOTP CALL START ===`
5. Immediately enter the code when you receive it
6. Look for:
   - `=== VERIFYOTP CALL END ===`
   - `=== RAW VERIFYOTP ERROR START ===` (if it fails)

**What to capture:**
- The ENTIRE console output from start to finish
- Take screenshots if needed
- Note the exact timestamps and elapsed times

### Test 2: Try 'magiclink' Type

Sometimes Supabase internally treats OTP codes as magic link tokens. Let's test this:

1. **Add to your `.env` file:**
   ```
   VITE_OTP_USE_EMAIL_TYPE=false
   ```

2. **Restart your dev server** (important!)

3. Clear browser console

4. Request an OTP code

5. You should see in the logs:
   ```
   type: magiclink
   ```

6. Enter the code and check if it works

7. Compare the error messages between 'email' and 'magiclink' types

### Test 3: Back to 'email' Type

1. **Remove or change your `.env` file:**
   ```
   VITE_OTP_USE_EMAIL_TYPE=true
   ```
   Or just remove the line entirely (defaults to true)

2. **Restart your dev server**

3. Test again and compare results

---

## What to Look For in the Logs

### In signInWithOtp Response:

Check if Supabase returns any metadata about the OTP:
```
Data Object: {
  "user": null,
  "session": null
  // Any other fields?
}
```

### In verifyOtp Response:

If you get an error, look for:

1. **Error.code** - Supabase-specific error code (e.g., 'otp_expired', 'invalid_otp', 'token_expired')
2. **Error.status** - HTTP status code (400, 401, etc.)
3. **Error.message** - Exact error message from Supabase
4. **Error.details** - Additional error context
5. **Error.hint** - Supabase hints about what went wrong

### Example Error Output to Share:

```
=== VERIFYOTP CALL START ===
Parameters being sent:
  email: user@company.com
  token (masked): 12****56
  token (full length): 6
  type: email
  VITE_OTP_USE_EMAIL_TYPE env var: undefined

Response received in: 234ms
Error Object: {
  "message": "Token has expired or is invalid",
  "status": 400,
  "code": "otp_expired"
}
=== VERIFYOTP CALL END ===
```

---

## Key Questions to Answer

After running the tests, we need to know:

1. **What exact error code does Supabase return?**
   - Look for `Error.code` in the logs

2. **How long does verification take?**
   - Look for "Response received in: XX ms"

3. **Are there any differences between 'email' and 'magiclink' types?**
   - Compare error messages between both tests

4. **Does Supabase return any hints?**
   - Look for `Error.hint` or `Error.details`

5. **Is the token format correct?**
   - Verify "token (full length): 6"

---

## Checking Supabase Client Configuration

On page load, you'll see:
```
=== SUPABASE CLIENT CONFIGURATION ===
URL: https://xxxxx.supabase.co
Anon Key Present: true
Anon Key (first 20 chars): eyJhbGciOiJIUzI1NiIs...
Auth Settings: {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}
OTP Type Test Mode: email
=====================================
```

Verify:
- URL is correct
- Anon key is present
- OTP type mode shows your current setting

---

## Next Steps After Testing

Once you've captured the console logs:

1. **Share the complete console output** - especially the sections marked with `===`
2. **Note which test type worked/failed** - 'email' vs 'magiclink'
3. **Include the exact error code** - from `Error.code`
4. **Note the timing** - "Response received in: XX ms"

This information will definitively show us:
- What Supabase is actually returning
- Whether it's a type mismatch issue
- If there's a server-side configuration problem
- The actual error codes to work with

---

## Troubleshooting the Diagnostics

### Logs Not Appearing?

Check:
1. You're in development mode (not production build)
2. Browser console is open (F12 → Console tab)
3. Console filters are not hiding logs

### Environment Variable Not Working?

1. Restart your dev server after changing `.env`
2. Check the "OTP Type Test Mode" in the startup logs
3. Verify no typos in variable name: `VITE_OTP_USE_EMAIL_TYPE`

### Still Getting Instant Expiry?

If both 'email' and 'magiclink' types fail, it points to:
1. Server-side Supabase configuration issue
2. Email template configuration problem
3. Time synchronization issue between client/server

---

## Summary

This enhanced logging will show us EXACTLY what Supabase returns, which will allow us to:
- See the real error codes (not translated messages)
- Test different verification types
- Identify timing issues
- Spot any configuration mismatches

The logs are verbose on purpose - we need all the detail to diagnose this issue properly.
