// src/components/Header.jsx
'use client';
import React from 'react';
import { Menu, Bell, User, HelpCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function Header({ toggleMenu }) {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 text-white shadow-sm h-16 flex items-center px-4">
      <button 
        className="p-2 rounded-md hover:bg-blue-700"
        onClick={toggleMenu}
      >
        <Menu className="w-5 h-5" />
      </button>
      <div className="flex-1 px-4">
        <h1 className="text-xl font-semibold">Online Dispute Resolution System</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-blue-700">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-blue-700">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="relative">
          <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-blue-700">
            <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            {session?.user && (
              <span className="text-sm font-medium">{session.user.name}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
