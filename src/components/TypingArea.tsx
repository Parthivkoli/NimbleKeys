import React, { useEffect, useRef } from 'react';
import { WordLetter } from '../types';

interface TypingAreaProps {
  displayWords: WordLetter[][];
  currentWordIndex: number;
  currentLetterIndex: number;
  onKeyPress: (key: string) => void;
  isActive: boolean;
}

export function TypingArea({ 
  displayWords, 
  currentWordIndex, 
  currentLetterIndex, 
  onKeyPress, 
  isActive 
}: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentWordRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        return;
      }
      
      onKeyPress(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onKeyPress]);

  // Auto-scroll and caret positioning
  useEffect(() => {
    if (currentWordRef.current && containerRef.current && caretRef.current) {
      const wordElement = currentWordRef.current;
      const containerElement = containerRef.current;
      const caretElement = caretRef.current;
      
      // Position caret
      const currentWord = displayWords[currentWordIndex];
      if (currentWord && currentLetterIndex <= currentWord.length) {
        const letters = wordElement.querySelectorAll('.letter');
        if (letters[currentLetterIndex]) {
          const letterRect = letters[currentLetterIndex].getBoundingClientRect();
          const containerRect = containerElement.getBoundingClientRect();
          
          caretElement.style.left = `${letterRect.left - containerRect.left}px`;
          caretElement.style.top = `${letterRect.top - containerRect.top}px`;
          caretElement.style.height = `${letterRect.height}px`;
        } else if (letters[currentLetterIndex - 1]) {
          // Position at end of word
          const letterRect = letters[currentLetterIndex - 1].getBoundingClientRect();
          const containerRect = containerElement.getBoundingClientRect();
          
          caretElement.style.left = `${letterRect.right - containerRect.left}px`;
          caretElement.style.top = `${letterRect.top - containerRect.top}px`;
          caretElement.style.height = `${letterRect.height}px`;
        }
      }
      
      // Auto-scroll
      const wordRect = wordElement.getBoundingClientRect();
      const containerRect = containerElement.getBoundingClientRect();
      
      if (wordRect.top > containerRect.bottom - 100) {
        containerElement.scrollTop = wordElement.offsetTop - containerElement.offsetTop - 100;
      }
    }
  }, [currentWordIndex, currentLetterIndex, displayWords]);

  const getLetterClassName = (status: string, isCurrentLetter: boolean) => {
    let baseClasses = 'letter inline-block transition-all duration-75 ease-out relative';
    
    switch (status) {
      case 'correct':
        return `${baseClasses} text-green-400 dark:text-green-400`;
      case 'incorrect':
        return `${baseClasses} text-red-400 dark:text-red-400 bg-red-100/50 dark:bg-red-900/20 rounded-sm`;
      case 'current':
        return `${baseClasses} text-gray-800 dark:text-gray-200`;
      default:
        return `${baseClasses} text-gray-400 dark:text-gray-500`;
    }
  };

  const getWordClassName = (wordIndex: number) => {
    let baseClasses = 'word inline-block mr-3 relative transition-all duration-200';
    
    if (wordIndex === currentWordIndex) {
      return `${baseClasses} transform scale-102`;
    } else if (wordIndex < currentWordIndex) {
      return `${baseClasses} opacity-60`;
    }
    
    return baseClasses;
  };

  if (!displayWords.length) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 text-lg">Loading words...</p>
      </div>
    );
  }

  return (
    <div className="relative mb-8">
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-[2px] rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 max-h-72 overflow-hidden text-2xl leading-relaxed focus:outline-none relative"
        tabIndex={0}
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
      >
        {/* Animated caret */}
        <div
          ref={caretRef}
          className={`absolute w-0.5 bg-blue-500 dark:bg-blue-400 transition-all duration-100 ease-out z-10 ${
            isActive ? 'animate-pulse' : 'opacity-50'
          }`}
          style={{ 
            transform: 'translateY(2px)',
            boxShadow: '0 0 6px rgba(59, 130, 246, 0.4)'
          }}
        />
        
        <div className="flex flex-wrap gap-x-3 gap-y-2 relative">
          {displayWords.slice(0, 50).map((word, wordIndex) => (
            <span
              key={wordIndex}
              ref={wordIndex === currentWordIndex ? currentWordRef : null}
              className={getWordClassName(wordIndex)}
            >
              {word.map((letter, letterIndex) => (
                <span
                  key={letterIndex}
                  className={getLetterClassName(
                    letter.status, 
                    wordIndex === currentWordIndex && letterIndex === currentLetterIndex
                  )}
                >
                  {letter.char}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
      
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/85 dark:bg-gray-800/85 backdrop-blur-[1px] rounded-xl transition-all duration-300">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Click here or start typing to begin
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 mb-2">
              Focus on accuracy first, speed will follow
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Press <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs">Esc</kbd> to restart at any time
            </p>
          </div>
        </div>
      )}
    </div>
  );
}