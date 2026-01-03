// app/layout.tsx
import { AuthProvider } from './context/AuthContext';
import Sidebar from '@/components/Sidebar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <AuthProvider>
          <div className="min-h-screen flex">
            {/* Sidebar Navigation */}
            <Sidebar />
            
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:ml-0">
              {/* Top Bar - Only visible on desktop when sidebar is visible */}
              <header className="hidden lg:block bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-slate-800">Welcome back</h1>
                    <div className="flex items-center space-x-4">
                      <button className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </header>

              {/* Main content */}
              <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>

              {/* Footer */}
              <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-500 text-sm">
                  © 2024 DayFlow. All rights reserved.
                </div>
              </footer>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
