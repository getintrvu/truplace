/**
 * OTP Debug Helper
 *
 * This utility helps diagnose OTP authentication issues by logging
 * detailed information about the authentication flow.
 *
 * Usage: Import and call logOTPStatus() to check configuration
 */

interface OTPDebugInfo {
  supabaseConfigured: boolean;
  supabaseUrl: string | null;
  hasAnonKey: boolean;
  testingMode: boolean;
  allowPersonalEmails: boolean;
  timestamp: string;
}

export const getOTPDebugInfo = (): OTPDebugInfo => {
  return {
    supabaseConfigured: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || null,
    hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    testingMode: import.meta.env.VITE_DISABLE_AUTH_FOR_TESTING === 'true',
    allowPersonalEmails: import.meta.env.VITE_ALLOW_PERSONAL_EMAILS === 'true',
    timestamp: new Date().toISOString(),
  };
};

export const logOTPStatus = () => {
  const info = getOTPDebugInfo();

  console.group('🔐 OTP Authentication Status');
  console.log('Supabase Configured:', info.supabaseConfigured ? '✅' : '❌');
  console.log('Supabase URL:', info.supabaseUrl || 'Not configured');
  console.log('Anon Key Present:', info.hasAnonKey ? '✅' : '❌');
  console.log('Testing Mode:', info.testingMode ? '⚠️ ENABLED' : '✅ Disabled');
  console.log('Personal Emails:', info.allowPersonalEmails ? '⚠️ Allowed' : '✅ Blocked');
  console.log('Timestamp:', info.timestamp);

  if (!info.supabaseConfigured) {
    console.warn('⚠️ Supabase is not configured. Check your .env file.');
  }

  if (info.testingMode) {
    console.warn('⚠️ Testing mode is ENABLED. Email verification is bypassed.');
  }

  console.groupEnd();
};

export const logOTPSendAttempt = (email: string) => {
  console.log('📧 Attempting to send OTP to:', email);
  console.log('⏰ Timestamp:', new Date().toISOString());
};

export const logOTPSendSuccess = (email: string, responseData?: any) => {
  const sentTime = new Date();
  const expiryTime = new Date(sentTime.getTime() + 60000);

  console.group('✅ OTP Send Success');
  console.log('Email:', email);
  console.log('📬 Check your email inbox for the code');
  console.log('⏰ Code sent at:', sentTime.toLocaleString());
  console.log('⏰ Expected expiry at:', expiryTime.toLocaleString());
  console.log('⏱️  Expected validity: 1 minute (60 seconds)');

  if (responseData) {
    console.log('📋 Supabase Response:', responseData);
  }

  // Store send time for later verification
  try {
    sessionStorage.setItem(`otp_sent_${email}`, sentTime.toISOString());
    console.log('💾 Stored send timestamp for verification tracking');
  } catch (e) {
    console.warn('⚠️ Could not store timestamp:', e);
  }

  console.log('⚠️ If you receive a magic link instead of a code, see: SUPABASE_OTP_TEMPLATE_FIX.md');
  console.groupEnd();
};

export const logOTPSendError = (email: string, error: Error) => {
  console.group('❌ OTP Send Failed');
  console.error('Email:', email);
  console.error('Error:', error.message);
  console.error('Full Error:', error);
  console.groupEnd();
};

export const logOTPVerifyAttempt = (email: string, tokenLength: number) => {
  const verifyTime = new Date();

  console.group('🔑 OTP Verification Attempt');
  console.log('Email:', email);
  console.log('Token Length:', tokenLength, tokenLength === 6 ? '✅' : '❌ Should be 6');
  console.log('⏰ Verification attempt at:', verifyTime.toLocaleString());

  // Check how much time has elapsed since code was sent
  try {
    const sentTimeStr = sessionStorage.getItem(`otp_sent_${email}`);
    if (sentTimeStr) {
      const sentTime = new Date(sentTimeStr);
      const elapsedMs = verifyTime.getTime() - sentTime.getTime();
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const elapsedMin = Math.floor(elapsedSec / 60);

      console.log('⏱️  Code sent:', sentTime.toLocaleString());
      console.log('⏱️  Time elapsed:', `${elapsedMin}m ${elapsedSec % 60}s (${elapsedSec} seconds total)`);
      console.log('⏱️  Expected validity: 60 seconds (1 minute)');

      if (elapsedSec < 60) {
        console.log('✅ Code should still be valid (within 1 minute window)');
      } else {
        console.log('❌ Code should be expired (exceeded 1 minute window)');
      }
    } else {
      console.log('⚠️ No send timestamp found - cannot calculate elapsed time');
    }
  } catch (e) {
    console.warn('⚠️ Could not calculate elapsed time:', e);
  }

  console.log('⚠️ Note: Codes configured to expire after 60 seconds (1 minute)');
  console.groupEnd();
};

