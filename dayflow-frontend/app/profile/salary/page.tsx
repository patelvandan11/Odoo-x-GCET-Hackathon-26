// app/profile/salary/page.tsx
"use client";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function SalaryPage() {
  const { user } = useContext(AuthContext);
  
  if (user?.role !== 'admin') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-red-800 font-medium">Unauthorized Access</p>
        </div>
        <p className="text-red-600 text-sm mt-2">You don't have permission to view this page.</p>
      </div>
    );
  }

  const salaryData = {
    baseSalary: 80000,
    bonus: 5000,
    allowances: 3000,
    deductions: 2000,
    tax: 15000,
  };

  const grossSalary = salaryData.baseSalary + salaryData.bonus + salaryData.allowances;
  const netSalary = grossSalary - salaryData.deductions - salaryData.tax;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90 mb-1">Gross Salary</div>
          <div className="text-3xl font-bold">${grossSalary.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90 mb-1">Net Salary</div>
          <div className="text-3xl font-bold">${netSalary.toLocaleString()}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="text-sm font-medium opacity-90 mb-1">Annual Total</div>
          <div className="text-3xl font-bold">${(netSalary * 12).toLocaleString()}</div>
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Salary Breakdown</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-slate-200">
            <span className="text-slate-700">Base Salary</span>
            <span className="font-semibold text-slate-900">${salaryData.baseSalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-200">
            <span className="text-slate-700">Bonus</span>
            <span className="font-semibold text-green-600">+${salaryData.bonus.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-200">
            <span className="text-slate-700">Allowances</span>
            <span className="font-semibold text-green-600">+${salaryData.allowances.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-200">
            <span className="text-slate-700">Deductions</span>
            <span className="font-semibold text-red-600">-${salaryData.deductions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-slate-200">
            <span className="text-slate-700">Tax</span>
            <span className="font-semibold text-red-600">-${salaryData.tax.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-lg font-semibold text-slate-800">Net Salary</span>
            <span className="text-xl font-bold text-slate-900">${netSalary.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
