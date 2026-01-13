import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CarColor = 'white' | 'red' | 'black' | 'silver';

interface CarColorContextType {
  selectedColorIndex: number;
  selectedColor: CarColor;
  setCarColor: (color: CarColor) => void;
}

const CarColorContext = createContext<CarColorContextType | undefined>(undefined);

const colorToIndex: Record<CarColor, number> = {
  white: 0,
  red: 1,
  black: 2,
  silver: 3
};

const indexToColor: Record<number, CarColor> = {
  0: 'white',
  1: 'red',
  2: 'black',
  3: 'silver'
};

export const CarColorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0); // Default to white

  const setCarColor = (color: CarColor) => {
    const index = colorToIndex[color];
    if (index !== undefined) {
      setSelectedColorIndex(index);
    }
  };

  useEffect(() => {
    // Expose global function to change car colors
    (window as any).setCarColor = (color: string) => {
      const normalizedColor = color.toLowerCase() as CarColor;
      if (normalizedColor in colorToIndex) {
        setCarColor(normalizedColor);
        return true;
      }
      console.warn(`Invalid car color: ${color}. Valid options: white, red, black, silver`);
      return false;
    };

    // Expose function to get current color
    (window as any).getCarColor = () => indexToColor[selectedColorIndex];

    return () => {
      delete (window as any).setCarColor;
      delete (window as any).getCarColor;
    };
  }, [selectedColorIndex]);

  return (
    <CarColorContext.Provider value={{
      selectedColorIndex,
      selectedColor: indexToColor[selectedColorIndex],
      setCarColor
    }}>
      {children}
    </CarColorContext.Provider>
  );
};

export const useCarColor = () => {
  const context = useContext(CarColorContext);
  if (context === undefined) {
    throw new Error('useCarColor must be used within a CarColorProvider');
  }
  return context;
};
