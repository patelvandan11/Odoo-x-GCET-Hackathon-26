// app/page.tsx (Employee Dashboard)
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmployeeCard from '@/components/EmployeeCard';
import { api } from '@/lib/api';

const mockEmployees = [
  { name: 'John Doe', status: 'Present' as const },
  { name: 'Jane Smith', status: 'On Leave' as const },
  { name: 'Bob Johnson', status: 'Absent' as const },
  { name: 'Alice Williams', status: 'Present' as const },
  { name: 'Charlie Brown', status: 'On Leave' as const },
  { name: 'Diana Prince', status: 'Present' as const },
  // Add more mock employees as needed
];

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    // Check if user is logged in and is employee (not HR)
    const loginId = localStorage.getItem('login_id');
    const role = localStorage.getItem('user_role');
    
    if (!loginId) {
      router.push('/home');
      return;
    }
    
    // If HR, redirect to HR dashboard
    if (role === 'hr') {
      router.push('/hr-dashboard');
      return;
    }

    // Fetch user name
    const fetchUserName = async () => {
      try {
        const userData = await api.getCurrentUser(loginId);
        setUserName(userData.name || 'Employee');
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    fetchUserName();
  }, [router]);

  // Show loading or nothing while checking
  const loginId = typeof window !== 'undefined' ? localStorage.getItem('login_id') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('user_role') : null;
  
  if (!loginId || role === 'hr') {
    return null; // Will redirect
  }

  const stats = {
    total: mockEmployees.length,
    present: mockEmployees.filter(e => e.status === 'Present').length,
    onLeave: mockEmployees.filter(e => e.status === 'On Leave').length,
    absent: mockEmployees.filter(e => e.status === 'Absent').length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          {userName ? `Welcome, ${userName}` : 'Employee Dashboard'}
        </h1>
        <p className="text-slate-600">Your personal dashboard - View attendance and manage your profile</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Employees</p>
              <p className="text-3xl font-bold text-slate-800 mt-2">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Present</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.present}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">On Leave</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.onLeave}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Absent</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{stats.absent}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Cards Grid */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEmployees.map((emp, idx) => (
            <EmployeeCard key={idx} name={emp.name} status={emp.status} />
          ))}
        </div>
      </div>
    </div>
  );
}
