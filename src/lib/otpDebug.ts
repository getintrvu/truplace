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

export const logOTPSendSuccess = (email: string) => {
  const sentTime = new Date();
  const expiryTime = new Date(sentTime.getTime() + 3600000);

  console.log('✅ OTP send request successful for:', email);
  console.log('📬 Check your email inbox for the code');
  console.log('⏰ Code sent at:', sentTime.toLocaleString());
  console.log('⏰ Code expires at:', expiryTime.toLocaleString());
  console.log('⏱️  Code valid for: 1 hour (3600 seconds)');
  console.log('⚠️ If you receive a magic link instead of a code, see: SUPABASE_OTP_TEMPLATE_FIX.md');
};

export const logOTPSendError = (email: string, error: Error) => {
  console.group('❌ OTP Send Failed');
  console.error('Email:', email);
  console.error('Error:', error.message);
  console.error('Full Error:', error);
  console.groupEnd();
};

export const logOTPVerifyAttempt = (email: string, tokenLength: number) => {
  console.log('🔑 Attempting to verify OTP');
  console.log('Email:', email);
  console.log('Token Length:', tokenLength, tokenLength === 6 ? '✅' : '❌ Should be 6');
  console.log('⏰ Verification attempt at:', new Date().toLocaleString());
  console.log('⚠️ Note: Codes expire after 1 hour (3600 seconds)');
};

export const logOTPVerifySuccess = (email: string) => {
  console.log('✅ OTP verification successful for:', email);
  console.log('🎉 User authenticated');
};

export const logOTPVerifyError = (email: string, error: Error) => {
  console.group('❌ OTP Verification Failed');
  console.error('Email:', email);
  console.error('Error:', error.message);
  console.error('⏰ Timestamp:', new Date().toLocaleString());

  if (error.message.includes('expired') || error.message.includes('token has expired')) {
    console.error('⏰ Code has expired (exceeded 1 hour validity)');
    console.error('💡 Solution: Click "Resend Code" to receive a new verification code');
  } else if (error.message.includes('invalid') || error.message.includes('otp')) {
    console.error('🔢 Invalid code entered');
    console.error('💡 Common issues:');
    console.error('  - Typo in the code (check all 6 digits)');
    console.error('  - Code already used');
    console.error('  - Email/token mismatch');
  }

  console.error('Full Error:', error);
  console.groupEnd();
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
