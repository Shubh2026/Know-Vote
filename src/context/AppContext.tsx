import React, { createContext, useContext, useState, useCallback } from 'react';
import { Language, translations, Translation } from '../data/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
  isDark: boolean;
  toggleTheme: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleTheme = useCallback(() => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, []);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t: translations[language],
      isDark,
      toggleTheme,
      activeSection,
      setActiveSection,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
