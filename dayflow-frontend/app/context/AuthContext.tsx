// context/AuthContext.tsx
"use client";
import { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api';

type User = {
  name: string;
  role: 'hr' | 'employee';
  email: string;
  phone: string;
  company_name: string;
  login_id: string;
  job?: string;
  department?: string;
  manager?: string;
  dob?: string;
  bankInfo?: {
    accountNumber: string;
    ifsc: string;
  };
  about?: string;
  skills?: string[];
  certification?: string[];
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({ 
  user: null,
  loading: true,
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const loginId = localStorage.getItem('login_id');
      if (!loginId) {
        setLoading(false);
        return;
      }

      try {
        const userData = await api.getCurrentUser(loginId);
        setUser({
          name: userData.name || 'User',
          role: (userData.role as 'hr' | 'employee') || 'employee',
          email: userData.email || '',
          phone: userData.phone || '',
          company_name: userData.company_name || '',
          login_id: userData.login_id,
          job: userData.role === 'hr' ? 'HR Manager' : 'Employee',
          department: userData.company_name || '',
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Clear invalid login_id
        localStorage.removeItem('login_id');
        localStorage.removeItem('user_role');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('login_id');
    localStorage.removeItem('user_role');
    setUser(null);
    // Redirect to home page
    window.location.href = '/home';
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
