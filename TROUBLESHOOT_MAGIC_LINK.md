# Troubleshooting: Still Receiving Magic Links

## Quick Checks

### 1. How Long Ago Did You Save the Template?

Supabase changes take 2-3 minutes to propagate, sometimes up to 10 minutes globally.

**If less than 10 minutes:** Wait a bit longer and try again.

### 2. Did You Edit the Correct Template?

Common mistake: Editing the wrong template.

**Correct template:** "Magic Link" (not "Invite User", "Confirm Signup", or "Reset Password")

**How to verify:**
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Click on "Magic Link" template
3. Check if it contains `{{ .Token }}` (should be in large font in the middle)
4. Check that it does NOT contain `{{ .ConfirmationURL }}` anywhere

### 3. Did the Template Save Successfully?

Sometimes saves fail silently.

**How to verify:**
1. Go back to the Email Templates page
2. Click "Magic Link" again
3. Check if your changes are still there
4. If not, paste the template again and click Save
5. Look for a success message (usually green notification)

### 4. Are You Testing with a Fresh Session?

Email providers and browsers cache aggressively.

**Try these:**
1. Clear browser cache and cookies
2. Open an incognito/private window
3. Use a different email address (if possible)
4. Wait 60 seconds between attempts (rate limiting)
5. Check a different folder (spam, promotions, updates)

## Detailed Verification Steps

### Step 1: Verify Template Content

The template MUST have this line:
```html
<div class="code">{{ .Token }}</div>
```

The template MUST NOT have any of these:
```html
{{ .ConfirmationURL }}
<a href="{{ .ConfirmationURL }}">
href="{{ .SiteURL }}/auth/confirm
```

### Step 2: Check Your Email Carefully

**Magic Link Email:**
- Has a clickable button or link
- Says "Click here" or "Confirm your email"
- Contains a long URL like `https://your-project.supabase.co/auth/v1/verify?token=...`

**OTP Code Email:**
- Shows a 6-digit number (e.g., "123456")
- NO clickable links or buttons in the main content
- Says "Your verification code" or similar
- The numbers are large and prominent

### Step 3: Check Email Subject Line

After updating the template, check what the subject line says. While you're in the Email Templates, you can also update the subject:

**Magic Link subject:** "Confirm your email"
**OTP subject:** "Your verification code for TruPlace" (or similar)

Update the subject line to match the OTP flow.

### Step 4: Check Supabase Logs

1. Go to Supabase Dashboard
2. Navigate to: Authentication → Logs
3. Look at recent email events
4. Check for errors or warnings

### Step 5: Verify Auth Settings

1. Go to Supabase Dashboard
2. Navigate to: Authentication → Settings
3. Scroll to "Auth Providers"
4. Click on "Email"
5. Check these settings:
   - **Enable Email provider:** Should be ON (toggle enabled)
   - **Enable Email confirmations:** Should be OFF (for OTP flow)
   - **Secure email change:** Your preference
   - **Secure password change:** Your preference

**Important:** If "Enable Email confirmations" is ON, turn it OFF for OTP authentication to work correctly.

## Common Mistakes

### Mistake 1: Edited Wrong Template

You might have edited "Confirm signup" or "Invite user" instead of "Magic Link".

**Solution:** Edit the "Magic Link" template specifically.

### Mistake 2: Left `{{ .ConfirmationURL }}` Somewhere

Even if you added `{{ .Token }}`, leaving `{{ .ConfirmationURL }}` anywhere in the template can cause magic links.

**Solution:** Search the entire template for `ConfirmationURL` and remove ALL instances.

### Mistake 3: Template Didn't Save

Sometimes clicking Save doesn't actually save, especially with large templates.

**Solution:**
1. Copy your template to a text file first (backup)
2. Delete all content in Supabase editor
3. Paste the new template
4. Click Save
5. Refresh the page
6. Open the template again to verify it saved

### Mistake 4: Cached Email

Your email client might be showing you a cached version of an old email.

**Solution:**
1. Request a NEW code (not reusing old emails)
2. Wait for the new email to arrive
3. Check the latest email in your inbox

