"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  // Initialize synchronously from localStorage when running in the browser so
  // consumers (client components) have the correct value on first render.
  const [selectedLocation, setSelectedLocationState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedLocation') ?? '';
    }
    return '';
  });

  // Whenever selectedLocation changes, update localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedLocation) {
        localStorage.setItem('selectedLocation', selectedLocation);
      } else {
        localStorage.removeItem('selectedLocation');
      }
    }
  }, [selectedLocation]);

  // Wrap setter to update state
  const setSelectedLocation = (location: string) => {
    setSelectedLocationState(location);
  };

  return (
    <LocationContext.Provider value={{ selectedLocation: selectedLocation ?? '', setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
