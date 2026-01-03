// app/attendance/page.tsx
"use client";
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AttendancePage() {
  const { user } = useContext(AuthContext);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = () => {
    const time = new Date().toLocaleTimeString();
    setCheckInTime(time);
    setCheckedIn(true);
    // call backend API to record check-in
    console.log('Checked in at', time);
  };
  
  const handleCheckOut = () => {
    // call backend API to record check-out
    console.log('Checked out at', new Date().toLocaleTimeString());
    setCheckedIn(false);
    setCheckInTime(null);
  };

  if (user?.role === 'admin') {
    // Admin view: show all employees for the selected date
    const records = [
      { name: 'John Doe', checkIn: '9:00 AM', checkOut: '5:00 PM', hours: 8 },
      { name: 'Jane Smith', checkIn: '9:30 AM', checkOut: '4:30 PM', hours: 7 },
      { name: 'Bob Johnson', checkIn: '8:45 AM', checkOut: '5:15 PM', hours: 8.5 },
      { name: 'Alice Williams', checkIn: '9:15 AM', checkOut: null, hours: null },
    ];
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Attendance Records</h2>
          <p className="text-slate-600">View and manage employee attendance</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
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
                    Check In
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Work Hours
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {records.map((rec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{rec.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{rec.checkIn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{rec.checkOut || '—'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">
                        {rec.hours ? `${rec.hours} hrs` : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {rec.checkOut ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Active
                        </span>
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
    // Employee view: check-in/out buttons
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">My Attendance</h2>
          <p className="text-slate-600">Track your daily check-in and check-out times</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200">
          <div className="text-center mb-6">
            <div className="text-sm text-slate-600 mb-2">Today's Date</div>
            <div className="text-2xl font-bold text-slate-800">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
          </div>

          {checkedIn && checkInTime && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-800 font-medium">Checked in at {checkInTime}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCheckIn}
              disabled={checkedIn}
              className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                checkedIn 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Check In</span>
              </div>
            </button>
            
            <button
              onClick={handleCheckOut}
              disabled={!checkedIn}
              className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 ${
                !checkedIn 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Check Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
