// app/profile/resume/page.tsx
"use client";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function ResumePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{user?.name}</h2>
            <p className="text-slate-600">{user?.job} • {user?.department}</p>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            Download Resume
          </button>
        </div>

        <div className="space-y-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">
              About
            </h3>
            <p className="text-slate-700 leading-relaxed">{user?.about || 'No description available.'}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {user?.skills && user.skills.length > 0 ? (
                user.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No skills listed</p>
              )}
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">
              Certifications
            </h3>
            <div className="space-y-2">
              {user?.certification && user.certification.length > 0 ? (
                user.certification.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-slate-700 font-medium">{cert}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-sm">No certifications listed</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-800">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm font-medium text-slate-800">{user?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

