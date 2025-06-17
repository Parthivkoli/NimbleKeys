export interface TypingStats {
  wpm: number;
  accuracy: number;
  charactersTyped: number;
  errors: number;
  timeElapsed: number;
}

export interface TestMode {
  id: string;
  label: string;
  duration: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  lastMode: string;
}

export type LetterStatus = 'correct' | 'incorrect' | 'current' | 'upcoming';

export interface WordLetter {
  char: string;
  status: LetterStatus;
}