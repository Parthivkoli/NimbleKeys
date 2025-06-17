import React from 'react';
import { TypingStats } from '../types';

interface StatsDisplayProps {
  stats: TypingStats;
  timeLeft: number;
  isActive: boolean;
}

export function StatsDisplay({ stats, timeLeft, isActive }: StatsDisplayProps) {
  const formatTime = (seconds: number) => {
    return seconds.toString().padStart(2, '0');
  };

  const getWPMColor = (wpm: number) => {
    if (wpm >= 80) return 'text-green-500';
    if (wpm >= 60) return 'text-blue-500';
    if (wpm >= 40) return 'text-yellow-500';
    if (wpm >= 20) return 'text-orange-500';
    return 'text-red-500';
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 95) return 'text-green-500';
    if (accuracy >= 90) return 'text-blue-500';
    if (accuracy >= 80) return 'text-yellow-500';
    if (accuracy >= 70) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 mb-8">
      {/* WPM */}
      <div className="text-center group">
        <div className="relative">
          <span className={`text-4xl font-bold transition-all duration-300 ${getWPMColor(stats.wpm)} group-hover:scale-105`}>
            {stats.wpm}
          </span>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 tracking-wider uppercase">
          Words per minute
        </div>
      </div>
      
      {/* Accuracy */}
      <div className="text-center group">
        <div className="relative">
          <span className={`text-4xl font-bold transition-all duration-300 ${getAccuracyColor(stats.accuracy)} group-hover:scale-105`}>
            {stats.accuracy}%
          </span>
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 tracking-wider uppercase">
          Accuracy
        </div>
      </div>
      
      {/* Characters */}
      <div className="text-center group">
        <div className="relative">
          <span className="text-4xl font-bold text-purple-500 transition-all duration-300 group-hover:scale-105">
            {stats.charactersTyped}
          </span>
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 tracking-wider uppercase">
          Characters
        </div>
      </div>
      
      {/* Errors */}
      <div className="text-center group">
        <div className="relative">
          <span className="text-4xl font-bold text-red-500 transition-all duration-300 group-hover:scale-105">
            {stats.errors}
          </span>
          <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 tracking-wider uppercase">
          Errors
        </div>
      </div>
      
      {/* Timer */}
      <div className="text-center group">
        <div className="relative">
          <span className={`text-4xl font-bold transition-all duration-300 group-hover:scale-105 ${
            isActive 
              ? timeLeft <= 10 
                ? 'text-red-500 animate-pulse' 
                : 'text-orange-500'
              : 'text-gray-400 dark:text-gray-500'
          }`}>
            {formatTime(timeLeft)}
          </span>
          <div className={`absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
            isActive 
              ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20'
              : 'bg-gradient-to-r from-gray-500/20 to-gray-400/20'
          }`}></div>
        </div>
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1 tracking-wider uppercase">
          Time left
        </div>
      </div>
    </div>
  );
}