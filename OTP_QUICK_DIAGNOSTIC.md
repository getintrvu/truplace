# Quick OTP Expiry Diagnostic

## The Problem
OTP codes configured for 3600 seconds (1 hour) are expiring instantly.

## Quick Check (2 minutes)

### Step 1: Verify Configuration
1. Open Supabase Dashboard → Authentication → Email Auth
2. Confirm "Email OTP Expiration" = **3600** seconds
3. If you just changed it, **wait 10 minutes** for propagation

### Step 2: Test with Enhanced Logging
1. Open your app
2. Open browser console (F12)
3. Request OTP code
4. **Look for**: `✅ OTP Send Success` with timestamp
5. Enter the code immediately
6. **Look for**: Time elapsed in console

### Step 3: Interpret Results

**If code expires in < 60 seconds:**
```
🚨 CRITICAL: Code expired in less than 1 minute!
```
→ This is a **Supabase configuration issue**

**If time elapsed shows 0-30 seconds but code invalid:**
→ Supabase server-side configuration not propagated yet
→ **Wait 10 more minutes and try again**

**If time elapsed shows 60+ minutes:**
→ Code legitimately expired (working as expected)

## Quick Fixes (Try in order)

### Fix 1: Wait for Propagation (10 minutes)
Supabase configuration changes take time to propagate.
- Change made? Wait 10 minutes
- Clear browser cache
- Try again

### Fix 2: Reset Email Template
1. Supabase Dashboard → Authentication → Email Templates
2. Select "Confirm signup" template
3. Click "Reset to default"
4. Save and wait 5 minutes

### Fix 3: Check Rate Limiting
1. Supabase Dashboard → Authentication → Rate Limits
2. Temporarily increase or disable limits
3. Test OTP again

### Fix 4: Clear Everything and Test
```bash
# Clear all caches
1. Clear browser cache and cookies
2. Use incognito/private mode
3. Try different browser
4. Test from different network
```

## What the Enhanced Logs Tell You

### Good Sign (Working Correctly):
```
📧 Attempting to send OTP to: user@example.com
✅ OTP Send Success
⏰ Code sent at: 2:30:45 PM
💾 Stored send timestamp

🔑 OTP Verification Attempt
⏱️ Time elapsed: 0m 15s (15 seconds total)
✅ Code should still be valid
✅ OTP verification successful
```

### Bad Sign (Instant Expiry):
```
📧 Attempting to send OTP to: user@example.com
✅ OTP Send Success
⏰ Code sent at: 2:30:45 PM

🔑 OTP Verification Attempt
⏱️ Time elapsed: 0m 10s (10 seconds total)
❌ OTP Verification Failed
🚨 CRITICAL: Code expired in less than 1 minute!
🚨 This indicates a Supabase configuration issue!
```

## When to Contact Supabase Support

Contact support if:
- ✅ Configuration shows 3600 seconds
- ✅ Waited 15+ minutes after changing
- ✅ Codes still expire in < 60 seconds
- ✅ Console logs confirm instant expiry
- ✅ Tried all quick fixes above

## Immediate Workaround

While waiting for Supabase fix, you can:

**Option A: Use Magic Links**
1. Update code to use magic links instead of OTP
2. Magic links have longer, more reliable expiry

**Option B: Increase Resend Frequency**
1. Reduce resend cooldown from 60s to 30s
2. Allow users to quickly request new codes
3. Add note: "Code expires quickly, request new if needed"

## Files Modified

Enhanced diagnostics added to:
- `src/lib/otpDebug.ts` - Enhanced logging
- `src/lib/supabase.ts` - Response data logging
- `OTP_INSTANT_EXPIRY_DIAGNOSTIC.md` - Full guide

## Debug Commands

In browser console, try:
```javascript
// Check OTP debug status
window.__otpDebug.logStatus()

// Check configuration
window.__otpDebug.checkConfig()

// Get debug info
window.__otpDebug.getInfo()
```

## Expected Behavior

With 3600 second expiry:
- ✅ Code sent at 2:00:00 PM
- ✅ Code valid until 3:00:00 PM
- ✅ Can verify any time within that hour
- ❌ Should NOT expire in seconds

Current Behavior (BUG):
- ❌ Code sent at 2:00:00 PM
- ❌ Code expires by 2:00:10 PM
- ❌ Cannot verify even immediately

---

**See `OTP_INSTANT_EXPIRY_DIAGNOSTIC.md` for complete troubleshooting guide**
