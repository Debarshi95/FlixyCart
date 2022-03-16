import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const themeExists = JSON.parse(localStorage.getItem('theme'));
    if (themeExists) {
      setTheme(themeExists);
    }
  }, []);

  const value = useMemo(
    () => ({ theme, toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')) }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
