import React, { useState } from 'react';
import { TestMode } from '../types';

interface ModeSelectorProps {
  currentMode: TestMode;
  onModeChange: (mode: TestMode) => void;
  disabled: boolean;
}

const predefinedModes: TestMode[] = [
  { id: '15s', label: '15s', duration: 15 },
  { id: '30s', label: '30s', duration: 30 },
  { id: '60s', label: '60s', duration: 60 },
];

export function ModeSelector({ currentMode, onModeChange, disabled }: ModeSelectorProps) {
  const [customTime, setCustomTime] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const time = parseInt(customTime);
    if (time && time > 0 && time <= 300) {
      const customMode: TestMode = {
        id: `${time}s`,
        label: `${time}s`,
        duration: time
      };
      onModeChange(customMode);
      setShowCustomInput(false);
      setCustomTime('');
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
      {predefinedModes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode)}
          disabled={disabled}
          className={`group relative px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform ${
            currentMode.id === mode.id
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-blue-500/25 scale-105'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
        >
          <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            currentMode.id === mode.id 
              ? 'bg-gradient-to-r from-blue-600 to-purple-700' 
              : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600'
          }`}></div>
          <span className="relative z-10">{mode.label}</span>
        </button>
      ))}
      
      {!showCustomInput ? (
        <button
          onClick={() => setShowCustomInput(true)}
          disabled={disabled}
          className={`group relative px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-md'
          }`}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">Custom</span>
        </button>
      ) : (
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md border border-gray-200 dark:border-gray-700">
          <input
            type="number"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            placeholder="60"
            min="1"
            max="300"
            className="w-16 px-2 py-1 text-center font-semibold rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-0 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            autoFocus
          />
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">sec</span>
          <button
            type="submit"
            className="px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Set
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false);
              setCustomTime('');
            }}
            className="px-3 py-1 text-sm font-semibold bg-gray-400 hover:bg-gray-500 text-white rounded transition-all duration-200 transform hover:scale-105"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}