'use client';
import React, { useState } from 'react';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="flex flex-col h-screen">
            {/* Header */}
            <Header toggleMenu={toggleMenu} />

            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar - Toggle based on isMenuOpen state */}
              <div className={`transition-all duration-300 ease-in-out ${
                isMenuOpen ? "w-64" : "w-0"
              } overflow-hidden`}>
                {isMenuOpen && <Sidebar />}
              </div>

              {/* Main Content */}
              <main className="flex-1 overflow-auto p-4 bg-gray-50">
                {children}
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}