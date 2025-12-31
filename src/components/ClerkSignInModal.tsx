import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SignIn, SignUp } from '@clerk/clerk-react';

interface ClerkSignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string;
  initialMode?: 'sign-in' | 'sign-up';
}

const ClerkSignInModal: React.FC<ClerkSignInModalProps> = ({
  isOpen,
  onClose,
  redirectUrl = '/submit-review',
  initialMode = 'sign-in'
}) => {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200 z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {mode === 'sign-in' ? (
            <SignIn
              afterSignInUrl={redirectUrl}
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none w-full",
                  headerTitle: "text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                  formButtonPrimary: "bg-gradient-to-r from-blue-600 to-green-500 hover:shadow-lg hover:scale-105 transition-all",
                  footerActionLink: "text-blue-600 hover:text-blue-700"
                }
              }}
            />
          ) : (
            <SignUp
              afterSignUpUrl={redirectUrl}
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none w-full",
                  headerTitle: "text-2xl font-bold text-gray-900",
                  headerSubtitle: "text-gray-600",
                  socialButtonsBlockButton: "bg-white border border-gray-300 hover:bg-gray-50",
                  formButtonPrimary: "bg-gradient-to-r from-blue-600 to-green-500 hover:shadow-lg hover:scale-105 transition-all",
                  footerActionLink: "text-blue-600 hover:text-blue-700"
                }
              }}
            />
          )}

          <div className="mt-4 text-center">
            <button
              onClick={() => setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {mode === 'sign-in'
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClerkSignInModal;
