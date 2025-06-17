import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatsDisplay } from './components/StatsDisplay';
import { ModeSelector } from './components/ModeSelector';
import { TypingArea } from './components/TypingArea';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { useTypingTest } from './hooks/useTypingTest';
import { TestMode, TypingStats, UserPreferences } from './types';
import { savePreferences, getPreferences } from './utils/localStorage';

const defaultModes: TestMode[] = [
  { id: '15s', label: '15s', duration: 15 },
  { id: '30s', label: '30s', duration: 30 },
  { id: '60s', label: '60s', duration: 60 },
];

function App() {
  const [preferences, setPreferences] = useState<UserPreferences>(() => getPreferences());
  const [currentMode, setCurrentMode] = useState<TestMode>(() => 
    defaultModes.find(mode => mode.id === preferences.lastMode) || defaultModes[1]
  );
  const [showResults, setShowResults] = useState(false);
  const [finalStats, setFinalStats] = useState<TypingStats | null>(null);

  const {
    displayWords,
    currentWordIndex,
    currentLetterIndex,
    isActive,
    timeLeft,
    stats,
    handleKeyPress,
    resetTest
  } = useTypingTest({
    duration: currentMode.duration,
    onComplete: (completedStats) => {
      setFinalStats(completedStats);
      setShowResults(true);
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', preferences.theme === 'dark');
  }, [preferences.theme]);

  const handleThemeToggle = () => {
    const newTheme = preferences.theme === 'light' ? 'dark' : 'light';
    const newPreferences = { ...preferences, theme: newTheme };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
  };

  const handleModeChange = (mode: TestMode) => {
    setCurrentMode(mode);
    const newPreferences = { ...preferences, lastMode: mode.id };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
    resetTest();
  };

  const handleRestart = () => {
    setShowResults(false);
    setFinalStats(null);
    resetTest();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500">
      <div className="container mx-auto px-4 py-6 max-w-5xl">
        <Header theme={preferences.theme} onThemeToggle={handleThemeToggle} />
        
        <StatsDisplay 
          stats={stats} 
          timeLeft={timeLeft} 
          isActive={isActive} 
        />
        
        <ModeSelector 
          currentMode={currentMode}
          onModeChange={handleModeChange}
          disabled={isActive}
        />
        
        <TypingArea
          displayWords={displayWords}
          currentWordIndex={currentWordIndex}
          currentLetterIndex={currentLetterIndex}
          onKeyPress={handleKeyPress}
          isActive={isActive}
        />
        
        {showResults && finalStats && (
          <Results 
            stats={finalStats} 
            onRestart={handleRestart} 
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
}

export default App;