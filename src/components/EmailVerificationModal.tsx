import React, { useState, useEffect } from 'react';
import { X, Mail, CheckCircle, AlertCircle, Lock, Shield } from 'lucide-react';
import { sendOTP, verifyOTP } from '../lib/supabase';
import OTPInput from './OTPInput';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified?: () => void;
  isAdminMode?: boolean;
}

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerified,
  isAdminMode = false
}) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [codeExpiry, setCodeExpiry] = useState(0);
  const [codeSentTime, setCodeSentTime] = useState<Date | null>(null);

  const isTestingMode = import.meta.env.VITE_DISABLE_AUTH_FOR_TESTING === 'true';
  const allowPersonalEmails = import.meta.env.VITE_ALLOW_PERSONAL_EMAILS === 'true';

  useEffect(() => {
    if (isOpen && isTestingMode) {
      const redirectUrl = isAdminMode ? '/admin/company-requests' : '/submit-review';
      window.location.href = redirectUrl;
    }
  }, [isOpen, isTestingMode, isAdminMode]);

  const blockedDomains = [
    'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com',
    'icloud.com', 'live.com', 'msn.com', 'ymail.com', 'protonmail.com',
    'mail.com', 'zoho.com', 'gmx.com'
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setIsValid(null);
      setErrorMessage('');
      setIsLoading(false);
      setCodeSent(false);
      setOtp('');
      setOtpError(false);
      setResendCooldown(0);
      setCodeExpiry(0);
      setCodeSentTime(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!email) {
      setIsValid(null);
      setErrorMessage('');
      return;
    }

    if (!emailRegex.test(email)) {
      setIsValid(false);
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!allowPersonalEmails) {
      const domain = email.split('@')[1]?.toLowerCase();
      if (domain && blockedDomains.includes(domain)) {
        setIsValid(false);
        setErrorMessage('Please use your work email address. Personal email providers are not allowed.');
        return;
      }
    }

    setIsValid(true);
    setErrorMessage('');
  }, [email, allowPersonalEmails]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  useEffect(() => {
    if (codeExpiry > 0) {
      const timer = setTimeout(() => {
        setCodeExpiry(codeExpiry - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [codeExpiry]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid || !email) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      await sendOTP(email);
      setCodeSent(true);
      setResendCooldown(3600);
      setCodeExpiry(3600);
      setCodeSentTime(new Date());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const trimmedOtp = otp.trim();

    if (trimmedOtp.length !== 6) return;
    if (!/^\d{6}$/.test(trimmedOtp)) {
      setOtpError(true);
      setErrorMessage('Code must be 6 digits');
      return;
    }

    setIsLoading(true);
    setOtpError(false);
    setErrorMessage('');

    try {
      await verifyOTP(email, trimmedOtp);

      if (onVerified) {
        onVerified();
      }

      if (isAdminMode) {
        window.location.href = '/admin/company-requests';
      } else {
        window.location.reload();
      }
    } catch (error) {
      setOtpError(true);
      const errorMsg = error instanceof Error ? error.message.toLowerCase() : '';

      if (errorMsg.includes('expired') || errorMsg.includes('token has expired')) {
        setErrorMessage('Verification code has expired. Please request a new one.');
      } else if (errorMsg.includes('invalid') || errorMsg.includes('otp')) {
        setErrorMessage('Invalid verification code. Please check and try again.');
      } else {
        setErrorMessage(error instanceof Error ? error.message : 'Invalid verification code');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (codeSent && otp.length === 6) {
      handleVerifyOTP();
    }
  }, [otp, codeSent]);

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    setIsLoading(true);
    setErrorMessage('');
    setOtp('');
    setOtpError(false);

    try {
      await sendOTP(email);
      setResendCooldown(3600);
      setCodeExpiry(3600);
      setCodeSentTime(new Date());
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen || isTestingMode) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="relative p-6 pb-4">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full flex items-center justify-center">
                {isAdminMode ? (
                  <Shield className="w-8 h-8 text-blue-600" />
                ) : (
                  <Mail className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            {codeSent ? 'Enter Verification Code' : (isAdminMode ? 'Admin Login' : 'Verify Your Email')}
          </h2>
          <p className="text-gray-600 text-center leading-relaxed">
            {codeSent
              ? `We sent a 6-digit code to ${email}`
              : (isAdminMode
                ? "Enter your admin email to receive a secure verification code for instant access."
                : "To keep reviews authentic and anonymous, please verify your email with a secure code."
              )
            }
          </p>
          {codeSent && codeExpiry > 0 && (
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-500">
                Code expires in <span className="font-semibold text-blue-600">{formatTime(codeExpiry)}</span>
              </p>
            </div>
          )}
          {codeSent && codeExpiry === 0 && (
            <div className="mt-3 text-center">
              <p className="text-sm text-red-600 font-medium">
                Code has expired. Please request a new one.
              </p>
            </div>
          )}
        </div>

        <div className="px-6 pb-6">
          {!codeSent ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400 ${
                      isValid === false
                        ? 'border-red-300 bg-red-50'
                        : isValid === true
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 bg-white'
                    }`}
                    aria-describedby={errorMessage ? 'email-error' : undefined}
                  />

                  {isValid !== null && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isValid ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                {errorMessage && (
                  <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Verification Code</span>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  disabled={isLoading}
                  error={otpError}
                />

                {errorMessage && (
                  <p className="mt-3 text-sm text-red-600 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    {errorMessage}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-center">
                  <button
                    onClick={handleResendCode}
                    disabled={isLoading || resendCooldown > 0}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                  >
                    {resendCooldown > 0
                      ? `Resend available in ${formatTime(resendCooldown)}`
                      : 'Resend Code'
                    }
                  </button>
                </div>
                <div className="text-center text-xs text-gray-500">
                  {codeSentTime && (
                    <p>Code sent at {codeSentTime.toLocaleTimeString()} • Valid for 1 hour</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setCodeSent(false)}
                disabled={isLoading}
                className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change Email
              </button>
            </div>
          )}

          {!codeSent && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-medium">Secure & Password-Free</span> -
                    Enter the 6-digit code sent to your email to verify and sign in instantly.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 text-center">
            <a
              href="/support"
              className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              Need help? Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;