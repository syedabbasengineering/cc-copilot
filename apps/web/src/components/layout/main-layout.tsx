'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CC Copilot
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/dashboard" className="text-sm font-medium hover:text-primary">
                Dashboard
              </a>
              <a href="/ideas" className="text-sm font-medium hover:text-primary">
                Ideas
              </a>
              <a href="/generator" className="text-sm font-medium hover:text-primary">
                Generator
              </a>
              <a href="/library" className="text-sm font-medium hover:text-primary">
                Library
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-sm font-medium hover:text-primary">Settings</button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
