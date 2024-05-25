// ThemeProvider.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the theme context
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to access the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Define the props type for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Function to get initial dark mode state from local storage
  const getInitialDarkMode = (): boolean => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  };

  const [darkMode, setDarkMode] = useState<boolean>(getInitialDarkMode);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  // Define the theme classes based on dark mode
  const themeClasses = darkMode
    ? 'dark bg-gray-900 text-white'
    : 'bg-white text-gray-900';

  // Provide the theme context value
  const themeContextValue: ThemeContextType = {
    darkMode,
    toggleDarkMode,
  };

  // Effect to set the initial dark mode state from local storage
  useEffect(() => {
    const savedMode = getInitialDarkMode();
    if (savedMode !== darkMode) {
      setDarkMode(savedMode);
    }
  }, []);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={themeClasses}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
