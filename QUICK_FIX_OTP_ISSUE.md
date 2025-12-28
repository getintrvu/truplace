# Quick Fix: Enable Email OTP Codes

## Problem
App shows "We sent a 6-digit code" but sends magic links instead.

## Solution (2 minutes)

### 1. Open Supabase Dashboard
- Go to https://supabase.com/dashboard
- Select your project

### 2. Enable Email OTP
- Navigate to: **Authentication** → **Providers**
- Click on **Email** provider
- Find authentication method settings
- ✓ Enable **"Email OTP"**
- ✗ Disable **"Magic Link"** (optional)
- Click **Save**

### 3. Test
- Open your app
- Try to submit a review or log in
- Enter your email
- Check inbox: You should now receive a **6-digit code** (not a link)

## That's It!

The app code is already configured correctly. This is just a Supabase project setting that needs to be enabled.

## Still Having Issues?

See `OTP_CONFIGURATION_FIX.md` for detailed troubleshooting steps.

## Why This Happens

Supabase's `signInWithOtp()` function can send either:
- Magic links (default) - User clicks a link to log in
- OTP codes - User enters a 6-digit code in the app

Your project was using the default (magic links), but the app UI is designed for OTP codes.
