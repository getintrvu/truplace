import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminStatus: () => Promise<boolean>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAdminStatus = async (): Promise<boolean> => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      setIsAdmin(false);
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, email, role')
        .eq('email', user.primaryEmailAddress.emailAddress)
        .maybeSingle();

      const adminStatus = !error && !!data;
      setIsAdmin(adminStatus);
      return adminStatus;
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
      return false;
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        checkAdminStatus().finally(() => setIsLoading(false));
      } else {
        setIsAdmin(false);
        setIsLoading(false);
      }
    }
  }, [user, isLoaded]);

  return (
    <AdminContext.Provider value={{ isAdmin, isLoading, checkAdminStatus }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
