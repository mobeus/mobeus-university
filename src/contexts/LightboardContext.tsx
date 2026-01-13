import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface LightboardContextType {
  isLightboardMode: boolean;
  toggleLightboard: () => void;
}

const LightboardContext = createContext<LightboardContextType | undefined>(undefined);

export const LightboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLightboardMode, setIsLightboardMode] = useState(false);

  const toggleLightboard = useCallback(() => {
    setIsLightboardMode(prev => !prev);
  }, []);

  // Apply lightboard-mode class to body for CSS-based filtering
  useEffect(() => {
    if (isLightboardMode) {
      document.body.classList.add('lightboard-mode');
    } else {
      document.body.classList.remove('lightboard-mode');
    }
  }, [isLightboardMode]);

  return (
    <LightboardContext.Provider value={{ isLightboardMode, toggleLightboard }}>
      {children}
    </LightboardContext.Provider>
  );
};

export const useLightboard = () => {
  const context = useContext(LightboardContext);
  if (context === undefined) {
    throw new Error('useLightboard must be used within a LightboardProvider');
  }
  return context;
};
