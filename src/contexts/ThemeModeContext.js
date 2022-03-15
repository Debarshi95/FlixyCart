import { createContext, useContext } from 'react';

const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw Error('Make sure to wrap your component with ThemeModeProvider');
  }
  return { ...ctx };
};

export { ThemeModeContext, useThemeMode };
