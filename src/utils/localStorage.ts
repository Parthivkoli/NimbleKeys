import { UserPreferences } from '../types';

const PREFERENCES_KEY = 'nimblekeys-preferences';

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  lastMode: '30s'
};

export function savePreferences(preferences: Partial<UserPreferences>): void {
  const current = getPreferences();
  const updated = { ...current, ...preferences };
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
}

export function getPreferences(): UserPreferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      return { ...defaultPreferences, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.warn('Failed to load preferences from localStorage:', error);
  }
  return defaultPreferences;
}