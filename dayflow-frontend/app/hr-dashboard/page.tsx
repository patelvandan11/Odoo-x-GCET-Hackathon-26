// app/hr-dashboard/page.tsx - HR Dashboard
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function HRDashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Check if user is logged in and is HR
    const loginId = localStorage.getItem('login_id');
    const role = localStorage.getItem('user_role');
    
    if (!loginId) {
      router.push('/home');
      return;
    }
    
    if (role !== 'hr') {
      router.push('/');
      return;
    }

    // Fetch user name
    const fetchUserName = async () => {
      try {
        const userData = await api.getCurrentUser(loginId);
        setUserName(userData.name || 'HR User');
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    fetchUserName();
  }, [router]);

  const quickActions = [
    {
      title: 'Create Employee',
      description: 'Register new employee accounts',
      href: '/signup',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'View Attendance',
      description: 'Monitor employee attendance records',
      href: '/attendance',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Time Off Requests',
      description: 'Review and manage leave requests',
      href: '/time-off',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Employee Management',
      description: 'Manage employee profiles and information',
      href: '/profile/info',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const stats = [
    { label: 'Total Employees', value: '24', icon: '👥', color: 'text-blue-600' },
    { label: 'Present Today', value: '18', icon: '✅', color: 'text-green-600' },
    { label: 'On Leave', value: '4', icon: '📅', color: 'text-purple-600' },
    { label: 'Pending Requests', value: '2', icon: '⏳', color: 'text-amber-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {userName ? `Welcome, ${userName}` : 'HR Dashboard'}
        </h1>
        <p className="text-slate-600">Manage your organization and employees</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => (
            <Link
              key={idx}
              href={action.href}
              className="group bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{action.title}</h3>
              <p className="text-sm text-slate-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">New employee registered</p>
                <p className="text-xs text-slate-500">John Doe - 2 hours ago</p>
              </div>
            </div>
            <span className="text-xs text-green-600 font-medium">Completed</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">JS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Leave request submitted</p>
                <p className="text-xs text-slate-500">Jane Smith - 5 hours ago</p>
              </div>
            </div>
            <span className="text-xs text-amber-600 font-medium">Pending</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">BJ</span>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Attendance marked</p>
                <p className="text-xs text-slate-500">Bob Johnson - 1 day ago</p>
              </div>
            </div>
            <span className="text-xs text-green-600 font-medium">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

