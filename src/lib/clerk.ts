const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY environment variable');
}

export { clerkPublishableKey };

export const clerkAppearance = {
  elements: {
    formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-green-500 hover:shadow-lg hover:scale-105 transition-all duration-300',
    card: 'shadow-2xl rounded-2xl',
    headerTitle: 'text-2xl font-bold text-gray-900',
    headerSubtitle: 'text-gray-600',
    socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
    formFieldInput: 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    footerActionLink: 'text-blue-600 hover:text-blue-700',
  },
};