### Mistake 5: Using Wrong Function

Make sure your code uses `signInWithOtp` not `signInWithOtp({ emailRedirectTo: ... })`.

**Correct:**
```typescript
await supabase.auth.signInWithOtp({
  email,
  options: {
    shouldCreateUser: true,
  },
});
```

**Incorrect (creates magic links):**
```typescript
await supabase.auth.signInWithOtp({
  email,
  options: {
    emailRedirectTo: 'http://localhost:3000',
    shouldCreateUser: true,
  },
});
```

## Advanced Debugging

### Check the Raw Email Source

Most email clients let you view the raw email source.

**Gmail:**
1. Open the email
2. Click the three dots menu
3. Select "Show original"
4. Look for the token/code in the raw HTML

**Outlook:**
1. Open the email
2. Click "..." → "View" → "View message source"

**What to look for:**
- If you see a 6-digit number in the HTML: Template is correct
- If you see only URLs: Template is still sending magic links

### Test with Supabase CLI (Advanced)

If you have Supabase CLI installed, you can test locally:

```bash
supabase functions deploy send-otp-test
```

### Check Template Variables

The Magic Link template has access to these variables:
- `{{ .Token }}` - The OTP code (6 digits)
- `{{ .TokenHash }}` - Hashed version (not useful for display)
- `{{ .Email }}` - Recipient email
- `{{ .ConfirmationURL }}` - Magic link URL (DO NOT USE THIS)
- `{{ .SiteURL }}` - Your site URL

Make sure you're using `{{ .Token }}` and NOT `{{ .TokenHash }}`.

## Still Not Working?

### Option 1: Use Magic Links Instead

If you can't get OTP working, you can adapt your app to use magic links:

1. Keep the current Supabase template
2. Update `src/components/EmailVerificationModal.tsx`:
   - Change message to "Check your email for a login link"
   - Remove the OTP input field
   - Add instructions to click the link in the email

### Option 2: Contact Supabase Support

If template changes aren't taking effect after 24 hours:

1. Go to https://supabase.com/dashboard
2. Click the "?" help icon
3. Select "Contact Support"
4. Explain: "Email template changes not taking effect"
5. Include: Project ID, template name, time of change

### Option 3: Create a New Project (Last Resort)

If nothing else works, you can:

1. Create a new Supabase project
2. Set up the OTP template BEFORE using it
3. Migrate your data
4. Update environment variables

## Verification Script

Run this in your browser console when on your app:

```javascript
// Check OTP configuration
window.__otpDebug?.logStatus();

// Check what's configured
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Testing Mode:', import.meta.env.VITE_DISABLE_AUTH_FOR_TESTING);
```

## Success Indicators

You'll know it's working when:

1. Email subject says "verification code" or similar (not "confirm your email")
2. Email body shows a large 6-digit number
3. NO clickable "Confirm" or "Sign in" buttons
4. You can copy the code and paste it in the app
5. Authentication succeeds after entering the code

## Next Steps

1. **Wait 10 minutes** after saving template
2. **Clear all caches** (browser, cookies, email client)
3. **Test with fresh email** in incognito window
4. **Check template again** to confirm it has `{{ .Token }}`
5. **Verify settings** - ensure email confirmations are OFF
6. **Check logs** in Supabase dashboard
7. **Try different email** provider (Gmail vs Outlook, etc.)

## Need to See the Template Again?

The complete template is in `SUPABASE_OTP_TEMPLATE_FIX.md`. Copy it exactly as written.

Key requirements:
- Must have `{{ .Token }}` to display the code
- Must NOT have `{{ .ConfirmationURL }}` anywhere
- Must NOT have any `<a href="...">` links in the main content area

## Timeline

- **0-2 minutes:** Template saved in dashboard
- **2-5 minutes:** Changes propagating to email service
- **5-10 minutes:** Fully propagated globally
- **10+ minutes:** Should definitely be working by now

If still not working after 10 minutes, the template is either not saved correctly or you're looking at cached emails.
