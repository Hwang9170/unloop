'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SupportedLanguage } from '@/types/language';

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANGUAGE_STORAGE_KEY = 'unlooped-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('ko');

  const getSafeStorage = useCallback(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      return window.localStorage;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const storage = getSafeStorage();
    const stored = storage?.getItem(LANGUAGE_STORAGE_KEY) ?? null;
    if (stored === 'ko' || stored === 'en') {
      setLanguageState(stored);
    } else if (typeof navigator !== 'undefined') {
      const navLang = navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'ko';
      setLanguageState(navLang);
      storage?.setItem(LANGUAGE_STORAGE_KEY, navLang);
    }
  }, [getSafeStorage]);

  const setLanguage = useCallback((next: SupportedLanguage) => {
    setLanguageState(next);
    const storage = getSafeStorage();
    storage?.setItem(LANGUAGE_STORAGE_KEY, next);
  }, [getSafeStorage]);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next = prev === 'ko' ? 'en' : 'ko';
      const storage = getSafeStorage();
      storage?.setItem(LANGUAGE_STORAGE_KEY, next);
      return next;
    });
  }, [getSafeStorage]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage,
  }), [language, setLanguage, toggleLanguage]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage는 LanguageProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
