import React from 'react';
import { TypingStats } from '../types';
import { RotateCcw, Trophy, Target, Zap, AlertCircle } from 'lucide-react';

interface ResultsProps {
  stats: TypingStats;
  onRestart: () => void;
}

export function Results({ stats, onRestart }: ResultsProps) {
  const getWPMRating = (wpm: number) => {
    if (wpm >= 80) return { 
      text: 'Exceptional!', 
      color: 'text-green-500', 
      bgColor: 'from-green-500/20 to-emerald-500/20',
      icon: Trophy 
    };
    if (wpm >= 60) return { 
      text: 'Excellent!', 
      color: 'text-blue-500', 
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      icon: Trophy 
    };
    if (wpm >= 40) return { 
      text: 'Great job!', 
      color: 'text-purple-500', 
      bgColor: 'from-purple-500/20 to-pink-500/20',
      icon: Target 
    };
    if (wpm >= 20) return { 
      text: 'Keep practicing!', 
      color: 'text-yellow-500', 
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      icon: Zap 
    };
    return { 
      text: 'Room for improvement', 
      color: 'text-red-500', 
      bgColor: 'from-red-500/20 to-pink-500/20',
      icon: AlertCircle 
    };
  };

  const rating = getWPMRating(stats.wpm);
  const IconComponent = rating.icon;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${rating.bgColor} flex items-center justify-center`}>
            <IconComponent className={`w-10 h-10 ${rating.color}`} />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            Test Complete!
          </h2>
          <p className={`text-xl font-semibold ${rating.color}`}>
            {rating.text}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="text-center group">
            <div className="relative">
              <div className="text-4xl font-bold text-blue-500 mb-2 transition-transform duration-300 group-hover:scale-110">
                {stats.wpm}
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Words per minute
            </div>
          </div>
          
          <div className="text-center group">
            <div className="relative">
              <div className="text-4xl font-bold text-green-500 mb-2 transition-transform duration-300 group-hover:scale-110">
                {stats.accuracy}%
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Accuracy
            </div>
          </div>
          
          <div className="text-center group">
            <div className="relative">
              <div className="text-4xl font-bold text-purple-500 mb-2 transition-transform duration-300 group-hover:scale-110">
                {stats.charactersTyped}
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Characters typed
            </div>
          </div>
          
          <div className="text-center group">
            <div className="relative">
              <div className="text-4xl font-bold text-red-500 mb-2 transition-transform duration-300 group-hover:scale-110">
                {stats.errors}
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
              Errors made
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={onRestart}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-blue-500/25"
          >
            <RotateCcw className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}