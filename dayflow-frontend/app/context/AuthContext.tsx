// context/AuthContext.tsx
"use client";
import { createContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  role: 'admin' | 'employee';
  email: string;
  phone: string;
  job: string;
  department: string;
  manager: string;
  dob: string;
  bankInfo: {
    accountNumber: string;
    ifsc: string;
  };
  about: string;
  skills: string[];
  certification: string[];
};

type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Mock user data; Admin by default
  const [user] = useState<User>({
    name: 'Alice Admin',
    role: 'admin',
    email: 'alice@example.com',
    phone: '555-1234',
    job: 'HR Manager',
    department: 'Human Resources',
    manager: 'Bob Boss',
    dob: '1990-01-01',
    bankInfo: { accountNumber: '123456789', ifsc: 'HDFC0001234' },
    about: 'Experienced HR manager with 10 years of experience.',
    skills: ['Leadership', 'Communication', 'Recruitment'],
    certification: ['PHR', 'SHRM-CP']
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
