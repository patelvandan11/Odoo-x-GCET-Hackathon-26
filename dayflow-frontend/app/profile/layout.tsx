// app/profile/layout.tsx
"use client";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();

  const navItems = [
    { href: '/profile/resume', label: 'Resume' },
    { href: '/profile/info', label: 'Private Info' },
    ...(user?.role === 'admin' ? [{ href: '/profile/salary', label: 'Salary Info' }] : []),
    { href: '/profile/security', label: 'Security' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Profile Settings</h1>
        <p className="text-slate-600">Manage your profile information and preferences</p>
      </div>

      <nav className="border-b border-slate-200">
        <div className="flex space-x-1 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div>{children}</div>
    </div>
  );
}
