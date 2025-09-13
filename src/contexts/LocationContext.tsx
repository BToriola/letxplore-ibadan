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
  const [selectedLocation, setSelectedLocationState] = useState<string | undefined>(undefined);

  // On mount, initialize from localStorage if available, else leave undefined
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedLocation');
      if (stored) {
        setSelectedLocationState(stored);
      }
    }
  }, []);

  // Whenever selectedLocation changes, update localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && selectedLocation) {
      localStorage.setItem('selectedLocation', selectedLocation);
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
