import React from 'react';
import { useThemeMode } from '../../contexts/ThemeModeContext';

const App = () => {
  const { toggleThemeMode } = useThemeMode();
  return (
    <div>
      <button type="button" onClick={toggleThemeMode}>
        Toggle
      </button>
    </div>
  );
};

export default App;
