'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the expected weather data shape based on the API
interface WeatherData {
  coord?: {
    lon: number;
    lat: number;
  };
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  clouds?: {
    all: number;
  };
  visibility?: number;
  sys?: {
    country?: string;
    sunrise?: number;
    sunset?: number;
  };
  dt?: number; // timestamp
  timezone?: number; // shift in seconds from UTC
  base?: string;
}

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
