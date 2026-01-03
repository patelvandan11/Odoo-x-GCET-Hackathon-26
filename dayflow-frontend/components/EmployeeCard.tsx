// components/EmployeeCard.tsx
import React from 'react';

type EmployeeCardProps = {
  name: string;
  status: 'Present' | 'On Leave' | 'Absent';
  imageUrl?: string;
};

const statusConfig = (status: string) => {
  switch(status) {
    case 'Present': 
      return { 
        bg: 'bg-green-100', 
        dot: 'bg-green-500', 
        text: 'text-green-700',
        border: 'border-green-200'
      };
    case 'On Leave': 
      return { 
        bg: 'bg-blue-100', 
        dot: 'bg-blue-500', 
        text: 'text-blue-700',
        border: 'border-blue-200'
      };
    case 'Absent': 
      return { 
        bg: 'bg-amber-100', 
        dot: 'bg-amber-500', 
        text: 'text-amber-700',
        border: 'border-amber-200'
      };
    default: 
      return { 
        bg: 'bg-slate-100', 
        dot: 'bg-slate-500', 
        text: 'text-slate-700',
        border: 'border-slate-200'
      };
  }
};

export default function EmployeeCard({ name, status, imageUrl }: EmployeeCardProps) {
  const config = statusConfig(status);
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 group">
      <div className="flex items-center space-x-4">
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${name} avatar`}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-blue-400 transition-all"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center ring-2 ring-slate-200 group-hover:ring-blue-400 transition-all">
              <span className="text-white font-bold text-lg">{initials}</span>
            </div>
          )}
          <span className={`absolute bottom-0 right-0 w-4 h-4 ${config.dot} rounded-full border-2 border-white`}></span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-lg font-semibold text-slate-800 truncate">{name}</div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 ${config.bg} ${config.text} ${config.border} border`}>
            <span className={`inline-block w-2 h-2 rounded-full ${config.dot} mr-2`}></span>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}