export const logOTPVerifySuccess = (email: string) => {
  console.log('✅ OTP verification successful for:', email);
  console.log('🎉 User authenticated');
};

export const logOTPVerifyError = (email: string, error: Error) => {
  const errorTime = new Date();

  console.group('❌ OTP Verification Failed');
  console.error('Email:', email);
  console.error('Error:', error.message);
  console.error('⏰ Error timestamp:', errorTime.toLocaleString());

  // Calculate elapsed time
  try {
    const sentTimeStr = sessionStorage.getItem(`otp_sent_${email}`);
    if (sentTimeStr) {
      const sentTime = new Date(sentTimeStr);
      const elapsedMs = errorTime.getTime() - sentTime.getTime();
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const elapsedMin = Math.floor(elapsedSec / 60);

      console.error('⏱️  Code sent:', sentTime.toLocaleString());
      console.error('⏱️  Time elapsed:', `${elapsedMin}m ${elapsedSec % 60}s (${elapsedSec} seconds total)`);

      if (elapsedSec < 10) {
        console.error('🚨 CRITICAL: Code expired in less than 10 seconds!');
        console.error('🚨 This indicates a Supabase configuration issue!');
        console.error('📋 Configured expiry: 60 seconds (1 minute)');
        console.error('📋 Actual behavior: Instant expiry');
        console.error('');
        console.error('🔧 TROUBLESHOOTING STEPS:');
        console.error('  1. Verify Supabase Dashboard Auth settings');
        console.error('  2. Wait 5-10 minutes for configuration changes to propagate');
        console.error('  3. Clear browser cache and try again');
        console.error('  4. Check Supabase Auth logs for any errors');
        console.error('  5. Contact Supabase support if issue persists');
      } else if (elapsedSec < 60) {
        console.error('⚠️ Code should still be valid based on 60s configuration');
        console.error('⚠️ But Supabase rejected it - possible server-side issue');
      }
    }
  } catch (e) {
    console.warn('⚠️ Could not calculate elapsed time:', e);
  }

  if (error.message.includes('expired') || error.message.includes('token has expired')) {
    console.error('');
    console.error('⏰ Code has expired');
    console.error('💡 Solution: Click "Resend Code" to receive a new verification code');
  } else if (error.message.includes('invalid') || error.message.includes('otp')) {
    console.error('');
    console.error('🔢 Invalid code entered');
    console.error('💡 Common issues:');
    console.error('  - Typo in the code (check all 6 digits)');
    console.error('  - Code already used');
    console.error('  - Email/token mismatch');
  }

  console.error('');
  console.error('Full Error Object:', error);
  console.groupEnd();

  // Clean up stored timestamp after error
  try {
    sessionStorage.removeItem(`otp_sent_${email}`);
  } catch (e) {
    // Ignore cleanup errors
  }
};

export const checkOTPConfiguration = () => {
  const info = getOTPDebugInfo();
  const issues: string[] = [];

  if (!info.supabaseConfigured) {
    issues.push('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env');
  }

  if (info.testingMode) {
    issues.push('Testing mode is enabled. Email verification is bypassed.');
  }

  if (info.allowPersonalEmails) {
    issues.push('Personal emails are allowed. This should be disabled in production.');
  }

  if (issues.length === 0) {
    console.log('✅ OTP configuration looks good!');
    return true;
  } else {
    console.group('⚠️ OTP Configuration Issues');
    issues.forEach((issue, index) => {
      console.warn(`${index + 1}. ${issue}`);
    });
    console.groupEnd();
    return false;
  }
};

if (import.meta.env.DEV) {
  (window as any).__otpDebug = {
    logStatus: logOTPStatus,
    checkConfig: checkOTPConfiguration,
    getInfo: getOTPDebugInfo,
  };

  console.log('💡 OTP Debug tools available: window.__otpDebug.logStatus()');
}
