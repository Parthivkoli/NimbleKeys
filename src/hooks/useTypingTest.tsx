import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingStats, WordLetter, LetterStatus } from '../types';
import { generateWords } from '../utils/wordGenerator';

interface UseTypingTestProps {
  duration: number;
  onComplete: (stats: TypingStats) => void;
}

export function useTypingTest({ duration, onComplete }: UseTypingTestProps) {
  const [words, setWords] = useState<string[]>([]);
  const [displayWords, setDisplayWords] = useState<WordLetter[][]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    charactersTyped: 0,
    errors: 0,
    timeElapsed: 0
  });

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const correctCharsRef = useRef(0);
  const totalCharsRef = useRef(0);
  const errorsRef = useRef(0);

  const initializeTest = useCallback(() => {
    const newWords = generateWords(300); // More words for longer tests
    setWords(newWords);
    
    const newDisplayWords = newWords.map((word, wordIdx) => 
      word.split('').map((char, charIdx) => ({
        char,
        status: (wordIdx === 0 && charIdx === 0) ? 'current' : 'upcoming'
      } as WordLetter))
    );
    
    setDisplayWords(newDisplayWords);
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setUserInput('');
    setIsActive(false);
    setTimeLeft(duration);
    setStats({
      wpm: 0,
      accuracy: 100,
      charactersTyped: 0,
      errors: 0,
      timeElapsed: 0
    });
    
    startTimeRef.current = null;
    correctCharsRef.current = 0;
    totalCharsRef.current = 0;
    errorsRef.current = 0;
  }, [duration]);

  const updateStats = useCallback(() => {
    if (!startTimeRef.current) return;
    
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000;
    const minutes = timeElapsed / 60;
    const wpm = minutes > 0 ? Math.round((correctCharsRef.current / 5) / minutes) : 0;
    const accuracy = totalCharsRef.current > 0 ? Math.round((correctCharsRef.current / totalCharsRef.current) * 100) : 100;
    
    setStats({
      wpm: Math.max(0, wpm),
      accuracy: Math.max(0, Math.min(100, accuracy)),
      charactersTyped: totalCharsRef.current,
      errors: errorsRef.current,
      timeElapsed: Math.round(timeElapsed)
    });
  }, []);

  const handleKeyPress = useCallback((key: string) => {
    if (!isActive && key !== 'Escape') {
      setIsActive(true);
      startTimeRef.current = Date.now();
    }

    if (key === 'Escape') {
      initializeTest();
      return;
    }

    if (key === 'Backspace') {
      if (currentLetterIndex > 0) {
        const newDisplayWords = [...displayWords];
        const currentWord = newDisplayWords[currentWordIndex];
        
        // Move back one letter
        const newLetterIndex = currentLetterIndex - 1;
        currentWord[newLetterIndex].status = 'current';
        
        // Update the next letter status if it exists
        if (newLetterIndex + 1 < currentWord.length) {
          currentWord[newLetterIndex + 1].status = 'upcoming';
        }
        
        setCurrentLetterIndex(newLetterIndex);
        setDisplayWords(newDisplayWords);
        setUserInput(userInput.slice(0, -1));
        
        // Adjust stats (only if we're removing a typed character)
        if (totalCharsRef.current > 0) {
          totalCharsRef.current--;
          // Only decrease correct chars if the removed character was correct
          const wasCorrect = currentWord[newLetterIndex].status === 'correct';
          if (wasCorrect && correctCharsRef.current > 0) {
            correctCharsRef.current--;
          }
          if (!wasCorrect && errorsRef.current > 0) {
            errorsRef.current--;
          }
        }
      }
      return;
    }

    if (key === ' ') {
      // Handle space (word completion)
      if (currentLetterIndex === words[currentWordIndex].length) {
        // Perfect word completion
        const newDisplayWords = [...displayWords];
        
        // Move to next word
        const nextWordIndex = currentWordIndex + 1;
        if (nextWordIndex < words.length) {
          newDisplayWords[nextWordIndex][0].status = 'current';
          setCurrentWordIndex(nextWordIndex);
          setCurrentLetterIndex(0);
          setUserInput('');
          setDisplayWords(newDisplayWords);
          
          totalCharsRef.current++; // Count the space
          correctCharsRef.current++; // Space is correct
        }
      } else {
        // Incomplete word - mark remaining letters as incorrect and skip
        const newDisplayWords = [...displayWords];
        const currentWord = newDisplayWords[currentWordIndex];
        
        for (let i = currentLetterIndex; i < currentWord.length; i++) {
          if (currentWord[i].status === 'upcoming') {
            currentWord[i].status = 'incorrect';
            errorsRef.current++;
            totalCharsRef.current++;
          }
        }
        
        // Move to next word
        const nextWordIndex = currentWordIndex + 1;
        if (nextWordIndex < words.length) {
          newDisplayWords[nextWordIndex][0].status = 'current';
          setCurrentWordIndex(nextWordIndex);
          setCurrentLetterIndex(0);
          setUserInput('');
          setDisplayWords(newDisplayWords);
          
          totalCharsRef.current++; // Count the space
          correctCharsRef.current++; // Space is correct (even if word was incomplete)
        }
      }
      return;
    }

    // Handle regular character input
    if (key.length === 1 && currentWordIndex < words.length) {
      const currentWord = words[currentWordIndex];
      if (currentLetterIndex < currentWord.length) {
        const newDisplayWords = [...displayWords];
        const currentWordDisplay = newDisplayWords[currentWordIndex];
        const expectedChar = currentWord[currentLetterIndex];
        
        totalCharsRef.current++;
        
        if (key === expectedChar) {
          currentWordDisplay[currentLetterIndex].status = 'correct';
          correctCharsRef.current++;
        } else {
          currentWordDisplay[currentLetterIndex].status = 'incorrect';
          errorsRef.current++;
        }
        
        // Move to next letter
        const newLetterIndex = currentLetterIndex + 1;
        if (newLetterIndex < currentWord.length) {
          currentWordDisplay[newLetterIndex].status = 'current';
        }
        
        setCurrentLetterIndex(newLetterIndex);
        setDisplayWords(newDisplayWords);
        setUserInput(userInput + key);
      }
    }
  }, [isActive, currentWordIndex, currentLetterIndex, words, displayWords, userInput, initializeTest]);

  // Timer effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  // Stats update effect
  useEffect(() => {
    if (isActive) {
      const statsInterval = setInterval(updateStats, 100);
      return () => clearInterval(statsInterval);
    }
  }, [isActive, updateStats]);

  // Test completion effect
  useEffect(() => {
    if (timeLeft === 0 && isActive === false && startTimeRef.current) {
      updateStats();
      setTimeout(() => {
        onComplete(stats);
      }, 100);
    }
  }, [timeLeft, isActive, stats, onComplete, updateStats]);

  // Initialize test on mount and duration change
  useEffect(() => {
    initializeTest();
  }, [initializeTest]);

  return {
    displayWords,
    currentWordIndex,
    currentLetterIndex,
    isActive,
    timeLeft,
    stats,
    handleKeyPress,
    resetTest: initializeTest
  };
}