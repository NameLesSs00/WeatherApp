'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type WeatherData = any; //this will be a json file 

interface LocationContextType {
  weather: WeatherData | null;
  setWeather: (data: WeatherData) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  return (
    <LocationContext.Provider value={{ weather, setWeather }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
