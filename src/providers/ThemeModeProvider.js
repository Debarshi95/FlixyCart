import { ThemeProvider } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { themeModes } from '../constants/themeModes';
import { ThemeModeContext } from '../contexts/ThemeModeContext';
import { createThemeFromMode } from '../utils/createTheme';

const ThemeModeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(themeModes.LIGHT);

  useEffect(() => {
    const themePref = localStorage.getItem('themeMode');
    if (themePref) {
      setThemeMode(themePref);
    }
  }, []);

  const value = useMemo(
    () => ({
      toggleThemeMode: () =>
        setThemeMode((prevTheme) =>
          prevTheme === themeModes.DARK ? themeModes.LIGHT : themeModes.DARK
        ),
    }),
    []
  );

  const theme = useMemo(() => createThemeFromMode(themeMode), [themeMode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
