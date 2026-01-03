// app/time-off/page.tsx
"use client";
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function TimeOffPage() {
  const { user } = useContext(AuthContext);
  const [type, setType] = useState('Paid');
  const [days, setDays] = useState(1);

  if (user?.role === 'admin') {
    // Admin view: list of requests
    const requests = [
      { name: 'John Doe', type: 'Sick', days: 2, status: 'Pending', date: '2024-01-15' },
      { name: 'Jane Smith', type: 'Paid', days: 1, status: 'Approved', date: '2024-01-20' },
      { name: 'Bob Johnson', type: 'Unpaid', days: 3, status: 'Pending', date: '2024-01-25' },
      { name: 'Alice Williams', type: 'Paid', days: 5, status: 'Rejected', date: '2024-02-01' },
    ];
    
    const getStatusColor = (status: string) => {
      switch(status) {
        case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
        case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-slate-100 text-slate-800 border-slate-200';
      }
    };

    const getTypeColor = (type: string) => {
      switch(type) {
        case 'Paid': return 'bg-blue-100 text-blue-800';
        case 'Sick': return 'bg-purple-100 text-purple-800';
        case 'Unpaid': return 'bg-slate-100 text-slate-800';
        default: return 'bg-slate-100 text-slate-800';
      }
    };

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Time Off Requests</h2>
          <p className="text-slate-600">Review and manage employee time-off requests</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Days
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {requests.map((req, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{req.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(req.type)}`}>
                        {req.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{req.days} {req.days === 1 ? 'day' : 'days'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{req.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {req.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xs font-medium">
                            Approve
                          </button>
                          <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium">
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    // Employee view: request form with allocation bar
    const totalDays = 24;
    const usedDays = 10;
    const remainingDays = totalDays - usedDays;
    const percentage = (usedDays / totalDays) * 100;

    const handleRequest = (e: React.FormEvent) => {
      e.preventDefault();
      // call backend to submit time-off request
      console.log('Time off requested:', { type, days });
    };
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Request Time Off</h2>
          <p className="text-slate-600">Submit a new time-off request</p>
        </div>

        {/* Allocation bar */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-700">Leave Balance</span>
              <span className="text-sm font-semibold text-slate-800">{remainingDays} days remaining</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${percentage}%` }}
              >
                {percentage > 10 && (
                  <span className="text-xs font-medium text-white">{Math.round(percentage)}%</span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-600">
              <span>Used: {usedDays} days</span>
              <span>Total: {totalDays} days</span>
            </div>
          </div>
        </div>

        {/* Request Form */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200">
          <form onSubmit={handleRequest} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-2">
                Leave Type
              </label>
              <select
                id="type"
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="Paid">Paid Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Unpaid">Unpaid Leave</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="days" className="block text-sm font-medium text-slate-700 mb-2">
                Number of Days
              </label>
              <input
                id="days"
                type="number"
                value={days}
                onChange={e => setDays(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                min={1}
                max={remainingDays}
              />
              <p className="mt-1 text-xs text-slate-500">Maximum {remainingDays} days available</p>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    );
  }
}
