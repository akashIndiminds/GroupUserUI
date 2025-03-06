'use client';
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function NavigationWrapper({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header toggleMenu={toggleMenu} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {isMenuOpen && <Sidebar />}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
