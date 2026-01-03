// app/profile/info/page.tsx
"use client";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function PrivateInfoPage() {
  const { user } = useContext(AuthContext);

  const infoSections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: user?.name },
        { label: 'Email Address', value: user?.email },
        { label: 'Phone Number', value: user?.phone },
        { label: 'Date of Birth', value: user?.dob },
      ],
    },
    {
      title: 'Employment Details',
      items: [
        { label: 'Job Title', value: user?.job },
        { label: 'Department', value: user?.department },
        { label: 'Manager', value: user?.manager },
        { label: 'Role', value: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) },
      ],
    },
    {
      title: 'Banking Information',
      items: [
        { label: 'Account Number', value: user?.bankInfo.accountNumber },
        { label: 'IFSC Code', value: user?.bankInfo.ifsc },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {infoSections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">
            {section.title}
          </h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item, itemIdx) => (
              <div key={itemIdx}>
                <dt className="text-sm font-medium text-slate-600 mb-1">{item.label}</dt>
                <dd className="text-base text-slate-900 font-medium">{item.value || '—'}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
