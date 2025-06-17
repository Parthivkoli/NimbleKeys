import React from 'react';
import { Moon, Sun, Keyboard } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Header({ theme, onThemeToggle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-6 mb-6">
      <div className="flex items-center gap-3 group">
        <div className="relative">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md transition-transform duration-300 group-hover:scale-105">
            <Keyboard className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            NimbleKeys
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Master your typing skills
          </p>
        </div>
      </div>
      
      <button
        onClick={onThemeToggle}
        className="group relative p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        aria-label="Toggle theme"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-12" />
          ) : (
            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-300 group-hover:rotate-12" />
          )}
        </div>
      </button>
    </header>
  );
}