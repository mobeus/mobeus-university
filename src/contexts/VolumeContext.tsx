import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface VolumeContextType {
  volume: number;
  setVolume: (level: number) => void;
  adjustVolume: (delta: number) => void;
}

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export const VolumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [volume, setVolumeState] = useState(100);

  const setVolume = useCallback((level: number) => {
    const clampedLevel = Math.max(0, Math.min(100, level));
    setVolumeState(clampedLevel);
    
    // Use UIFramework API (0-1 range)
    try {
      const ui = (window as any).UIFramework;
      if (typeof ui?.setAvatarVolume === 'function') {
        ui.setAvatarVolume(clampedLevel / 100);
      }
    } catch (e) {
      // Ignore errors if UI framework not ready
    }
  }, []);

  const adjustVolume = useCallback((delta: number) => {
    setVolumeState(prev => {
      const newLevel = Math.max(0, Math.min(100, prev + delta));
      
      // Use UIFramework API (0-1 range)
      try {
        const ui = (window as any).UIFramework;
        if (typeof ui?.setAvatarVolume === 'function') {
          ui.setAvatarVolume(newLevel / 100);
        }
      } catch (e) {
        // Ignore errors if UI framework not ready
      }
      
      return newLevel;
    });
  }, []);

  // Expose window.teleVolume API
  useEffect(() => {
    (window as any).teleVolume = {
      setVolume,
      adjustVolume,
      getVolume: () => {
        // Try to get from UIFramework first
        try {
          const ui = (window as any).UIFramework;
          if (typeof ui?.getAvatarVolume === 'function') {
            const vol = ui.getAvatarVolume();
            if (typeof vol === 'number') {
              return Math.round(vol * 100);
            }
          }
        } catch (e) {
          // Fallback to local state
        }
        return volume;
      },
    };

    return () => {
      delete (window as any).teleVolume;
    };
  }, [setVolume, adjustVolume, volume]);



  return (
    <VolumeContext.Provider value={{ volume, setVolume, adjustVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};

export const useVolume = () => {
  const context = useContext(VolumeContext);
  if (context === undefined) {
    throw new Error('useVolume must be used within a VolumeProvider');
  }
  return context;
};
